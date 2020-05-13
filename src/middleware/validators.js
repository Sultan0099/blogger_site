// SECTION : Signup validator
const signUpValidator = (req, res, next) => {
  const { name, email, password } = req.body;
  let err = {};

  // check name

  if (!name) {
    err.name = "Please Enter name";
  } else if (name.length < 3 || name.length > 12) {
    err.name = "Name should be between 3 to 12 character long";
  }

  //  check email
  const emailRegx = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g;

  if (!email) {
    err.email = "please Enter email";
  } else if (!emailRegx.test(email)) {
    err.email = "Email is inCorrect";
  }

  // check password

  if (!password) {
    err.password = "Please Enter password";
  } else if (password.length < 6 || password.length > 15) {
    err.password = "Password should between 6 to 15 character long";
  }

  // check err object

  if (Object.keys(err).length > 0) {
    res.status(400).json({ error: true, errorMsg: err });
  } else {
    req.user = { name, email, password };
    next();
  }
};

// SECTION : signIn  validator
const signInValidator = (req, res, next) => {
  const { email, password } = req.body;
  let err = {};

  //  TODO : [x] check email

  const emailRegx = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g;

  if (!email) {
    err.email = "please Enter email";
  } else if (!emailRegx.test(email)) {
    err.email = "Email is inCorrect";
  }

  // TODO : [x] check password

  if (!password) {
    err.password = "Please Enter password";
  } else if (password.length < 6 || password.length > 15) {
    err.password = "Password should between 6 to 15 character long";
  }

  // check err object

  if (Object.keys(err).length > 0) {
    res.status(400).json(err);
  } else {
    next();
  }
};

const postValidator = (req, res, next) => {
  const { title, body } = req.body;
  const err = {};

  if (!title) {
    err.title = "Title must be required";
  } else if (title.length < 5 || title.length > 15) {
    err.title = "title must between 8 to 15 character long";
  }

  if (!body) {
    err.body = "body must be required";
  }

  if (Object.keys(err).length > 0) {
    res.status(400).json({ success: false, err });
  } else {
    next();
  }
};

// exporting functions
module.exports = { signUpValidator, signInValidator, postValidator };
