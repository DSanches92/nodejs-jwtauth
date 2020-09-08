const config = require("../config/db.config.js")

const Sequelize = require("sequelize")
const conexao = new Sequelize(config.DB, config.USER, config.PASSWD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle
  }
})

const db = {}

db.Sequelize = Sequelize;
db.conexao = conexao;
db.user = require("../models/user.model.js")(conexao, Sequelize)
db.role = require("../models/role.model.js")(conexao, Sequelize)

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
})

db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
})

db.ROLES = ["usuario", "moderador", "administrador"]

module.exports = db
