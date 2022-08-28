require("dotenv").config();

const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/", router);
app.listen(5000, () => console.log("Server Running"));

    /* SECONDARY EMAIL */
// service: 'gmail',
// auth: {
// user: "replyno675@gmail.com",
// pass: "kurpcpgaxmuofnyd",
// //pass: "noReply123!",
// },
const contactEmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
    user: "ditto.website.submission@gmail.com",
    pass: "lbnxmixnyddmqadv",
    // pass: "xerxes1972",
    },
});

contactEmail.verify((error) => {
    if (error) {
    console.log(error);
    } else {
    console.log("Ready to Send");
    }
});

router.post("/contact", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message; 
    const mail = {
    from: name,
    to: "sandyditto47@gmail.com",
    subject: "Contact Form Submission",
    text: " ",
    html: `<p>Name: ${name}</p>
            <p>Email: ${email}</p>
            <p>Message: ${message}</p>`,
    };
    contactEmail.sendMail(mail, (error) => {
        if (error) {
            res.json({ status: "ERROR" });
        } else {
            res.json({ status: "Message Sent" });
        }
    });
});