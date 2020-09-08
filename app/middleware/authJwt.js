const jwt = require("jsonwebtoken")
const config = require("../config/auth.config.js")
const db = require("../models")
const { ne } = require("sequelize/types/lib/operators")
const User = db.user

verificaToken = (req, res, next) => {
  let token = req.headers["x-access-token"]

  if (!token) {
    return res.status(403).send({
      message: "Nenhum token informado!"
    })
  }

  jwt.verify(token, config.secret, (erro, decoded) => {
    if (erro) {
      return res.status(401).send({
        message: "Não autorizado!"
      })
    }
    req.userId = decoded.id
    next()
  })
}

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].nome === "administrador"){
          next()
          return
        }
      }

      res.status(403).send({
        message: "Requer perfil de Administrador!"
      })
      return
    })
  })
}

isModerador = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].nome === "moderador"){
          next()
          return
        }
      }

      res.status(403).send({
        message: "Requer perfil de Moderador!"
      })
      return
    })
  })
}

isModeradorOuAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {

        if (roles[i].nome === "moderador"){
          next()
          return
        }

        if (roles[i].nome === "administrador"){
          next()
          return
        }
      }

      res.status(403).send({
        message: "Requer perfil de Moderador ou de Administrador!"
      })
      return
    })
  })
}

const authJwt = {
  verificaToken: verificaToken,
  isAdmin: isAdmin,
  isModerador: isModerador,
  isModeradorOuAdmin: isModeradorOuAdmin
}

module.exports = authJwt
