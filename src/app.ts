import "dotenv/config";
import express from "express";
import nunjucks from "nunjucks";
import sassMiddleware from "node-sass-middleware";
import "express-async-errors";
import adminRoutes from "./routes/adminRoutes";
import authRoutes from "./routes/authRotues";
import gameRoutes from "./routes/gameRoutes";
import homeRoutes from "./routes/homeRoutes";
import profileRoutes from "./routes/profileRoutes";
import storeRoutes from "./routes/storeRoutes";
import stubRoutes from "./routes/stubRoutes";
import passport from "passport";
import passportLocal from "passport-local";
import {authenticateMember} from "./services/auth";
import {Member} from "./models/databaseModels";
import {fetchMemberById} from "./database/members";
import cookieParser from "cookie-parser";
import session from "express-session";

const app = express();
const port = process.env.PORT || 3000;

app.use(sassMiddleware({
    src: __dirname + "/../stylesheets",
    dest: __dirname + "/../public",
    debug: false,
    outputStyle: 'compressed',
    prefix: ''
}));
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(session({ secret: process.env.SESSION_SECRET || 'secret' }));
app.use(passport.initialize());
app.use(passport.session());

nunjucks.configure("./templates/", {
    autoescape: false,
    express: app
});

passport.use(new passportLocal.Strategy(
    {
        usernameField: "email",
        passwordField: "password",
    },
    async (username, password, done) => {
    const member = await authenticateMember(username, password);
    if (member) {
        return done(null, member);
    }
    return done(null, false, { message: "email or password is incorrect" });
}));

passport.serializeUser((member: Member, done) => {
    done(null, member.id);
});

passport.deserializeUser(async (memberId: number, done) => {
    const member = await fetchMemberById(memberId);
    done(null, member);
});

app.use("/admin", adminRoutes);
app.use("/auth", authRoutes);
app.use("/game", gameRoutes);
app.use("/profile", profileRoutes);
app.use("/store", storeRoutes);
app.use("/stub", stubRoutes);
app.use("/", homeRoutes);

app.listen(port, () => console.log(`Server is running on port ${port}`));