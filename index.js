const express = require('express')
const path = require('path')
const multer = require('multer')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('express-flash')
require("dotenv").config();

const database = require("./config/database")
database.connect()

const routeClient = require("./routes/client/index.route")
const routeAdmin = require("./routes/admin/index.route")

const app = express()
const port = process.env.PORT

//flash
app.use(cookieParser('so1phuly'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
//end flash

app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: false }))
app.set('views', `${__dirname}/views`)
app.set('view engine', 'pug')

// Tiny MCE
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
// End Tiny MCE

//App Locals Variables
const sytemconfig = require("./config/system")
app.locals.prefixAdmin = sytemconfig.prefixAdmin

app.use(express.static(`${__dirname}/public`))

routeClient(app)
routeAdmin(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
