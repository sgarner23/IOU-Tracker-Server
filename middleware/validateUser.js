const jwt = require("jsonwebtoken");

async function validateUser(req, res, next) {
  try {
    if (!req.headers.access_token || !req.headers.access_token) {
      return res.status(401).send({ message: "Missing JWT validation" });
    }
    //make sure the cookie was signed with the right jwt secret
    jwt.verify(req.headers.access_token, process.env.JWT_SECRET);

    //decode the token and give us a JSON token back
    const decoded = jwt.decode(req.headers.access_token, {
      json: true,
    });

    req.userID = decoded.id;

    // Trigger the next function to run
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send({ message: "Problem validating JWT" });
  }
}

module.exports = {
  validateUser,
};
