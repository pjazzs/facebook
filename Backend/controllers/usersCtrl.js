const { sendVerificationEmail } = require("../Helpers/mailer");
const { createToken } = require("../Helpers/token");
const {validateEmail, validateLength, validateUsername} = require("../Helpers/validate")
const user = require("../model/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
exports.register = async (req, res) => {
    try {
        const {
            first_name,
            last_name,
            email,
            password,
            dob,
            gender
        } = req.body;

        if (!dob) {
    return res.status(400).json({ message: "Date of birth is required" });
}

        const [byear, bmonth, bday] = dob.split("-").map(Number);

        if (!validateEmail(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
const normalizedEmail = email.toLowerCase().trim();


       const checkEmail = await user.findOne({ email: normalizedEmail });
        if (checkEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        if (!validateLength(first_name, 4, 30)) {
            return res.status(400).json({
                message: "First name must be between 4 and 30 characters"
            });
        }

        if (!validateLength(last_name, 4, 30)) {
            return res.status(400).json({
                message: "Last name must be between 4 and 30 characters"
            });
        }

        if (!validateLength(password, 6, 20)) {
            return res.status(400).json({
                message: "Password must be between 6 and 20 characters"
            });
        }

        const hashPassword = await bcrypt.hash(password, 12);

        const tempName = `${first_name}${last_name}`;
        const newUserName = await validateUsername(tempName);

        const newUser = await new user({
            first_name,
            last_name,
            userName: newUserName,
            email,
            password: hashPassword,
            byear,
            bmonth,
            bday,
            gender
        }).save();

       const emailVerificationToken = await createToken(
    { id: newUser._id.toString() },
    "1d"
);

        const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;

        try {
            await sendVerificationEmail(
                newUser.email,
                newUser.first_name,
                url
            );
        } catch (emailError) {
            console.error(
                "Email sending failed:",
                emailError.message
            );
        }

        const token = await createToken({
            id: newUser._id.toString()
        });

        return res.status(201).send({
            id: newUser._id.toString(),
            userName: newUser.userName,
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            pictures: newUser.pictures,
            verified: newUser.verified,
            token: token,
            message:
                "Registration successful! Please check your email to verify your account."
        });

    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({
            message: error.message || "Internal server error"
        });
    }
};


exports.login = async(req, res) => {
    try {
        const {email, password} = req.body

        const checkUser = await user.findOne({email})
        if(!checkUser){
            return res.status(400).json({message: "The email address you entered is not connected to an account..."})
        }

        const isMatch = await bcrypt.compare(password, checkUser.password)
        if(!isMatch){
            return res.status(400).json({message: "Invalid credentials. Please try again."})
        }

        const token = await createToken({ id: checkUser._id.toString() })

        res.send({
            id: checkUser._id.toString(),
            userName: checkUser.userName,
            first_name: checkUser.first_name,
            last_name: checkUser.last_name,
            pictures: checkUser.pictures,
            verified: checkUser.verified, 
            token: token
        })

    } catch (error) {
        res.status(500).json({error: error.message})
    }
}


exports.activateAccount = async (req, res) => {
    try {
        const { token } = req.params;

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

        const check = await user.findById(decoded.id);

        if (!check) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (check.verified) {
            return res.status(400).json({
                message: "Account already activated"
            });
        }

        await user.findByIdAndUpdate(decoded.id, {
            verified: true
        });

        return res.json({
            message: "Account activated successfully"
        });

    } catch (error) {
        if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
            return res.status(400).json({
                message: "Invalid or expired token"
            });
        }

        return res.status(500).json({
            message: "Server error"
        });
    }
};



exports.resendVerification = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        if (user.verified) {
            return res.status(400).json({ message: "Account already verified" });
        }

        const token = createToken({ id: user._id.toString() });

        const url = `${process.env.BASE_URL}/activate/${token}`;

        await sendVerificationEmail(user.email, user.first_name, url);

        res.json({ message: "Verification email resent" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const token = createToken({ id: user._id.toString() });

        const url = `${process.env.BASE_URL}/reset/${token}`;

        await sendResetPasswordEmail(user.email, user.first_name, url);

        res.json({ message: "Password reset email sent" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



exports.resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const userData = jwt.verify(token, process.env.TOKEN_SECRET);

        const hashedPassword = await bcrypt.hash(password, 12);

        await User.findByIdAndUpdate(userData.id, {
            password: hashedPassword
        });

        res.json({ message: "Password has been reset successfully" });

    } catch (error) {
        res.status(500).json({ message: "Invalid or expired token" });
    }
};