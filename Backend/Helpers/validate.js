const user = require("../model/user");

exports.validateEmail = (email) => {
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return regex.test(String(email));
};


exports.validateLength = (text, min, max) => {
  if(text.length < min || text.length > max) {
    return false;
  }
  return true;

};

exports.validateUsername = async (userName) => {
  let isUnique = false;
  let uniqueUsername = userName;

  do {
    const existingUser = await user.findOne({ userName: uniqueUsername });
    if(existingUser) {
      uniqueUsername += Math.floor(10 +Math.random() * 99)
    } else{
      isUnique = true;
    }
  } while (!isUnique);
  return uniqueUsername;

}