const { authJwt } = require("../middleware")
const controller = require("../controllers/user.controller.js")
const { isAdmin } = require("../middleware/authJwt")

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    )
    next()
  })

  app.get("/api/test/all", controller.acessoTotal)

  app.get(
    "/api/test/user",
    [authJwt.verificaToken],
    controller.quadroUsuario
  )

  app.get(
    "/api/test/mod",
    [authJwt.verificaToken, authJwt.isModerador],
    controller.quadroModerador
  )

  app.get(
    "/api/test/admin",
    [authJwt.verificaToken, authJwt.isAdmin],
    controller.quadroAdmin
  )
}
