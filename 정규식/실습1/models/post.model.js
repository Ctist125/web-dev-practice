// 외부 라이브러리 선언
const mongodb = require("mongodb");

// 프로젝트 내부 파일
const db = require("../data/database");

class Posting {
  constructor(title, contents, tag) {
    this.title = title;
    this.contents = contents;
    this.tag = tag;
  }

  newPost() {
    let post = {
      title: this.title,
      contents: this.contents,
      tag: this.tag,
    };

    if (this.tag[0]) {
      post.tag[0] = "HTML";
    }

    if (this.tag[1]) {
      post.tag[1] = "CSS";
    }

    if (this.tag[2]) {
      post.tag[2] = "JavaScript";
    }

    if (!this.tag[0] && !this.tag[1] && !this.tag[2]) {
      post.tag = [];
    }

    return db.getDb().collection("posts").insertOne(post);
  }

  async findTag() {
    const htmlTagList = await db.getDb().collection("posts").find({ tag: "HTML" }).toArray();
    const cssTagList = await db.getDb().collection("posts").find({ tag: "CSS" }).toArray();
    const jsTagList = await db.getDb().collection("posts").find({ tag: "JavaScript" }).toArray();

    const tagTitle = {
      html: htmlTagList,
      css: cssTagList,
      js: jsTagList,
    }

    return tagTitle;
  }

  async findAll() {
    const allPost = await db.getDb().collection("posts").find().toArray();

    return allPost;
  }

  async findById(id) {
    const postId = new mongodb.ObjectId(id);

    const post = await db.getDb().collection("posts").findOne({ _id: postId })

    return post;
  }
}

module.exports = Posting;
