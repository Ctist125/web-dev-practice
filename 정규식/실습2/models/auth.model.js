// 프로젝트 내 파일
const db = require("../data/database");

class Auth {
  constructor(id, passwd) {
    this.id = id;
    this.passwd = passwd;
  }

  async signup() {
    const userInput = {
      id: this.id,
      passwd: this.passwd,
    };

    return await db.getDb().collection("users").insertOne(userInput);
  }

  async signin() {
    const userInput = {
      id: this.id,
      passwd: this.passwd,
    };

    const userInfo = await db
      .getDb()
      .collection("users")
      .findOne({ id: userInput.id });

    if (userInfo) {
      if (userInput.passwd === userInfo.passwd) {
        return userInfo;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}

module.exports = Auth;
