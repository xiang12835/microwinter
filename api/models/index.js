const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const configs = require('../config/config.js');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

// const config = configs[env];
// 希望遵循 MySQL 数据库表字段的下划线命名规范，所以，需要全局开启一个 underscore: true 的定义，来使系统中默认的 createdAt 与 updatedAt 能以下划线的方式，与表结构保持一致
const config = {
  ...configs[env],
  define: {
    underscored: true,
  },
};

const db = {};
let sequelize = null;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter((file) => {
    const result = file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
    return result;
  })
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
