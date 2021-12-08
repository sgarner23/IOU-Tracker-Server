const bcrypt = require("bcrypt");

async function storeNewUser(req, res) {
  try {
    const db = req.app.get("db");
    const { firstName, lastName, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    await db.users.save({
      first_name: firstName,
      last_name: lastName,
      email,
      password_hash: passwordHash,
    });
    res.status(200).send("User created successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating user");
  }
}

module.exports = {
  storeNewUser,
};
