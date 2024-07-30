// DEPENDENCIES
const cors = require("cors");
const express = require("express");
// import passport;
const passport = require("passport");
// import session
const session = require("express-session");

// const fileUpload = require("express-fileupload");
const usersController = require("./controllers/usersControllers.js");
const resourcesController = require("./controllers/resourcesControllers.js");
const mentorsController = require("./controllers/mentorsControllers.js");
const authController = require("./controllers/authController.js");
const owners = require("./controllers/owners");

// require("dotenv").config();

// CONFIGURATION
const app = express();

if (process.env.PG_HOST !== "production") {
	// app.set("trust proxy", 1); // trust first proxy
	// sessionConfig.cookie.secure = true; // serve secure cookies
	require("dotenv").config();
}

app.options("*", cors()); // i
// MIDDLEWARE.
app.use(
	cors({
		origin: process.env.ORIGIN,
		credentials: true,
	})
);

app.use(cors());

// Parse incoming JSON
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// session middleware
app.use(
	session({
		secret: process.env.SECRET,
		resave: false,
		saveUninitialized: true,
		cookie: {
			// httpOnly: true,
			// sameSite: "none",
			// secure: true,
			// maxAge: 1000 * 60 * 60 * 24,
		},
	})

	// app.use(session({
	// 	secret: process.env.SESSION_SECRET, // Use the secret from the environment variable
	// 	resave: false,
	// 	saveUninitialized: true,
	// 	cookie: { secure: false } // Set to true if using HTTPS
	//   }));
);

// app.use((req, res, next) => {
// 	res.set("Access-Control-Allow-Origin", `${process.env.ORIGIN}`);
// 	res.set("Access-Control-Allow-Credentials", "true");
// 	next();
// });

// initialize the passport js middleware ;
app.use(passport.initialize());
// serialize and desarilize
app.use(passport.session());
//auth controller
app.use("/auth", authController);

// /users/1/resources
app.use("/users", usersController);

//resources controller
// /resources/1/users
app.use("/resources", resourcesController);
//mentors controller
app.use("/mentors", mentorsController);
// owners controllers
app.use("/owners", owners);
//multer
// console.log("underscoredirname", __dirname + "/uploads");
app.use(express.static(__dirname + "/uploads"));

app.get("/", (req, res) => {
	res.send("Welcome To EDUK App");
});

app.get("*", (req, res) => {
	res.status(404).send("Page not found");
});

// EXPORT
module.exports = app;
