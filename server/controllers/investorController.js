const Investor = require("../model/investorDB");
const Investee = require("../model/investeeDB");
const Listing = require("../model/listing");
const Notification = require("../model/notification");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const emailValidator = require("deep-email-validator");
const nodemailer = require("nodemailer");
const env = require('dotenv').config();
const Stripe=require('stripe')

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
        const listing = await Listing.find({ isVerified: true, isActive: true }).populate(
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
        res.json({ status: true, TotalNotifications });

    } catch (error) {
        res.json({ message: error.message, status: false });
    }
};
exports.makePayment = async (req, res) => {
    try {
        // const {listing} = req.body
        const listing = await Listing.findOne({ _id: req.headers.id }).populate("investee_id");
        console.log(listing.investee_id)
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
        const session =await  stripe.checkout.sessions.create({

            success_url: `${process.env.ORIGIN_URL}/user/investor-dashboard/business-catalog/product-page/initiate-investment/payment-success`,
            cancel_url:`${process.env.ORIGIN_URL}/user/investor-dashboard/business-catalog/product-page/initiate-investment/payment-failure`,
            payment_method_types: ['card'],
            mode: 'payment',
            customer: listing.investee_id._id,
            line_items: [
                {
                    price_data:{
                        currency: 'pkr',
                        unit_amount: Number(listing.amount) * 100,
                        product_data: {
                            name: listing.investee_id.businessName,
                            description: listing.description
                        },
                    },
                    quantity: 1,
                },
            ],
        })
        await Listing.findByIdAndUpdate({ _id: listing._id }, { session_id: session.id })
        res.json({ message: "payment successful", status: true, session });


    } catch (error) {
        console.log(error)
        res.json({ message: error.message, status: false });
    }
};