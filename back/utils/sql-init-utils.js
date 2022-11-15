const { User } = require("../models");
const bcrypt = require("bcrypt");

async function sqlInitUtils() {
  try {
    // set default users
    console.log("sql init utils");

    const hash = await bcrypt.hash("123", 12);
    // const hash = "123";

    console.log(hash);
    await User.create({
      user_id: "foo",
      password: hash,
      name: "john doe",
    });
    await User.create({
      user_id: "bar",
      password: hash,
      name: "kane william",
    });
  } catch (e) {
    console.log(e);
  }
}

module.exports = sqlInitUtils;
