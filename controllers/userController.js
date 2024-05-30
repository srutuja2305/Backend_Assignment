const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models/user.js');
const Joi = require('joi');

const register = async (req, res) => {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
        email: Joi.string().email().required()
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const { username, password, email } = req.body;

        const existingUser = await db.User.findOne({ where: { email } });
        if (existingUser) return res.status(400).send('Email already exists');

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await db.User.create({ username, password: hashedPassword, email });
        res.status(201).send({ id: user.id, username: user.username, email: user.email });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const login = async (req, res) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const { email, password } = req.body;
        const user = await db.User.findOne({ where: { email } });

        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(400).send('Invalid email or password');
        }

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
        res.send({ token });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getProfile = async (req, res) => {
    try {
        const user = await db.User.findByPk(req.user.id);
        res.send({ id: user.id, username: user.username, email: user.email, role: user.role });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = { register, login, getProfile };
