module.exports = (conexao, Sequelize) => {
  const User = conexao.define("users", {
    usuario: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    senha: {
      type: Sequelize.STRING
    }
  })

  return User
}
