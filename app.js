require("dotenv").config;
const express = require("express");
const connectDB = require("./src/config/db")
const recipeRoutes = require("./src/routes/recipeRoutes")

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.use("/recipes", recipeRoutes)

async function startServer() {
    await connectDB()
    app.listen(PORT, () => {
        console.log(
            `server runing on PORT ${PORT}`
        );
    })
}
startServer();
module.exports = app;
