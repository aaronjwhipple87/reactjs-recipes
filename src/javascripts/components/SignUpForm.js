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
	firstName: yup.string().required(),
	lastName: yup.string().required(),
	email: yup.string().email().required(),
	username: yup.string().required(),
	password: yup.string().required(),
})

export default function SignUpForm(){
	
	let {handleSubmit, handleChange, values, errors, setFieldValue} = useFormik({
		initialValues: {
			firstName: "",
			lastName: "",
			email: "",
			username: "",
			password: ""
		},
		validationSchema,
		onSubmit(values){
			fetch('/api/users/register', {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				credentials: 'same-origin',
				body: JSON.stringify(values)
			}).then((response) => {
				if(!response.ok) throw Error('Failed to sign up')
				return response.text()
			}).then(() => {
				toast('Successfully signed up', {
					onClose: () => {
						document.location = "/recipes"
					}
				})
			}).catch((error) => {
				toast('Failed to sign up', {
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
			<h2 className="text-center">Sign Up</h2>
			<div className="form-group">
				<input type="text" className="form-control" name="firstName" id="firstName" value={values.firstName} onChange={handleChange} placeholder="First Name"/>
				<VHelp message={errors.firstName}/>
			</div>

			<div className="form-group">
				<input type="text" className="form-control" name="lastName" id="lastName" value={values.lastName} onChange={handleChange} placeholder="Last Name"/>
				<VHelp message={errors.lastName}/>
			</div>

			<div className="form-group">
				<input type="text" className="form-control" name="email" id="email" value={values.email} onChange={handleChange} placeholder="Email"/>
				<VHelp message={errors.email}/>
			</div>

			<div className="form-group">
				<input type="text" className="form-control" name="username" id="username" value={values.username} onChange={handleChange} placeholder="Username"/>
				<VHelp message={errors.username}/>
			</div>

			<div className="form-group">
				<input type="password" className="form-control" name="password" id="password" value={values.password} onChange={handleChange} placeholder="Password"/>
				<VHelp message={errors.password}/>
			</div>

			<div className="d-flex justify-content-center">	
				<button className="primary" type="submit">Submit</button>
				<button className="danger" onClick= {()=> {document.location = "/recipes"}}>Cancel</button>
			</div>
		</form>
	)
}