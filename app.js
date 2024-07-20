const cookieParser = require("cookie-parser")
const express = require("express")
const app = express()
const path = require("path") 
const db = require("./config/mongoose-connection") //by just importing (mongoose-connection) the backend will be connected to the mongodb
const usersRouter = require("./routes/usersRouter")
const ownersRouter = require("./routes/ownersRouter")
const indexRouter = require("./routes/indexRouter")
const productRouter = require("./routes/productsRouter")
const session = require("express-session")
const flash = require("connect-flash")
require("dotenv").config()  // so that we can use all the .env file data


const port = 3000

app.set("view engine","ejs")
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public"))); // for static files
app.use(
    session({
        secret:process.env.SESSION_SECRET || "random",
        rersave:false,
        saveUninitialized:true,
        cookie:{maxAge:6000}
    })
)

app.use(flash())

app.use("/",indexRouter)
app.use("/owners",ownersRouter) //  means /owners route will show the content of ownersRouter
app.use("/users",usersRouter) // means /users route will show the content of usersRouter
app.use("/products",productRouter)

app.listen(port,() => {
    console.log("server is online on port number", port)
})