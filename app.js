var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var port = process.env.PORT || 2440

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

var data = []
var user = []
var logined = false


app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index', {
        data: data
    });
})


app.get('/register', (req, res) => {
    if (logined !== true) {
        res.render('register')
    } else {
        res.send(`<h1>You are registered</h1> <a href="/">Back</a>`)
    }

})



app.post('/register', (req, res) => {
    user.push({
        user: req.body.user,
        pass: req.body.pass
    })
    res.redirect('/login')
})




app.get('/login', (req, res) => {
    if (logined == false){
    res.render('login')
    }
    else{
        res.send(`<h1>You are logined</h1> <a href="/">Back</a>`)
    }
})

app.post('/login', (req, res) => {
    var usern = req.body.user
    var passn = req.body.pass

    if(user.length !== 0){
    for (i = 0; i < user.length; i++) {
        
        if (user[i].user == usern && user[i].pass == passn) {
            
            logined = true
            res.render('logined')
            break
        } else {
            logined = false
            console.log('Out')
            res.redirect('/login')
            
        }
        console.log(user)
        break
    }
    }
    else{
        res.redirect('/register')
    }

})

app.get('/add', (req, res) => {
    if (logined == true) {
        res.render('add')
    } else {
        res.redirect('/login')
    }
})

app.get('/logout', (req,res) =>{
    if(logined == true){
        logined = false;
        res.redirect('/')
    }
    else{
        res.send(`<h1>You are logouted</h1> <a href="/">Back</a>`)
    }
})


app.post('/add', (req, res) => {
    data.push({
        title: req.body.title,
        content: req.body.content
    })
    res.redirect('/')
})


app.listen(port)