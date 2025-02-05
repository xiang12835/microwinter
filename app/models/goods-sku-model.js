const DataTypes = require( 'sequelize' )//修改类型名称从Sequelize变成DataTypes
const db = require("./mysql-db")

module.exports= db.define("goods_sku",
{
  id:{
    type:DataTypes.INTEGER(11),
    allowNull:false,
    primaryKey:true,
    autoIncrement:true
  },
  goods_id:{
    type:DataTypes.INTEGER(20),
    allowNull:false
  },
  goods_attr_path:{//[1,2]
    type:DataTypes.JSON,
    allowNull:false
  },
  goods_sku_desc:{
    type:DataTypes.TEXT('tiny'),
    allowNull:false,
  },
  price:{//分
    type:DataTypes.INTEGER(11),
    allowNull:false
  },
  stock:{
    type:DataTypes.INTEGER(4),
    allowNull:false,
    defaultValue:0
  }
},{
  underscored:true, // 启用下划线命名法
  freezeTableName:true,
  timestamps:true
})