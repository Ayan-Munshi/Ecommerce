const cookieParser = require("cookie-parser")
const express = require("express")
const app = express()
const path = require("path")
const db = require("./config/mongoose-connection")
const usersRouter = require("./routes/usersRouter")
const ownersRouter = require("./routes/ownersRouter")
const registerRouter = require("./routes/resgisterRouter")


const port = 3000

app.set("view engine","ejs")
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public"))); // for static files

app.use("/",registerRouter)
app.use("/owners",ownersRouter) // // means /owners route functions are comming from ownersRouter
app.use("/users",usersRouter) // means /users route functions are comming from usersRouter

app.listen(port,() => {
    console.log("server is online on port number", port)
})