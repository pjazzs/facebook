const jwt = require("jsonwebtoken")

exports.createToken = (payload, expiresIn) => {
    try {
        const token = jwt.sign(payload, process.env.TOKEN_SECRET, {expiresIn: expiresIn || "1d"})
        return token
    } catch (error) {
        console.error("Error creating token:", error)
        throw new Error("Failed to create token")
    }
}

exports.createLoginToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};