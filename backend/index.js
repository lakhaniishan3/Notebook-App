const connectMongo = require('./db');
const express = require('express')
var cors = require('cors')

const app = express()
const port = 7000


app.use(cors())
app.use(express.json())


// routes
app.use("/api/auth", require("./routes/auth"))
app.use("/api/notes", require("./routes/notes"))



app.listen(port, () => {
    console.log(`App run http://localhost:${port}`)
})