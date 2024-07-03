// 프로젝트 내 파일
const db = require("../data/database");

class Processing {
  constructor(value) {
    this.value = value;
  }

  async insertInfo() {
    return await db.getDb().collection("list").insertOne(this.value);
  }

  async allList() {
    return await db.getDb().collection("list").find().toArray();
  }
}

module.exports = Processing;
