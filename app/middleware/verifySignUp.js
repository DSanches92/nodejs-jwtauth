const db = require("../models")
const ROLES = db.ROLES
const User = db.user

verificaUsuarioOuEmailDuplicado = (req, res, next) => {
  //Usuario
  User.findOne({
    where: {
      usuario: req.body.usuario
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Usuário já está em uso!"
      })
      return
    }

    //Email
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Email já está em uso!"
        })
        return
      }

      next()
    })
  })
}

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let index = 0; index < req.body.roles.length; index++) {
      if (!ROLES.includes(req.body.roles[index])) {
        res.status(400).send({
          message: "Falha! Perfil " + req.body.roles[index] + " não existe."
        })
        return
      }
    }
  }

  next()
}

const verifySignUp = {
  verificaUsuarioOuEmailDuplicado: verificaUsuarioOuEmailDuplicado,
  checkRolesExisted: checkRolesExisted
}

module.exports = verifySignUp
