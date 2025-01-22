// 외부 라이브러리 선언
const mongodb = require("mongodb");

// mongodb
const MongoClient = mongodb.MongoClient;

// database 연결 확인을 위한 변수 선언
let database;

async function connectToDatabase() {
  const client = await MongoClient.connect("mongodb://localhost:27017");
  database = client.db("encryption");
}

function getDb() {
  if (!database) {
    throw new Error("먼저 데이터베이스를 연결해 주십시오.");
  }

  return database;
}

module.exports = {
  connectToDatabase: connectToDatabase,
  getDb: getDb,
};
