// auth.js - Handles Google and GitHub authentication
import express from 'express';
import passport from 'passport';
import { GoogleStrategy, GitHubStrategy } from 'passport-strategy';

const router = express.Router();

// Google OAuth setup
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/auth/google/callback'
}, (token, tokenSecret, profile, done) => {
  return done(null, profile);
}));

// GitHub OAuth setup
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/auth/github/callback'
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));

// Routes for Google and GitHub OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/');
});

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/');
});

export default router;
