import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"


const app = express()

// middlewares for incoming data
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// import Routers
import authRouter from "./routes/auth.route.js"
import categoryRouter from "./routes/category.route.js"


app.use("/auth", authRouter)
app.use("/category", categoryRouter)

export default app