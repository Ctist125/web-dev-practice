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
    const userData = await db
      .getDb()
      .collection("users")
      .findOne({ userId: this.id });

    if (userData.userPw === this.pw) {
      return true;
    } else {
      return false;
    }
  }

  async findById() {
    const userData = await db
      .getDb()
      .collection("users")
      .findOne({ userId: this.id });

    if (!userData) {
      return false;
    } else {
      return userData.userPw;
    }
  }
}

// exports
module.exports = Auth;
