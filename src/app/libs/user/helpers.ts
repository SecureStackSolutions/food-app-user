import nodemailer from 'nodemailer';

export const getVerificationCode = () =>
    Math.floor(Math.random() * 9001) + 1000;
export const getFutureDate = (args: { seconds?: number; days?: number }) => {
    if (args.seconds) {
        return new Date(Date.now() + args.seconds * 1000);
    } else if (args.days) {
        return new Date(Date.now() + args.days * 1000 * 60 * 60 * 24);
    }
};

export function sendVerificationEmail(to: string, verificationCode: string) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'testMailerLucas@gmail.com',
            pass: 'zjwjbwqkqqbyglis', // google account password'cZ8FvVg5YnJabWf'
        },
    });
    const mailOptions = {
        from: 'testMailerLucas@gmail.com',
        to,
        subject: 'Verify sign in',
        text: `Hello there, please insert the below verification code in the app ${verificationCode}`,
    };
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        }
    });
}
