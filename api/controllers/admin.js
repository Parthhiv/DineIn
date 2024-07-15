import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { createError } from "../error.js"

export const registeradmin = async (req, res, next) => {
    try {

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newAdmin = new Admin({
            ...req.body,
            password: hash
        })

        await newAdmin.save();

        res.status(201).json("Admin has been created");
    }
    catch (err) {
        next(err)
    }
}

export const loginadmin = async (req, res, next) => {
    try {
        const admin = await Admin.findOne({ username: req.body.username })
        if (!admin) return res.status(400).json({ message: 'Admin not found' });

        const isCorrectPassword = await bcrypt.compare(req.body.password, admin.password);
        if (!isCorrectPassword) return res.status(400).json({ message: 'Username or Password incorrect' });

        const token = jwt.sign({ id: admin._id }, process.env.JWT)

        const { password, ...otherDetails } = admin._doc;
        res.cookie("access_token", token, {
                httpOnly: true,
            })
            .status(200)
            .json({ details: { ...otherDetails }});
    }
    catch (err) {
        next(err)
    }
}