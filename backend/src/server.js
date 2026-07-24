const cors = require("cors");
const express = require("express");
require("dotenv").config();

const applicationRoutes = require("./routes/applicationRoutes");
require("./database/database");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/applications", applicationRoutes);

app.get("/", (req, res) => {
    res.send("Internship Tracker Backend is running!");
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});