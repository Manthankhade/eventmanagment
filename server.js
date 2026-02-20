const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const User = require("./models/User");
const path = require("path");

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: false
}));

// MongoDB Connection
mongoose.connect("mongodb+srv://manthankhade2710_db_user:Manthan2710@cluster0.ngbeq3u.mongodb.net/loginDB?retryWrites=true&w=majority")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));



// Routes

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/login.html");
});

app.get("/signup", (req, res) => {
    res.sendFile(__dirname + "/views/signup.html");
});

app.get("/dashboard", (req, res) => {
    if (!req.session.user) {
        return res.redirect("/");
    }
    res.sendFile(__dirname + "/views/dashboard.html");
});

// dasboard route added here 
app.get("/dashboard.html", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "dashboard.html"));
});
app.get("/about.html", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "about.html"));
});
app.get("/contact.html", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "contact.html"));
});
app.get("/services.html", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "services.html"));
});


// Signup
app.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        username,
        email,
        password: hashedPassword
    });

    await user.save();
    res.redirect("/");
});

// Login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.send("User not found");

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.send("Incorrect Password");

    req.session.user = user;
    res.redirect("/dashboard");
});

// Logout
app.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
