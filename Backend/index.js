const express = require("express")
const dotenv = require("dotenv")
const readdirSync = require("fs").readdirSync
dotenv.config()
const cors = require("cors")
const connectDB = require("./Db")


const app = express()


// const Options = {
//     origin: "http://localhost:3000"
// }

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://facebook-gamma-sepia.vercel.app",
    ],
    credentials: true,
  })
);

connectDB()

app.use(express.json())
 readdirSync("routes").map((r) => {
    app.use("/", require(`./routes/${r}`))
})

const PORT = process.env.PORT||5050

app.get("/", (req, res)=>{
    res.send("Hello World")
})

app.get("/api", (req, res)=>{
    res.json({
        success: true,
        message: "API is working"
    })
})

app.listen(PORT, ()=>{
console.log(`Server running on port ${PORT}...`)
})