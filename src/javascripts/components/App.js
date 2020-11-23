import React from 'react'
import RecipesList from './RecipeList'
import { BrowserRouter  as Router } from  'react-router-dom'

export default function Main(){
	return (
		<Router>
			<RecipesList/>
		</Router>
	)
  }