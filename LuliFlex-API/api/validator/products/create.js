import Joi from 'joi'

const createProductSchema = Joi.object({
    title:Joi.string().min(1).max(250),
    description: Joi.string().min(5).max(500),
    author: Joi.string().min(1).max(250),
    sasia: Joi.number(),
    ngjyra: Joi.alternatives().try(Joi.string(), Joi.array()),
    rating: Joi.number(),
    imageField: Joi.binary().encoding('base64')
})

export default createProductSchema;
