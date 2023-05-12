const uuid = require('uuid');
const bcrypt = require('bcrypt');
const Sib = require('sib-api-v3-sdk');
const User = require('../models/users');
const ForgotPassword = require('../models/forgotPassword')

function generateUUID() {
    return uuid.v1()
}

const forgotpassword = async (req, res) => {
    try {
        const { email } = req.body;
        const uuidx = generateUUID();

        const client = Sib.ApiClient.instance;

        const apiKey = client.authentications['api-key']
        apiKey.apiKey = process.env.SEND_IN_BLUE_API_KEY

        // create a transactional email message
        let sendSmtpEmail = new Sib.SendSmtpEmail()
        sendSmtpEmail.to = [{ "email": email }]
        sendSmtpEmail.sender = { "email": "akashbadhi7@gmail.com", "name": "Akash" }
        sendSmtpEmail.subject = "Reset-Password"
        sendSmtpEmail.textContent = "Hey Click below to reset Your Password"

        sendSmtpEmail.htmlContent = `<form onsubmit="submitPass(event)" ><a href="http://localhost:4000/password/resetpassword/${uuidx}">Reset Password</a></form>`

        const apiInstance = new Sib.TransactionalEmailsApi();
        await apiInstance.sendTransacEmail(sendSmtpEmail);
        const userRequesting = await User.findOne({ email: email });
        await ForgotPassword.create({ uuid: uuidx, userId: userRequesting._id, isactive: true });

        res.status(200).json({ message: "Email sent successfully.", uuid: uuidx });
    }
    catch (err) {
        return res.json({ message: err, sucess: false });
    }

}

const resetpassword = async (req, res) => {
    try {
        console.log(123)
        const uuid = req.params.uuid
        const row = await ForgotPassword.find({uuid: uuid})
        if(row && row[0].isactive){
            res.status(200).send(`<html>
                                    <script>
                                        function formsubmitted(e){
                                            e.preventDefault();
                                            console.log('called')
                                        }
                                    </script>
                                    <form action="/password/updatepassword/${uuid}" method="GET">
                                        <label for="newpassword">Enter New password</label>
                                        <input name="newpassword" type="password" required></input>
                                        <button>reset password</button>
                                    </form>
                                </html>`)
        }

    }
    catch (error) {
        return res.json({ message: error, sucess: false });
    }
}

const updatepassword = async (req, res) => {

    try {
        const uuid = req.params.uuid
        const row = await ForgotPassword.find({ uuid: uuid })
        const newPassword = req.query.newpassword

        if (row) {
            const UserId = row[0].userId;
            await ForgotPassword.updateOne({ uuid: uuid }, { $set: { isactive: false } })

            const salt = await bcrypt.genSalt(10)
            const hashedPass = await bcrypt.hash(newPassword, salt)

            await User.updateOne({ _id: UserId }, { $set: { password: hashedPass } })

            res.redirect('http://localhost:3000/login')
        }
    }
    catch (error) {
        return res.status(403).json({ error, success: false })
    }

}


module.exports = {
    forgotpassword,
    updatepassword,
    resetpassword
}