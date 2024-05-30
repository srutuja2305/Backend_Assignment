module.exports = (sequelize, DataTypes) => {
    const Notification = sequelize.define('Notification', {
        user_id: { type: DataTypes.INTEGER, allowNull: false },
        message: { type: DataTypes.STRING, allowNull: false },
        is_read: { type: DataTypes.BOOLEAN, defaultValue: false },
        created_at: { type: DataTypes.DATE, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') }
    }, {
        timestamps: false
    });

    return Notification;
};
