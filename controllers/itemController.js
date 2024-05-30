const db = require('../models/item.js');
const { uploadImage } = require('../utils/upload');
const Joi = require('joi');

const getItems = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    try {
        const items = await db.Item.findAndCountAll({
            limit,
            offset,
            where: {
                end_time: {
                    [db.Sequelize.Op.gte]: new Date()
                }
            }
        });

        res.send({
            totalItems: items.count,
            totalPages: Math.ceil(items.count / limit),
            currentPage: page,
            items: items.rows
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getItem = async (req, res) => {
    try {
        const item = await db.Item.findByPk(req.params.id);
        if (!item) return res.status(404).send('Item not found');
        res.send(item);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const createItem = async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        starting_price: Joi.number().required(),
        end_time: Joi.date().required()
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const { name, description, starting_price, end_time } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

        const item = await db.Item.create({
            name,
            description,
            starting_price,
            current_price: starting_price,
            image_url: imageUrl,
            end_time,
            user_id: req.user.id
        });

        res.status(201).send(item);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const updateItem = async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().optional(),
        description: Joi.string().optional(),
        starting_price: Joi.number().optional(),
        current_price: Joi.number().optional(),
        end_time: Joi.date().optional()
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const item = await db.Item.findByPk(req.params.id);
        if (!item) return res.status(404).send('Item not found');

        if (item.user_id !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).send('Forbidden');
        }

        const updatedData = { ...req.body };
        if (req.file) {
            updatedData.image_url = `/uploads/${req.file.filename}`;
        }

        await item.update(updatedData);
        res.send(item);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const deleteItem = async (req, res) => {
    try {
        const item = await db.Item.findByPk(req.params.id);
        if (!item) return res.status(404).send('Item not found');

        if (item.user_id !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).send('Forbidden');
        }

        await item.destroy();
        res.send('Item deleted');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };
