const Investor = require("../model/investorDB");
const Investee = require("../model/investeeDB");
const Listing = require("../model/listing");
const Notification = require("../model/notification");
const Chat = require("../model/chat");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const emailValidator = require("deep-email-validator");
const nodemailer = require("nodemailer");
const env = require('dotenv').config();
const Stripe = require('stripe')
const PDFDocument = require('pdfkit');
const fs = require('fs');
// const { ref, uploadBytes, getDownloadURL } = require("@firebase/storage");
// const { storage } = require("../uitls/firebase");

exports.getMe = async (req, res) => {
    try {
        const investor = await Investor.findOne({ _id: req.user });
        if (investor) {
            res.json({
                status: true,
                investor,
            });
        }
    } catch (error) {
        res.json({ message: error.message, status: false });
    }
};

exports.getListing = async (req, res) => {
    try {
        const listing = await Listing.find({ isVerified: true, isActive: true, payment_session_id: { $exists: false } }).populate(
            "investee_id"
        );
        if (listing) {
            res.json({
                status: true,
                listing,
            });
        }
    } catch (error) {
        res.json({ message: error.message, status: false });
    }
};

exports.getProduct = async (req, res) => {
    try {
        const listing = await Listing.findOne({ _id: req.headers.id }).populate("investee_id");
        console.log(listing);
        const investorId = req.user
        res.json({ status: true, listing, investorId });
    } catch (error) {
        res.json({ status: false, message: error.message });
    }
};
exports.getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ investorId: req.user }).sort({ createdAt: -1 })
        res.json({
            status: true,
            notifications
        });
    } catch (error) {
        res.json({ message: error.message, status: false });
    }
};

exports.setMarkAsRead = async (req, res) => {
    try {
        const notifications = await Notification.findByIdAndUpdate({ _id: req.body.notificationId }, { isRead: true })
        res.json({
            status: true,
        });
    } catch (error) {
        res.json({ message: error.message, status: false });
    }
};

exports.getStats = async (req, res) => {
    try {
        const TotalNotifications = await Notification.countDocuments({ investorId: req.user })
        const listing = await Listing.find({ investor_id: req.user })
        console.log(listing)
        const totalAmount = listing.map(item => parseInt(item.amount)).reduce((acc, curr) => acc + curr, 0);

        console.log("Total amount:", totalAmount);
        res.json({ status: true, TotalNotifications, totalAmount });

    } catch (error) {
        res.json({ message: error.message, status: false });
    }
};
exports.checkoutSession = async (req, res) => {
    try {

        const listing = await Listing.findOne({ _id: req.headers.id }).populate("investee_id");
        const investor = await Investor.findOne({ _id: req.user })
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
        if (req.body.checkbox) {
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                mode: 'payment',
                customer: listing?.investee_id?._id,
                customer_email: investor?.email,
                line_items: [
                    {
                        price_data: {
                            currency: 'pkr',
                            unit_amount: Number(listing?.amount) * 100,
                            product_data: {
                                name: listing?.investee_id?.businessName,
                                description: listing?.description
                            },
                        },
                        quantity: 1,
                    },
                ],
                success_url: `${process.env.ORIGIN_URL}/user/investor-dashboard/business-catalog/product-page/initiate-investment/payment-success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${process.env.ORIGIN_URL}/user/investor-dashboard/business-catalog/product-page/initiate-investment/payment-failure`,
            })
            await Listing.findByIdAndUpdate({ _id: listing?._id }, {
                payment_session_id: session?.id
            })
            res.json({ message: "checkout successful", status: true, session });
        } else {
            res.json({ message: "agreement not signed", status: false });

        }
    } catch (error) {
        console.log(error)
        res.json({ message: error.message, status: false });
    }
};
exports.paymentSuccess = async (req, res) => {
    try {
        const doc = new PDFDocument();
        const investor = await Investor.findOne({ _id: req.user })
        if (req.body.sessionId) {
            const listing = await Listing.findOne({ payment_session_id: req.body.sessionId }).populate("investee_id investor_id");
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');
            const currentDay = currentDate.getDate().toString().padStart(2, '0');
            const formattedCurrentDate = `${currentDay}-${currentMonth}-${currentYear}`;
            // setting up end date
            const investmentDuration = listing?.investmentDuration // Assuming the investment duration is 1 year
            const endYear = parseInt(currentYear) + parseInt(investmentDuration);
            const endMonth = currentMonth;
            const endDay = currentDay;
            const formattedEndDate = `${endDay}-${endMonth}-${endYear}`;
            // await Listing.findByIdAndUpdate({ _id: listing?._id }, {
            //     investor_id: investor._id, investment_start_date: formattedCurrentDate,
            //     investment_end_date: formattedEndDate
            // })
            console.log(listing)

            const transporter = await nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: `${process.env.EMAIL}`,
                    pass: `${process.env.password}`,
                },
            });
            const mailOptions = await {
                from: "investify180@gmail.com",
                to: investor?.email,
                subject: "Investify | Investee",
                html: `<!DOCTYPE html>
                <html>
                <head>
                <title>Update Listing</title>
                <style>
                    body {
                    font-family: Arial, sans-serif;
                    }
          
                    .container {
                    max-width: 500px;
                    margin: 0 auto;
                    padding: 20px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    }
          
                    h2 {
                    text-align: center;
                    }
          
                    .btn {
                    display: inline-block;
                    background-color: #4CAF50;
                    color: white;
                    padding: 10px 20px;
                    text-decoration: none;
                    border-radius: 5px;
                    }
                </style>
                </head>
                <body>
                <div class="container">
                    <h2>Congratulations on your new investment.</h2>
                    <p>Dear ${investor?.firstName},</p>
                    <p>You have invested in a new business as you payment was successful you can now monitor the company profits from the investments tab of your dashboard. we wish you best of luck for future</p>
                    <p>
                    </p>
                    <p>Thank you for choosing our platform. If you have any questions or need further assistance, please don't hesitate to contact our support team.</p>
                    <p>Best regards,<br/>Investify Team</p>
                </div>
                </body>
                </html>`,
            };
            await transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log("Error" + error);
                } else {
                    console.log("Email sent:" + info.response);
                }
            });
            const filename = `${Date.now()}-agreement.pdf`;
            console.log(filename)
            doc.pipe(fs.createWriteStream(filename));
            doc.fontSize(25);


            doc.text('Investify- Investment Agreement Deed between Investor and Investee/Business', { align: 'center' });
            doc.text(`This is to certify that investor Mr/Mrs ${listing?.investor_id?.firstName} ${listing?.investor_id?.lastName} bearing CNIC number ${listing?.investor_id?.cnic} has invested Rs ${listing?.amount} in a business named as ${listing?.investee_id?.businessName} having CNIC number ${listing?.investee_id?.cnic}.`, { align: 'justify', });
            doc.text(`This agreement will remain valid for a period of ${listing?.investmentDuration} years in which the investor will get ${listing?.profitPercentage}% share of profit from the business. In case of any violation of contration strict legal action will be taken.`, { align: 'justify' });
            doc.text(`e-signed by ${listing?.investor_id?.firstName} ${listing?.investor_id?.lastName}`, { align: 'center' });
            doc.text('Investor signature here', { align: 'center' });
            doc.text(`e-signed by ${listing?.investee_id?.businessName}`, { align: 'center' });
            doc.text('Investee signature here', { align: 'center' });
            doc.end();
            console.log(filename)


            // const fileRef = ref(storage, `upload/verification_docs/${Date.now() + file.name}`);

            // await uploadBytes(fileRef, file).then((snapshot) => {
            //     getDownloadURL(snapshot.ref).then((url) => {
            //       setUrl(url)
            //     })

            //   });
            res.json({ message: "payment successful", status: true });
        }

    } catch (error) {
        res.json({ message: error.message, status: false });
    }
};
// currently working
exports.paymentFailure = async (req, res) => {
    try {
        const investor = await Investor.findOne({ _id: req.user })
        if (req.body.sessionId) {
            const listing = await Listing.findOne({ payment_session_id: req.body.sessionId }).populate("investee_id");
            console.log(listing)
            // setting up current date
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');
            const currentDay = currentDate.getDate().toString().padStart(2, '0');
            const formattedCurrentDate = `${currentDay}-${currentMonth}-${currentYear}`;
            // setting up end date
            const investmentDuration = listing?.investmentDuration // Assuming the investment duration is 1 year
            const endYear = parseInt(currentYear) + parseInt(investmentDuration);
            const endMonth = currentMonth;
            const endDay = currentDay;
            const formattedEndDate = `${endDay}-${endMonth}-${endYear}`;
            await Listing.findByIdAndUpdate({ _id: listing?._id }, {
                investor_id: investor._id, investment_start_date: formattedCurrentDate,
                investment_end_date: formattedEndDate
            })
            res.json({ message: "payment successful", status: true, });
        }

    } catch (error) {
        res.json({ message: error.message, status: false });
    }
};

exports.getInvestments = async (req, res) => {
    try {
        const investor = await Investor.findOne({ _id: req.user })
        console.log(investor._id)
        const listing = await Listing.find({ isVerified: true, investor_id: investor._id }).populate(
            "investee_id investor_id"
        );
        // console.log(listing)
        if (listing) {
            res.json({
                status: true,
                listing,
            });
        }
    } catch (error) {
        res.json({ message: error.message, status: false });
    }
};

exports.getChatUser = async (req, res) => {
    try {
        const chatUser = await Investee.findOne({ _id: req.body.id2 })
        if (chatUser) {
            res.json({
                status: true,
                chatUser
            });
        }

    } catch (error) {

    }
}




