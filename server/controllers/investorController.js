const Investor = require("../model/investorDB");
const Investee = require("../model/investeeDB");
const Listing = require("../model/listing");
const Notification = require("../model/notification");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const emailValidator = require("deep-email-validator");
const nodemailer = require("nodemailer");
const env = require('dotenv').config();
const Stripe = require('stripe')

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
exports.makePayment = async (req, res) => {
    try {
        // const {listing} = req.body
        const listing = await Listing.findOne({ _id: req.headers.id }).populate("investee_id");
        const investor = await Investor.findOne({ _id: req.user })
        // console.log(req.body.checkbox)
        // console.log(listing.investee_id)
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
        if (req.body.checkbox) {
            const session = await stripe.checkout.sessions.create({
                success_url: `${process.env.ORIGIN_URL}/user/investor-dashboard/business-catalog/product-page/initiate-investment/payment-success`,
                cancel_url: `${process.env.ORIGIN_URL}/user/investor-dashboard/business-catalog/product-page/initiate-investment/payment-failure`,
                payment_method_types: ['card'],
                mode: 'payment',
                customer: listing?.investee_id?._id,
                customer_email: investor?.email,
                //   customer_name: `${investor?.firstName}+ " " + ${investor?.lastName}`,
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
            })
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
            // updating the listing
            await Listing.findByIdAndUpdate({ _id: listing?._id }, {
                payment_session_id: session?.id, investor_id: investor._id, investment_start_date: formattedCurrentDate,
                investment_end_date: formattedEndDate
            })
            res.json({ message: "payment successful", status: true, session });
        } else {
            res.json({ message: "agreement not signed", status: false });

        }
    } catch (error) {
        console.log(error)
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
        console.log(listing)
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