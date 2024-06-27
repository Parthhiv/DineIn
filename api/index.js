import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors"

import restRoute from "./routes/rests.js"
import reservRoute from "./routes/reservations.js"

import {loginuser , registeruser} from './controllers/user.js'
import {loginadmin , registeradmin} from './controllers/admin.js'

const app = express();
dotenv.config();

const PORT = process.env.PORT || 7700;

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongoDB.");
    } catch (error) {
        throw error;
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!");
});

app.use('/abc/a', (req, res) => { res.send('Hello from Express!') });

//middlewares
app.use(cookieParser())
app.use(express.json());
app.use(helmet());

app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))

app.use(morgan("common"));

app.use("/admin/login", loginadmin);
app.use("/admin/register", registeradmin);

app.use("/users/login", loginuser); 
app.use("/users/register", registeruser);

app.use("/restaurants", restRoute);
app.use("/reservations", reservRoute);

app.listen(PORT, () => {
    console.log("Listening on port "+PORT);
    connect();
});