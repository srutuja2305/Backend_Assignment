const db = require('../models/bid.js');
const Joi = require('joi');

const getBids = async (req, res) => {
    try {
        const bids = await db.Bid.findAll({ where: { item_id: req.params.itemId } });
        res.send(bids);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const placeBid = async (req, res) => {
    const schema = Joi.object({
        bid_amount: Joi.number().required()
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const { itemId } = req.params;
        const { bid_amount } = req.body;

        const item = await db.Item.findByPk(itemId);
        if (!item) return res.status(404).send('Item not found');
        if (item.end_time < new Date()) return res.status(400).send('Auction has ended');
        if (bid_amount <= item.current_price) return res.status(400).send('Bid amount must be higher than current price');

        const bid = await db.Bid.create({ item_id: itemId, user_id: req.user.id, bid_amount });
        await item.update({ current_price: bid_amount });

        const notificationMessage = `New bid of ${bid_amount} on your item ${item.name}`;
        await db.Notification.create({ user_id: item.user_id, message: notificationMessage });

        res.status(201).send(bid);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = { getBids, placeBid };