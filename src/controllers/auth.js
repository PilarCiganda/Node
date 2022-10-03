const db = require("../../db/index");
const bcrypt = require("bcrypt");

const registro = async (req, res) => {
  try {
    const { mail, name, password } = req.body;

    const user = await db.query("select * from users where mail = $1", [mail]);

    if (user.rowCount > 0) {
      return res.status(400).json({
        data: [],
        message: "Ya existe un usuario con ese correo",
        success: false,
      });
    }

    const salt = await bcrypt.genSalt(10);

    const passwordHashed = await bcrypt.hash(password, salt);
    const newUser = {
      name,
      mail,
      password: passwordHashed,
    };

    await db.query(
      "insert into users(mail, name, password) values($1, $2, $3)",
      [mail, name, passwordHashed]
    );

    return res
      .status(200)
      .json({ data: [newUser], message: "Usuario creado", success: true });

  } catch (error) {
    return res
        .status(500)
        .json({message: "error del servidor", error:error})
  }
};

const login = async (req, res) => {
  try {
    const { mail, password } = req.body;

    const user = await db.query("select * from users where mail = $1", [mail]);

    if (user.rowCount === 0) {
      return res.status(400).json({
        data: [],
        message: "No te conocemos, ¡adiós!",
        success: false,
      });
    }

    const contrasenhaValidada = await bcrypt.compare(
      password,
      user.rows[0].password
    );

    if (!contrasenhaValidada) {
      return res
        .status(400)
        .json({ success: false, message: "Password inválido" });
    }

    return res.status(200).json({ success: true, message: "Logueado :D" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { registro, login };