const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express()

var corsOptions = {
  origin: "http://localhost:8081"
}

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const db = require("./app/models")
const Role = db.role

db.conexao.sync({ force: true }).then(() => {
  console.log("Tabelas recriadas!")
  inicializar()
})

function inicializar() {
  Role.create({
    id: 1,
    nome: "usuario"
  })
  Role.create({
    id: 2,
    nome: "moderador"
  })
  Role.create({
    id: 3,
    nome: "administrador"
  })
}

app.get("/", (req, res) => {
  res.json({ message: "Node.js + JWT Authentication!" })
})

require("./app/routes/auth.routers")(app)
require("./app/routes/user.routers")(app)

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}.`)
})
