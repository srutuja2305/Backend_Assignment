const Sequelize = require('sequelize');
const config = require('../config/config')[process.env.NODE_ENV || 'development'];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Item = require('./item')(sequelize, Sequelize);
db.Bid = require('./bid')(sequelize, Sequelize);
db.Notification = require('./notification')(sequelize, Sequelize);

// Associations
db.User.hasMany(db.Bid, { foreignKey: 'user_id' });
db.Item.hasMany(db.Bid, { foreignKey: 'item_id' });
db.Bid.belongsTo(db.User, { foreignKey: 'user_id' });
db.Bid.belongsTo(db.Item, { foreignKey: 'item_id' });
db.User.hasMany(db.Notification, { foreignKey: 'user_id' });

module.exports = db;
