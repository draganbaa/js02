module.exports = {
  getError(errors, prop) {
    //prop is "email" or "password" or ...
    try {
      return errors.mapped()[prop].msg;
    } catch (err) {
      return "";
    }
  },
};
