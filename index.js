const port = 3000;
const express = require('express');
const app = express();
const morgan = require('morgan');

const gameRouter = require('./game.routes.js')
const loginRouter = require('./login.routes.js')
const registerRouter = require('./register.routes.js')

const db = require('./models')
let superAdminAccess = require('./superAdminAccess.json')

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({
    extended:false
}))

app.use(express.static(__dirname + '/public'));
app.set('view engine','ejs')
app.use('/game', gameRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);

app.get('/', (req, res) => {
    res.status(200).render('./index.ejs');
  })

app.get('/superadminlogin', (req,res) => {
    res.render('dashboard/superAdminLogin')

})

app.post('/superadmindashboard',(req,res) => {
    //PARSE BODY 
    const{username,password} = req.body;
    const superAdmin = superAdminAccess.find(i => i.id == 1)
    if (username == superAdmin.username){
        if(password == superAdmin.password){
            res.status(300).redirect('/superadmindashboard')
        }
        else{
            res.status(200).redirect('/superadminlogin')
        }
    }
    else{
        res.status(200).redirect('/superadminlogin')
    }

})

app.get('/superadmindashboard', (req,res) => {
    db.UserGameBiodata.findAll().then(users => (
        res.render('dashboard/superAdminDashboard',{
            users
        })
    ))
    
})

app.get('/createUser',(req,res) => {
    res.render('dashboard/createUser')
})

app.get('/deleteUser',(req,res) => {
    db.UserGameBiodata.findAll().then(users => (
        res.render('dashboard/deleteUser',{
            users
        })
    ))
})

app.post('/deleteUser', (req,res) => {
    db.UserGame.destroy({
        where : {
            user_id:req.body.userid
        }
    }).then(
        db.UserGameBiodata.destroy(
            {
                where: {
                    userId:req.body.userid
                }
            }
        )
        
        .then(result => {
            res.status(201).redirect('/superadmindashboard')
          })

        .catch(err => {
            res.status(422).json("Can't delete user")
        })        
    )

    .catch(err => {
        res.status(422).json("Can't delete user")
    })    
})


app.get('/alterUser',(req,res) => {
    db.UserGameBiodata.findAll().then(users => (
        res.render('dashboard/alterUser',{
            users
        })
    ))
})

app.post('/alteruser', (req,res) => {
    db.UserGame.destroy({
        where : {
            user_id:req.body.userid
        }
    }).then(
        db.UserGameBiodata.destroy({
            where:{
                userId:req.body.userid
            }
        }).then(
            db.UserGame.create({
                user_id : req.body.userid,
                username : req.body.username,
                password :  req.body.password
            }).then(
                db.UserGameBiodata.create(
                    {
                        userId : req.body.userid,
                        name:req.body.name,
                        email:req.body.email
                    }
                ).then(result => {
                    res.status(201).redirect('/superadmindashboard')
                  }
                )
            )
        )
    )
})

app.post('/createUser',(req,res) => {
   db.UserGame.create(
       {
        user_id : req.body.userid,
        username : req.body.username,
        password :  req.body.password
       }
   )

   .then(
       db.UserGameBiodata.create(
           {
            userId : req.body.userid,
            name:req.body.name,
            email:req.body.email
           }
       )
       .then(result => {
         res.status(201).redirect('/superadmindashboard')
       })

       .catch(err => {
        res.status(422).json("Can't create user")
    })
    ) 

    .catch(err => {
        res.status(422).json("Can't create user")
    })
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })