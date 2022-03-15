const layout = require("../layout");

const getError = (errors, prop) => {
  //prop is "email" or "password" or ...
  try {
    return errors.mapped()[prop].msg;
  } catch (err) {
    return "";
  }
};

module.exports = ({ req, errors }) => {
  return layout({
    content: `
  <div>
    Your Id: ${req.session.userId}
      <form method="POST">
        <input name="email" placeholder="email" />
        ${getError(errors, "email")}
        <input name="password" placeholder="password" type="password" />
        ${getError(errors, "password")}
        <input name="passwordConfirm" placeholder="password-confirm" type="password" />
        ${getError(errors, "passwordConfirm")}
        <button>Sign Up!</button>
      </form>
    </div>
    `,
  });
};
