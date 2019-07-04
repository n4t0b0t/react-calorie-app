const { secureUser } = require("../controllers/account.controller");
const jwt = require("jsonwebtoken");

const jwtSecret = "secretKey"; // SHOULD NOT BE HERE - SAVE ELSEWHERE

function signToken(id, username) {
  const token = jwt.sign(
    { sub: id, iat: new Date().getTime(), username },
    jwtSecret,
    { expiresIn: "1h" }
  );
  return token;
}

async function checkUserToken(auth) {
  const token = auth.split(" ")[1] || "asdf";
  console.log("headerToken", token);
  const decoded = jwt.verify(token, jwtSecret);
  console.log("decoded", decoded);
  try {
    const foundUser = await secureUser(decoded.sub);
    if (foundUser) {
      return { username: foundUser.username };
    }
  } catch (err) {
    return err;
  }
}

module.exports = { signToken, checkUserToken };
