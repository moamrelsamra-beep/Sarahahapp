


export const create = async({model, data, options = {}}) => {
    return await model.create([data], options)
}

export const findOne = async({model, data, options = {}}) => {
    return await model.findOne(filter, options)
}

export const findById = async({model, data, options = {}}) => {
    return await model.findById(id, options)
}

export const findByIdAndUpdate = async({model, data, options = {}}) => {
    return await model.findByIdAndUpdate(id, update, {new: true, ...options})
}

