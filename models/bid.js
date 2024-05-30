module.exports = (sequelize, DataTypes) => {
    const Bid = sequelize.define('Bid', {
        item_id: { type: DataTypes.INTEGER, allowNull: false },
        user_id: { type: DataTypes.INTEGER, allowNull: false },
        bid_amount: { type: DataTypes.DECIMAL, allowNull: false },
        created_at: { type: DataTypes.DATE, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') }
    }, {
        timestamps: false
    });

    return Bid;
};
