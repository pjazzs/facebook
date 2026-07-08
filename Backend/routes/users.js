const express = require("express");
const { register, login, activateAccount, resendVerification, forgotPassword, resetPassword} = require("../controllers/usersCtrl");

const router = express.Router()

router.post("/register", register )
router.post("/login", login )
router.get("/activate/:token", activateAccount);
router.post("/resend", resendVerification);
router.post("/forgot", forgotPassword);
router.post("/reset/:token", resetPassword);

module.exports = router;