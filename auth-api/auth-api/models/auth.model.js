// 프로젝트 내 파일 선언
const db = require("../data/database");

class Auth {
  constructor(id, pw) {
    this.id = id;
    this.pw = pw;
  }

  async signUp() {
    return await db
      .getDb()
      .collection("users")
      .insertOne({ userId: this.id, userPw: this.pw });
  }

  async login() {
    const userInfo = await db
      .getDb()
      .collection("users")
      .findOne({ userId: this.id });

    if (userInfo.userPw === this.pw) {
      return userInfo.userId;
    } else {
      return false;
    }
  }

  async findPw() {
    return await db.getDb().collection("users").findOne({ userId: this.id });
  }
}

// exports
module.exports = Auth;
