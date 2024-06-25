// 프로젝트 내부 파일
const Posting = require("../models/post.model");

async function getList(req, res) {
  const posting = new Posting();

  const list = await posting.findTag();

  const allList = await posting.findAll();

  res.render("post-list", { list: list, allList: allList });
}

function getWriting(req, res) {
  res.render("writing");
}

function posting(req, res) {
  let post = {
    title: req.body.title,
    contents: req.body.contents,
    tag: [],
  };

  if (post.contents.match(/HTML/)) {
    post.tag[0] = 1;
  }

  if (post.contents.match(/CSS/)) {
    post.tag[1] = 1;
  }

  if (post.contents.match(/JavaScript/)) {
    post.tag[2] = 1;
  }

  const posting = new Posting(post.title, post.contents, post.tag);

  posting.newPost();

  res.redirect("/");
}

async function getPost(req, res) {
  const id = req.params.id;
  
  const posting = new Posting();

  const contents = await posting.findById(id);

  res.render("post-contents", { contents: contents })
}

module.exports = {
  getList: getList,
  getWriting: getWriting,
  posting: posting,
  getPost: getPost,
};
