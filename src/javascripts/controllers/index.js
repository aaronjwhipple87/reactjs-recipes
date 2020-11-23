export const indexPage = (req, res, next) => {
	res.render('layout', {content: 'index', title: "Aaron's Recipes"})
}

export const aboutPage = (req, res, next) => {
	res.render('layout', {content: 'about', title: "Aaron's Recipes"})
}

export const contactPage = (req, res, next) => {
	res.render('layout', {content: 'contact', title: "Aaron's Recipes"})
}

export const signInPage = (req, res, next) => {
	res.render('layout', {content: 'signin', title: "Aaron's Recipes"})
}

export const signUpPage = (req, res, next) => {
	res.render('layout', {content: 'signup', title: "Aaron's Recipes"})
}