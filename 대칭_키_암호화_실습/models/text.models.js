// 외부 라이브러리 선언
const mongodb = require("mongodb");

// 프로젝트 내 파일
const db = require("../data/database");
const encryption = require("../util/encryption");

class Contents {
  constructor(text) {
    this.iv = encryption.iv;
    this.text = text;
  }

  async findAll() {
    return await db.getDb().collection("text").find().toArray();
  }

  async encryptionText() {
    // 암호화 복호화
    const encrypted = encryption.encrypt(this.text);
    const decrypted = encryption.decrypt(encrypted);

    const result = {
      iv: this.iv,
      before: this.text,
      encrypted: encrypted,
      decrypted: decrypted,
    };

    return await db
      .getDb()
      .collection("text")
      .insertOne({ ...result });
  }

  async reEncryptionText(id) {
    const objectId = new mongodb.ObjectId(id);

    // 암호화 복호화
    const encrypted = encryption.encrypt(this.text);
    const decrypted = encryption.decrypt(encrypted);

    const result = {
      iv: this.iv,
      before: this.text,
      encrypted: encrypted,
      decrypted: decrypted,
    };

    return await db
      .getDb()
      .collection("text")
      .updateOne({ _id: objectId }, { $set: { ...result } });
  }
}

module.exports = Contents;
