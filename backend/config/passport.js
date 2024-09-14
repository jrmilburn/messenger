const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
require("dotenv").config();

const prisma = new PrismaClient();

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

const jwtVerify = async (payload, done) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: payload.id
            }
        });

        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (error) {
        return done(error, false);
    }
};

const strategy = new JwtStrategy(jwtOptions, jwtVerify);
passport.use(strategy);

const generateToken = (user) => {
    const payload = {
        id: user.id,
        email: user.email
    };

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

module.exports = {
    prisma,
    passport,
    generateToken
};