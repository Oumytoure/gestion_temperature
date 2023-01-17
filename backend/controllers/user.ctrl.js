const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = express.Router()
const userSchema = require('../models/User')
const authorize = require('../authentification/auth')
mongoose = require('mongoose')

// Inscription
router.post('/add-user', (req, res, next) => {
    console.log(req.body)

      bcrypt.hash(req.body.password, 10).then((hash) => {
        const user = new userSchema({
          prenom: req.body.prenom,
          nom: req.body.nom,
          email: req.body.email,
          role: req.body.role,
          password: hash,
          etat: req.body.etat,
          matricule: req.body.matricule
        })
        user.save()
          .then((response) => {
            console.log(response);
            res.status(201).json({
              message: 'Inscription réussie !',
              result: response,
            })
          })
          .catch((error) => {
            res.status(409).json({
              error: error.message.split("email:")[1],
            })
          })
      })
  },
)
//modif mdp
router.patch('/update1/:id', async(req, res) => {
  try {
        let { actuelPass, newPass } = req.body;
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };
        let user= userSchema.findById({"_id": req.params.id});
        if(!user){
          return res.status(404);
        };
        if (updatedData.actuelPass){
          user.then(async(e)=> {

                if(await bcrypt.compare(actuelPass, e.password)){
                    const hash = await bcrypt.hash(newPass, 10);
                      updatedData.password = hash;
                      const result = await userSchema.findByIdAndUpdate(
                      id, updatedData, options
                      );
                    return res.send(result);
                }
                return res.send('no corres');
          });

      }else{
        const result = await userSchema.findByIdAndUpdate(
              id, updatedData, options
          )
          return res.send(result)
      }
  }
  catch (error) {
      res.status(400).json({ message: error.message })
  }
})
 

// Connexion
router.post('/login', (req, res, next) => {
  let getUser
  userSchema
    .findOne({
      email: req.body.email,
    })
    // Verifier si l'utilisateur existe
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: 'Compte non existant !',
        })
      }
      getUser = user
      return bcrypt.compare(req.body.password, user.password)
    })
    .then((response) => {
      if (!response) {
        return res.status(401).json({
          message: 'Le mot de passe est incorrect !',
        })
      }else if(getUser.etat == false){
        return res.status(401).json({
          message: 'Le compte est désactivé !' ,
        })
      }
      let jwtToken = jwt.sign(
        {
          email: getUser.email,
          userId: getUser._id,
        },
        'longer-secret-is-better',
        {
          expiresIn: '6h',
        },
      )
      res.status(200).json({
        token: jwtToken,
        expiresIn: 3600,
        _id: getUser._id,
      })
    })
    .catch((err) => {
      return res.status(401).json({
        message: 'Authentication failed',
      })
    })
})

// Recuperez tous les utilisateurs
router.route('/').get((req, res, next) => {
  userSchema.find((error, response)=> {
    if (error) {
      return next(error)
    } else {
      return res.status(200).json(response)
    }
  })
})

// Recuperez un utilisateur
router.route('/read-user/:id').get((req, res) => {
  userSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Recuperez et autoriser la connexion d'un utilisateur
router.route('/user-profile/:id').get(authorize, (req, res, next) => {
  userSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.status(200).json({
        msg: data,
      })
    }
  })
})

// Update User
router.route('/update-user/:id').put((req, res, next) => {
  userSchema.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
        console.log('Modification réussie !')
      }
    },
  )
})


module.exports = router