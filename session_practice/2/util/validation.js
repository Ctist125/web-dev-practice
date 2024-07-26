function noEmpty(value) {
  if (value.trim()) {
    return true;
  } else {
    return false;
  }
}

function noWhiteSpace(value) {
  if (!value.match(/\s/)) {
    return true;
  } else {
    return false;
  }
}

module.exports = {
  noEmpty: noEmpty,
  noWhiteSpace: noWhiteSpace,
};
