import express, { Router, Request, Response, NextFunction } from 'express';
import passport from 'passport'
import jwt from "jsonwebtoken";
import CONFIG from '../config/config';


export const googleAuthRouter: Router = express.Router();

googleAuthRouter.get(
  '/', 
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

googleAuthRouter.get(
  '/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }), 
  (req: Request, res: Response) => {
    const token = jwt.sign(
      { user: req.user },
      process.env.JWT_SECRET || '',
      { expiresIn: "1d" },
    );
    res.json({token:token})
    // res.cookie('jwtToken', token);
    // res.redirect(CONFIG.BASE_URL)
  }
);

googleAuthRouter.get(
  '/logout', 
  (req: Request, res: Response, next: NextFunction) => {
    req.logout(function (err) {
      if (err) return next(err);
      res.redirect('/');
    });
  }
);