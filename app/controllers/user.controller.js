exports.acessoTotal = (req, res) => {
  res.status(200).send("Conteúdo Público.")
}

exports.quadroUsuario = (req, res) => {
  res.status(200).send("Perfil usuário.")
}

exports.quadroModerador = (req, res) => {
  res.status(200).send("Perfil moderador.")
}

exports.quadroAdmin = (req, res) => {
  res.status(200).send("Perfil administrador.")
}
