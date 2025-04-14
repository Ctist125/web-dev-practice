function noEmpty(value) {
  if (!value.trim()) {
    return false;
  } else {
    return true;
  }
}

// exports
module.exports = {
    noEmpty: noEmpty,
};
