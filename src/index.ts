import express, { Request, Response } from "express";
import CONFIG from "./config/config";
import session from "express-session";
import passport from "passport";
import { googleAuthRouter } from "./routes/googleAuthRouter";
import { jwtAuth } from "./middleware/jwtAuth";
import { authRouter } from "./routes/authRouter";
import connectDB from "./config/db";
import { useGoogleStrategy } from "./config/passport.config";

// Create a new express application instance
const app = express();

// Set the network port
const port = CONFIG.PORT;
// Define the root path with a greeting message

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

app.use(passport.initialize());
app.use(passport.session());

// routers
app.use("/google/", googleAuthRouter);
app.use("/auth", authRouter);

app.get("/", jwtAuth, (req: Request, res: Response) => {
  res.json({ message: "Welcome to the Express + TypeScript Server!" });
});

// Start the Express server
app.listen(port, () => {
  console.log(`The server is running at ${CONFIG.BASE_URL}`);
});
