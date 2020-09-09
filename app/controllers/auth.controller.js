const db = require("../models")
const config = require("../config/auth.config.js")
const User = db.user
const Role = db.role

const Op = db.Sequelize.Op

var jwt = require("jsonwebtoken")
var bcrypt = require("bcryptjs")

exports.signup = (req, res) => {

  User.create({
    usuario: req.body.usuario,
    email: req.body.email,
    senha: bcrypt.hashSync(req.body.senha, 8)
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            nome: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({
              message: "Usuário registrado com sucesso!"
            })
          })
        })
      } else {
        user.setRoles([1]).then(() => {
          res.send({
            message: "Usuário registrado com sucesso!"
          })
        })
      }
    })
    .catch(erro => {
      res.status(500).send({
        message: erro.message
      })
    })
}

exports.signin = (req, res) => {

  User.findOne({
    where: {
      usuario: req.body.usuario
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "Usuário ou senha inválidos."
        })
      }

      var senhaValida = bcrypt.compareSync(
        req.body.senha,
        user.senha
      )

      if (!senhaValida) {
        return res.status(401).send({
          accessToken: null,
          message: "Usuário ou senha inválidos."
        })
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 Horas
      })

      var authorities = []
      user.getRoles().then(roles => {
        for (let idx = 0; idx < roles.length; idx++) {
          authorities.push("ROLE_" + roles[idx].nome.toUpperCase())
        }
        res.status(200).send({
          id: user.id,
          usuario: user.usuario,
          email: user.email,
          roles: authorities,
          accessToken: token
        })
      })
    })
    .catch(erro => {
      res.status(500).send({
        message: erro.message
      })
    })
}
