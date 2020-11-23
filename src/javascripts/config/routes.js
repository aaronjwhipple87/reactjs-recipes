import express from 'express'

import {contactPage, indexPage, aboutPage, signInPage, signUpPage} from '../controllers/index'
import {contactAPI} from '../controllers/contacts'
import {allRecipesAPI, oneRecipeAPI, createRecipeAPI, updateRecipeAPI, deleteRecipeAPI} from '../controllers/recipes'
import { registerUserAPI, signUserInAPI } from '../controllers/users'
import jwt from 'jsonwebtoken'
import { APP_SECRET } from './vars'
let router = express.Router()

function isSignedIn(req){
	try{
		jwt.verify(req.cookies.token, APP_SECRET) 
		return true
	}catch(err){
		return false
	}
}

function requireSignIn(req, res, next){
	if(isSignedIn(req)){
		next()
	}else{
		res.status(401)
		res.end()
	}
}

export function getCurrentUser(req){
	if(req.cookies.token){
	  return jwt.decode(req.cookies.token, APP_SECRET) 
	}else {
	  return null
	}
  }


export function configureRoutes(app){
	app.all('*', (req, res, next) => {
		app.locals.signedIn = isSignedIn(req)
		app.locals.currentUser = getCurrentUser(req)
		next()
	})

	router.get('/', indexPage)
	router.get('/recipes*', indexPage)
	router.get('/about', aboutPage)
	router.get('/contact', contactPage)
	router.get('/signin', signInPage)
	router.get('/signup', signUpPage)

	router.get('/register', indexPage)
	router.get('/signin', indexPage)

	// Recipes API Endpoints
	router.get('/api/recipes', allRecipesAPI )
	router.get('/api/recipes/:id', oneRecipeAPI )
	router.post('/api/recipes', requireSignIn, createRecipeAPI )
	router.put('/api/recipes/:id', requireSignIn, updateRecipeAPI )
	router.delete('/api/recipes/:id', requireSignIn, deleteRecipeAPI )

	// Users
	router.post('/api/users/register', registerUserAPI)
	router.post('/api/users/signin', signUserInAPI)
	router.post('/api/contact', contactAPI )

	app.use('/', router)
	
}