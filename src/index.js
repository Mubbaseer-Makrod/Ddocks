import app from "./app.js";
import dotenv from "dotenv"
import { connectDB } from "./db/index.js";

dotenv.config({
    path: "./.env"
})


connectDB()
.then(() => {
    app.on("error",(error) => {
        console.log("Database Error: ", error)
        throw error
    })

    app.listen( process.env.PORT || 8000, () => {
        console.log("Application Successfully Running : ", process.env.PORT)
    } )
})
.catch((error) => {
    throw error
})

const isAllowed = (req, res, next) => {
    console.log("Hi From middleware")
    next()
}

const Hithere = (req, res) => {
    res.send("2nd Time hii")
}

app.get("/", isAllowed, Hithere)

