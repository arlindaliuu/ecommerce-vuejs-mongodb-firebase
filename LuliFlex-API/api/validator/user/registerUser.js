import Joi from 'joi'

const schema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().min(3).max(30).required(),
    password: Joi.string().alphanum().min(8).max(30).required(),

})
export default schema;