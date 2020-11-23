import React, { useContext, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Modal from 'react-modal'
import { useFormik } from 'formik'
import { RecipeContext } from './RecipeList'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {format} from 'date-fns'
toast.configure()

const customStyles = {
	content : {
	  top                   : '50%',
	  left                  : '50%',
	  right                 : 'auto',
	  bottom                : 'auto',
	  marginRight           : '-50%',
	  transform             : 'translate(-50%, -50%)'
	}
};

export default function RecipeDetails(){
	let { recipes, setRecipes, authenticated, setAuthenticated } = useContext(RecipeContext)
	let {cid} = useParams()
	let[modalOpen, setModalOpen] = useState(false)
	let recipe = cid ? recipes.find(c => c.id == cid) : {}
	let is_new = cid === undefined
	const history = useHistory()
	const deleteRecipe = () => {
		fetch(`/api/recipes/${cid}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			},
			credentials: 'same-origin',
		}).then(() => {
			toast('Successfully Deleted', {
				onClose: () => {
					document.location = "/recipes"
				}
			})

			setModalOpen(false)
		}).catch((error) => {
			toast('Failed to delete', {
				onClose: () => {
					document.location = "/recipes"
				}
			})
		})

	}
	let {values} = useFormik({
		initialValues: is_new ? {
			title: "Recipe Title",
			description: "Recipe Description",
			ingredients: "Some ingredients",
			directions: "Some directions",
			poster: "http://example.com",
			added_at: new Date(),
			updated_at: new Date(),

		} : {...recipe}
	})

	return(
		<>
		<div className="recipeDetails">
			<div className="row">
				<div className="col-12">
					<img src={values.poster} alt={values.title}/>
				</div>
			
				<div className="col-12 py-3">
					<h2>{values.title}</h2>
				</div>
			</div>
			<ul className="recipeInfo">
				<li><span className="font-weight-bold">Ingredients:</span><br/>{values.ingredients}</li>
				<li className="pt-3"><span className="font-weight-bold">Directions:</span> <br/>{values.directions}</li>
				<li className="pt-4">Added:	{format(values.added_at,'MM/dd/yyyy hh:mm a')}</li>
				<li>Updated: {format(values.updated_at,'MM/dd/yyyy hh:mm a')}</li>
				<li><button className="primary" onClick={
						()=> history.push(`/recipes/${cid}/edit`)
					}>Edit</button>
					<button className="danger" onClick={()=> {
						if(authenticated) setModalOpen(true)
						else document.location = '/signin'
					}}>Delete</button></li>
			</ul>
		</div>

		<Modal isOpen={modalOpen} onRequestClose={()=>setModalOpen(false)}
			style={customStyles} contentLabel="Are you sure?">
			<p>Are you sure you want to delete this recipe?</p>
			<button className="danger" onClick={deleteRecipe}>Confirm Delete</button>
			<button className="primary" onClick={()=> setModalOpen(false)}>Cancel</button>
		</Modal>
		</>
	)
  }