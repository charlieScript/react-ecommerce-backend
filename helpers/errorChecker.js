const handleError = (err) => {
  const errors = {
    email: '',
    password: '',
  };

  // console.log(err.message, err.code, err.errors);
  if (err.message == 'Incorrect Password') {
    errors.password = 'Incorrect password';
    return { msg: errors.password };
  }
  // checks for user
  if (err.code === 11000) {
    errors.email = 'Email has been already used';
    return { msg: errors.email };
  }
};

module.exports = handleError;
