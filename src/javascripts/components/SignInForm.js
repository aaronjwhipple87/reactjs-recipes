import React from 'react'
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
	username: yup.string().required(),
	password: yup.string().required(),
})

export default function SignInForm(){
	
	let {handleSubmit, handleChange, values, errors, setFieldValue} = useFormik({
		initialValues: {
			username: "",
			password: ""
		},
		validationSchema,
		onSubmit(values){
			fetch('/api/users/signin', {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				credentials: 'same-origin',
				body: JSON.stringify(values)
			}).then((response) => {
				if(!response.ok) throw Error('Failed to sign in')
				return response.text()
			}).then(() => {
				toast('Successfully signed in', {
					onClose: () => {
						document.location = "/recipes"
					}
				})
			}).catch((error) => {
				toast('Failed to sign in', {
					onClose: () => {
						document.location = "/recipes"
					}
				})
			})
		}
	})
	
	const history = useHistory()
	return(
		<form onSubmit={handleSubmit} className="mx-auto my-5">
			<h2 className="text-center">Login</h2>
			
			<div className="form-group">
				{/* <label htmlFor="username">Username</label> */}
				<input type="text" className="form-control" name="username" id="username" value={values.username} onChange={handleChange} placeholder="Username"/>
				<VHelp message={errors.username}/>
			
			</div>

			<div className="form-group">
				{/* <label htmlFor="password">Password</label> */}
				<input type="password" className="form-control" name="password" id="password" value={values.password} onChange={handleChange} placeholder="Password"/>
				<VHelp message={errors.password}/>
		
			</div>


			<div className="d-flex justify-content-center">	
				<button className="login" type="submit">Login</button>
				{/* <button className="danger" onClick= {()=> {document.location = "/recipes"}}>Cancel</button> */}
			</div>
		</form>
	)
}