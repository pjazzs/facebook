const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

exports.sendVerificationEmail = async (email, name, url) => {
    try {
        await resend.emails.send({
            from: process.env.FROM_EMAIL,
            to: "opeyemishittu72@gmail.com",
            subject: "Activate your Facebook account",
            html: `
                <div style="width:700px;margin:auto;font-family:Roboto">
                    
                    <div style="display:flex;align-items:center;gap:10px;color:#3b5998;font-weight:600;">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" width="30" />
                        <span>Action required: Activate your account</span>
                    </div>

                    <div style="padding:20px 0;border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;">
                        <p>Hello, ${name}</p>
                        <p>You recently created an account. Please confirm your account below:</p>
                    </div>

                    <div style="padding:20px 0;">
                        <a href="${url}" 
                           style="padding:10px 15px;background:#1877f2;color:#fff;text-decoration:none;font-weight:600;">
                           Confirm your account
                        </a>
                    </div>

                    <div style="color:#898f9c;">
                        Facebook helps you stay connected with friends and family.
                    </div>

                </div>
            `,
        });

    } catch (error) {
        console.error("Email send failed:", error.message);
        throw error;
    }
};