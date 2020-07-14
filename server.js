const express = require('express');
const bodyParser = require('body-parser');
const expressSanitizer = require('express-sanitizer');
const fileUpload = require('express-fileupload');
const passport = require('passport');
const helmet = require('helmet');
const path = require('path');
require('dotenv').config()

const users = require('./routes/api/users');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(expressSanitizer());
app.use(fileUpload({
    safeFileNames: true,
    preserveExtension: true
}));
if(process.env.NODE_ENV === 'production') app.use(helmet());

const db = require('./config/db');
if(db.connection){
    app.use(passport.initialize());
    require('./config/passport')(passport);

    app.use('/api/users', users);

    // Heroku fix to serve the build react app
    if(process.env.NODE_ENV === 'production'){
        app.use(express.static('client/build'));
        app.get("*", (req, res) => {
            res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
        });
    }

    app.listen(port, () => {
        console.log(`Server is listening at http://localhost:${port}`);
    });
}