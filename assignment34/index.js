const express = require('express')
const { body, validationResult } = require('express-validator');
const bodyparser = require('body-parser')
const app = express()
app.use(express.json())
app.use(bodyparser.urlencoded({extended:false}))
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));
app.get("/", async (req, res) => {
    res.render('login')
})
app.get("/dashboard",async(req,res)=>{
    res.render('dashboard')
})
const passvalidator = (password) =>{
    const pattern = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@]+$/;   // validating password only if atleast 1 uppercase,digit exists and 
    if(pattern.test(password)) {                            // no special character other than @ allowed
        return 1;
    } else {
        return 0;
    }
} 
app.post('/', [
    body('username', 'Enter a valid email').isEmail()   // validating email id
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array()[0].msg)
    }
    // password checked only if email is valid
    if(passvalidator(req.body.password)) {
        if(req.body.password==='SmartServTest@123') {
            res.redirect('/dashboard')
        } else {
            console.log("Password Does Not Match")
        }
    } else {
        console.log("Error, Password not valid")
    }
})

app.listen(7000, () => {
    console.log("Listening on Port 7000")
})