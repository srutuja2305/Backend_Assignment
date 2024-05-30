const db = require('../models/notification.js');

const getNotifications = async (req, res) => {
    try {
        const notifications = await db.Notification.findAll({ where: { user_id: req.user.id } });
        res.send(notifications);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const markRead = async (req, res) => {
    try {
        await db.Notification.update({ is_read: true }, { where: { user_id: req.user.id } });
        res.send('Notifications marked as read');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = { getNotifications, markRead };