module.exports = (conexao, Sequelize) => {
  const Role = conexao.define("roles", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    nome: {
      type: Sequelize.STRING
    }
  })

  return Role
}
