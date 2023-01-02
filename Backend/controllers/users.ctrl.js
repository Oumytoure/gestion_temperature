const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const userSchema = require('../models/User')
const authorize = require('../authentification/auth')
mongoose= require('mongoose')

//  Ajouter un utilisateur
exports.createUser =  (req, res, next) => {
    console.log(req.body)
   /*  const salt = gentSaltSync(10); */
      bcrypt.hash(req.body.password, 10).then((hash) => {
        const user = new userSchema({
          prenom: req.body.prenom,
          nom: req.body.nom,
          email: req.body.email,
          role: req.body.role,
          password: hash,
          etat: req.body.etat,
          matricule: req.body.matricule,
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
          console.log(user.password)})
  }

  //  Connexion
  exports.login = (req, res, next) => {
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
            expiresIn: '1h',
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
  }

  // Recuperer tous les utilisateurs
  exports.getUsers = (req, res, next) => {
    userSchema.find((error, response)=> {
      if (error) {
        return next(error)
      } else {
        return res.status(200).json(response)
      }
    })
  }

  // Recuperer un utilisateur
  exports.getUser = (req, res, next) => {
    userSchema.findById(req.params.id, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
      }
    });
  }

  // Recuperez et autoriser la connexion d'un utilisateur
  exports.userLogin = authorize, (req, res, next) => {
    userSchema.findById(req.params.id, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.status(200).json({
          msg: data,
        })
      }
    })
  }

  //Update user
  exports.updateUser = (req, res, next) => {
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
  }