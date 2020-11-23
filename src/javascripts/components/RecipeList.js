import React, {useState, createContext, useEffect} from 'react'
import Recipe from './Recipe'
import { Switch, Route, Link, Redirect, useHistory } from 'react-router-dom'
import { ErrorNotFound } from './Pages'
import EditRecipe from './EditRecipe'
import AddRecipe from './AddRecipe'
import RecipeDetails from './RecipeDetails'
import { useCookies } from 'react-cookie'

export const RecipeContext = createContext()
export default function RecipesList (){
	const [recipes, setRecipes] = useState() 
	const [cookies, setCookie, removeCookie] = useCookies(['token'])
	let [authenticated, setAuthenticated] = useState(cookies.token !== undefined)
	const history = useHistory()

	useEffect(() => {
		if(!recipes){
			fetch('/api/recipes', {
				credentials: 'same-origin'
			})
				.then(response => response.text())
				.then((data) => {
					setRecipes(JSON.parse(data, (key, value) => {
						const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:.*Z$/
						if(typeof value === 'string' && dateFormat.test(value)){
							return new Date(value)
						}
						return value
					}))
				})
				.catch(console.error)
		}
	},8000)

	if(!recipes){
		return <p>Loading...</p>
	}
	return (
	<RecipeContext.Provider value={{recipes, setRecipes, authenticated, setAuthenticated}}>
		<main className="mt-5">
			<Switch>
				<Route exact path="/recipes">
					{recipes.map(c => {
						return <Recipe key={c.id} recipe={c} />
					})}
				</Route>
				<Route path="/recipes/new">
					<AddRecipe/>
				</Route>
				<Route path="/recipes/:cid/edit">
					<EditRecipe/>
				</Route>
				<Route path="/recipes/:cid/details">
					<RecipeDetails/>
				</Route>
				<Redirect from="" to="/recipes"/>
				<Route path="*">
					<ErrorNotFound></ErrorNotFound>
				</Route>
			</Switch>
		</main>

	</RecipeContext.Provider>
	)
}

