const Mail = require('nodemailer')

const sendEmail = async (email,subject,text,url) => {

    const testAccount = await Mail.createTestAccount()
    console.log(testAccount)
    const transporter = await Mail.createTransport({
            host: "smtp-mail.outlook.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: "mahmoudhassaneng@outlook.com", // generated ethereal user
              pass: "caf2021style", // generated ethereal password
            },
        })
    
    const info = await transporter.sendMail({
        from: `Z-Blogger app <mahmoudhassaneng@outlook.com>`,
        to:email,
        subject:subject,
        html:`<p>${text}</p>
        <a href="${url}">${url}</a>`
    },(err,data) => {
        if(err)
        {
            console.log("Error sending email ",err)
        }
        else
        {
            console.log("Email sent successfully");
        }
    })

}   


module.exports = sendEmail