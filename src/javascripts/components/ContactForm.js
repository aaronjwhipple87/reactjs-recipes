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
	name: yup.string().required(),
	email: yup.string().email().required(),
	message: yup.string().required(),
})
export default function ContactForm(){
	
	let {handleSubmit, handleChange, values, errors, setFieldValue} = useFormik({
		initialValues: {
			name: "",
			email: "",
			message: ""
		},
		validationSchema,
		onSubmit(values){
			fetch('/api/contact', {
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
		<form onSubmit={handleSubmit} className="mx-auto my-5">
			<h2 className="text-center">Contact Us</h2>
			<div className="form-group">
				{/* <label htmlFor="name">Name</label> */}
				<input type="text" className="form-control" name="name" id="name" value={values.name} onChange={handleChange} placeholder="Name"/>
				<VHelp message={errors.name} />
			</div>

			<div className="form-group">
				{/* <label htmlFor="email">Email</label> */}
				<input type="text" className="form-control" name="email" id="email" value={values.email} onChange={handleChange} placeholder="Email"/>
				<VHelp message={errors.email}/>
			</div>

			<div className="form-group">
				{/* <label htmlFor="message">Message</label> */}
				<textarea name="message" className="form-control" id="message" value={values.message} onChange={handleChange} placeholder="Message"></textarea>
				<VHelp message={errors.message}/>

			</div>

			<div className="d-flex justify-content-center">	
				<button className="primary" type="submit">Submit</button>
				<button className="danger" onClick= {()=> {document.location = "/recipes"}}>Cancel</button>
			</div>
		</form>
	)
}