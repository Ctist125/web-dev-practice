const db = require("../data/database");

class Auth {
  constructor(id, passwd) {
    this.id = id;
    this.passwd = passwd;
  }

  async signup() {
    await db
      .getDb()
      .collection("user")
      .insertOne({ id: this.id, passwd: this.passwd });
  }

  async loginFindId() {
    const userData = await db.getDb().collection("user").findOne({ id: this.id });
    return userData;
  }
}

module.exports = Auth;
