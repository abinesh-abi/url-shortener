import passport from "passport";
import passportGoogle from "passport-google-oauth20";
import CONFIG from "./config";
import User, { IUser } from "../models/user.model";
import userService from "../services/userService";

const GoogleStrategy = passportGoogle.Strategy;

export function useGoogleStrategy() {
  passport.use(
    new GoogleStrategy(
      {
        clientID: CONFIG.GOOGLE_CLIENT_ID || "",
        clientSecret: CONFIG.GOOGLE_CLIENT_SECRET || "",
        callbackURL: `/google/callback/`,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          if (!profile._json.email) throw "User does not have email";

          let user = await userService.getUserByEmail(profile._json.email);

          if (user) {
            done(null, user);
          } else {
            const newUser: Partial<IUser> = {
              username: profile._json.name ,
              email: profile._json.email,
            };
            user = await userService.insertUser(newUser);
            done(null, user);
          }
        } catch (err: any) {
          console.error(err);
          done(err);
        }
      }
    )
  );

  passport.serializeUser(function (user: Express.User, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user: Express.User, done) {
    done(null, user);
  });
}
