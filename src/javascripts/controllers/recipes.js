import { Recipe } from '../models/recipe'
import { getCurrentUser } from '../config/routes'
import { User } from '../models/user'

// GET /api/recipes
export const allRecipesAPI = (req, res, next) => {
	Recipe.find().select('-created_by').exec((err, recipes) => {
		if(err){
			res.json({success: false, message: "Query failed"})
			res.end()
		}else{
			res.write(JSON.stringify(recipes))
			res.end()
		}
	})
}

// GET /api/recipes/:id
export const oneRecipeAPI = (req, res, next) => {
	Recipe.findOne({_id: req.params.id}).select('-created_by').exec((err, recipe) => {
		if(err){
			res.json({success: false, message: "Query failed"})
			res.end()
		}else{
			res.write(JSON.stringify(recipe))
			res.end()
		}
	})
}

/// POST /api/recipes
export const createRecipeAPI = (req, res, next) => {
	let recipe = new Recipe(req.body)
	recipe.added_at = new Date()
	recipe.updated_at = new Date()
	recipe.added_by = new User(getCurrentUser(req))
	recipe.save(err => {
		if(err){
			res.json({success: false, message: "Recipe creation failed"})
			res.end()
		}else{
			res.end()
		}
	})
}

// PUT /api/recipes/:id
export const updateRecipeAPI = (req, res, next) => {
	Recipe.findOne({_id: req.params.id}).select('-created_by').exec((err, recipe) => {
		if(err){
			res.json({success: false, message: "Unable to update"})
			res.end()
		}else{
			Object.assign(recipe, req.body)
			recipe.updated_at = new Date()
			recipe.save(err => {
				if(err){
					res.json({success: false, message: "Unable to update recipe"})
					res.end()
				}else{
					res.end()
				}
			})
		}
	})
}

// DELETE /api/recipes/:id
export const deleteRecipeAPI = (req, res, next) => {
	Recipe.findOne({_id: req.params.id}).select('-created_by').exec((err, recipe) => {
		if(err){
			res.json({success: false, message: "Unable to delete"})
			res.end()
		}else{
			Recipe.findByIdAndDelete(req.params.id, err => {
				if(err){
					res.json({success: false, message: "Unable to delete recipe"})
					res.end()
				}else{
					res.end()
				}
			})
		}
	})
}