const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const {errorHandler, notFound} = require("./middleWare/errorMiddleware");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(
//   cors({
//     origin: ["https://invetory-frontend.vercel.app","http://localhost:3000", "https://genuine-panda-f8ff78.netlify.app"],
//     credentials: true,
//   })
// );

app.use(cors());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes Middleware


// Routes
app.get("/", (req, res) => {
  res.send("Home Page");
});

// Error Middleware

app.use(notFound);
app.use(errorHandler);


// Connect to DB and start server
const PORT = process.env.PORT || 4000;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));