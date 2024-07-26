// 외부 라이브러리 선언
const bcrypt = require("bcryptjs");

// 프로젝트 내 파일
const db = require("../data/database");

class Auth {
  constructor(id, pw) {
    this.id = id;
    this.pw = pw;
  }

  async signup() {
    const hashedPw = await bcrypt.hash(this.pw, 12);

    return await db
      .getDb()
      .collection("users")
      .insertOne({ id: this.id, pw: hashedPw });
  }

  async signin() {
    return db.getDb().collection("users").findOne({ id: this.id });
  }

  async pwCompare(hashedPw) {
    return await bcrypt.compare(this.pw, hashedPw);
  }
}

module.exports = Auth;
