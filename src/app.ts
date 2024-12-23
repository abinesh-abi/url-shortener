import express, { NextFunction, Request, Response } from "express";
import CONFIG from "./config/config";
import session from "express-session";
import passport from "passport";
import { googleAuthRouter } from "./routes/googleAuthRouter";
import { jwtAuth } from "./middleware/jwtAuth";
import { authRouter } from "./routes/authRouter";
import connectDB from "./config/db";
import { useGoogleStrategy } from "./config/passport.config";
import { apiRouter } from "./routes/apiRouter";
import morgan from 'morgan'

// Create a new express application instance
const app = express();


app.use(
  session({
    secret: process.env.SESSION_SECRET || "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

// Connect to the database
connectDB();

// authentication strategy
useGoogleStrategy();

app.use(express.json()) //body parser
app.use(passport.initialize()); 
app.use(passport.session());
app.use(morgan('dev'))

// routers
app.use("/google/", googleAuthRouter);
app.use("/auth", authRouter);
app.use("/api",jwtAuth, apiRouter);

export default app;