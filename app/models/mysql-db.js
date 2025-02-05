const Sequelize = require(  'sequelize')
const config = require( '../config/mysql-config' )
const configLocal = require( '../config/mysql-config-local' )

const db = new Sequelize(configLocal)
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