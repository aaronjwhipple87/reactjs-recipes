import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { RecipeContext } from './RecipeList'
import 'react-toastify/dist/ReactToastify.css'


export default function Recipe(props){
	let { recipes, setRecipes} = useContext(RecipeContext)
	const c = props.recipe
	const history = useHistory()
	
	return(
		<>
		<div className="card justify-content-center">
			<img src={c.poster} alt={c.title}/>
			<h2 className="py-2">{c.title}</h2>
			<p>{c.description}</p>
			<button className="primary" onClick={
				()=> history.push(`/recipes/${c.id}/details`)
			}>See more</button>
		</div>

		</>
	)
  }