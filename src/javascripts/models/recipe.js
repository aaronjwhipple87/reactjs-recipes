import mongoose from 'mongoose'

const Schema = mongoose.Schema


let recipeSchema = new Schema({
	ingredients: String,
	directions: String,
	title: String,
	description: String,
	poster: String,
	added_at: Date,
	updated_at: Date,
	added_by: {type: Schema.Types.ObjectId, ref: "User"}
})

recipeSchema.virtual('id').get(function(){
	return this._id.toHexString()
})

recipeSchema.set('toJSON', {
	virtuals: true,
	transform: (doc, ret, options) => {
		delete ret.__v
		delete ret._id
	}
})
export let Recipe = mongoose.model("Recipe", recipeSchema)
