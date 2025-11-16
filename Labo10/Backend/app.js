import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import userRoutes from "./routes/user.routes.js"
import verifyToken from "./middlewares/verifyToken.js"
import { pool } from "./database.js"
import { signIn } from "./controllers/signin.controller.js"
import { JWT_SECRET } from './keys.js'

const app = express()
const PORT = 5000

app.use(cors())
app.use(bodyParser.json())

app.get("/protected", verifyToken, (req, res) => {
    res.json({
        message: "¡Has accedido a la ruta protegida!",
        user: req.user,
    })
})

app.use("/", userRoutes)

app.listen(PORT, () =>
    console.log(`🚀 Server running at http://localhost:${PORT}`)
)
