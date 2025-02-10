const express = require('express')
require("dotenv").config();

const database = require("./config/database")
database.connect()

const routeClient = require("./routes/client/index.route")
const routeAdmin = require("./routes/admin/index.route")

const app = express()
const port = process.env.PORT

app.set('views', './views')
app.set('view engine', 'pug')

//App Locals Variables
const sytemconfig = require("./config/system")
app.locals.prefixAdmin = sytemconfig.prefixAdmin

app.use(express.static("public"))

routeClient(app)
routeAdmin(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
