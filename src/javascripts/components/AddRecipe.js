import React, { useContext, useState } from 'react'
import { RecipeContext } from './RecipeList'
import { useHistory, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import * as yup from 'yup'
toast.configure()

export function VHelp({message}){
	return <p className="help text-danger">{message}</p>
}

const validationSchema = yup.object({
	title: yup.string().required(),
	poster: yup.string().url().required(),
	description: yup.string().required(),
	id:  yup.number().required(),
	ingredients: yup.string().required(),
	directions: yup.string().required(),
	added_at: yup.date().required(),
	updated_at: yup.date().required(),
})
export default function AddRecipe(){
	let {recipes, setRecipes, authenticated, setAuthenticated} = useContext(RecipeContext)
	let {cid} = useParams()

	if(!authenticated){
		document.location = '/signin'
		return <></>
	}

	let recipe = cid ? recipes.find(c => c.id == cid) : {}
	let is_new = cid === undefined
	let {handleSubmit, handleChange, values, errors, setFieldValue} = useFormik({
		initialValues: is_new ? {
			title: "",
			description: "",
			ingredients: "",
			directions: "",
			poster: "",
			added_at: new Date(),
			updated_at: new Date(),
			

		} : {...recipe},
		validationSchema,
		onSubmit(values){
			fetch('/api/recipes', {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				credentials: 'same-origin',
				body: JSON.stringify(values)
			}).then(() => {
				toast('Successfully Submitted', {
					onClose: () => {
						document.location = "/recipes"
					}
				})
			}).catch((error) => {
				toast('Failed to submit', {
					onClose: () => {
						document.location = "/recipes"
					}
				})
			})

		}
	})
	
	const history = useHistory()
	return(

		<form onSubmit={handleSubmit}>
			<h2 className="text-center">Adding a Recipe</h2>
			<div className="form-group">
				<input type="text" className="form-control" name="title" value={values.title} onChange={handleChange}  placeholder="Title"/>
				<VHelp message={errors.title}/>
			</div>

			<div className="form-group">
				<input type="number" className="form-control" name="id" value={values.id} onChange={handleChange} placeholder="ID"/>
				<VHelp message={errors.id}/>
			</div>

			<div className="form-group">
				<textarea name="description" className="form-control" value={values.description} onChange={handleChange} placeholder="Description"></textarea>
				<VHelp message={errors.description}/>
			</div>

			<div className="form-group">
				<input type="url" name="poster" className="form-control" value={values.poster} onChange={handleChange} placeholder="Poster"/>
				<VHelp message={errors.poster}/>
			</div>

			<div className="form-group">
				<textarea name="ingredients" className="form-control" value={values.ingredients} onChange={handleChange} placeholder="Ingredients"></textarea>
				<VHelp message={errors.ingredients}/>
			</div>

			<div className="form-group">
				<textarea name="directions" className="form-control" value={values.directions} onChange={handleChange} placeholder="Directions"></textarea>
				<VHelp message={errors.directions}/>
			</div>

			<div className="d-flex justify-content-center">	
				<button className="primary" type="submit">Submit</button>
				<button className="danger" onClick= {()=> {document.location = "/recipes"}}>Cancel</button>
			</div>
		</form>
	)
}