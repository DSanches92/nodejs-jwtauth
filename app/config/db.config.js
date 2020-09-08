module.exports = {
  HOST: "localhost",
  USER: "danilo",
  PASSWD: "123@vai",
  DB: "nodejs_jwt",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}
