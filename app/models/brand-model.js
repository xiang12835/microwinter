const DataTypes = require('sequelize')
const db = require("./mysql-db")

module.exports = db.define("brand",{
  id:{
    type:DataTypes.INTEGER(11),
    allowNull:false,
    primaryKey:true,
    autoIncrement:true
  },
  brand_name:{
    type:DataTypes.STRING(50),
    allowNull:false
  }
},{
  underscored: true, // 启用下划线命名法
  freezeTableName:true,
  timestamps:true
});