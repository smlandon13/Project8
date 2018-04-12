const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

let user;
let userArr = [];
let userCount = 0;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('views',  path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', (req,res) => {
    res.render('index', {id: userCount});
});

app.post('/users', (req, res) => {
    user = {
        userId: req.body.userId,
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        id: userCount
    };
    console.log(userCount);
    userCount++;
    userArr.push(user);
    res.render('./users', {users:userArr});
});

app.get('/edit/:id', (req, res) => {
    let userInfo;
    for(let i = 0; i < userArr.length; i++){
        if(+req.params.id === userArr[i].id){
            userInfo = userArr[i];
            res.render('./edit', {user: userInfo});
        }
    }
});

app.post('/edit', (req, res) => {
    let userEdit = {
        userId: req.body.userId,
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        id: req.body.id
    };
    for(let i = 0; i < userArr.length; i++){
        if(+req.body.id === userArr[i].id){
            userArr[i] = userEdit;
        }
    }
    res.render('users', {users:userArr});
});

app.get('/delete/:id', (req, res) => {

    for(let i = 0; i < userArr.length; i++){
        if(+req.params.id === userArr[i].id){
            userArr.splice(i, 1);
        }
    }
    res.render('users', {users:userArr});
});
// delete button is the same loop and then splice arr@i, 1 then render index
// take to a new page saying user deleted and then a button to return to the user list



app.listen(3000, () => {
    console.log('listening on port 3000')
});

//look up pug mix-ins;