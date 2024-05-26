// 프로젝트 내부 파일
const db = require("../data/database");

class Auth {
  constructor(id, passwd) {
    this.id = id;
    this.passwd = passwd;
  }

  async signup() {
    const newUser = await db
      .getDb()
      .collection("user")
      .insertOne({ id: this.id, passwd: this.passwd });
  }

  async login() {
    const userLogin = await db
      .getDb()
      .collection("user")
      .findOne({ id: this.id });

    return userLogin;
  }
}

module.exports = Auth;
