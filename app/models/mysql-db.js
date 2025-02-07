const Sequelize = require(  'sequelize')
const config = require( '../config/mysql-config')               // 线上数据库
const configLocal = require( '../config/mysql-config-local')    // 本地数据库

const db = new Sequelize(config)
// 测试连接
db
  .authenticate()
  .then(() => {
    console.log('数据库连接成功')
  })
  .catch(err => {
    console.error('数据库连接异常', err)
  })

module.exports = db