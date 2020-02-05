const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");
const routes = require("./routes/index.js");
const app = express();
const PORT = process.env.PORT || 3001;

const path = require("path");

// Define middleware here

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const corsOpts = {
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
};

app.use(cors(corsOpts));
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Connect to MongoDB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/recipesdb",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useUnifiedTopology: true
  },
  () => console.log("DB connected")
);

// Define API routes here
app.use("/api", routes);
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
