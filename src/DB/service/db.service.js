


export const create = async({model, data, options = {}}) => {
    return await model.create([data], options)
}

export const findOne = async({model, filter, projection, options = {}}) => {
    return await model.findOne(filter, projection, options)
}

export const find = async({model, filter, options = {}}) => {
     const data = model.find(filter)
     if(options.limit) data.limit(limit)
     if(options.skip) data.skip(skip)
     if(options.sort) data.sort(sort)
     if(options.select) data.select(select)
     if(options.populate) data.populate(populate)
   
    return  data.exec()
}

export const findById = async({model, id, options = {}}) => {
    return await model.findById(id, options)
}

export const findByIdAndUpdate = async({model, id, update, options = {}}) => {
    return await model.findByIdAndUpdate(id, update, {new: true,runValidators: true, ...options})
}

export const findOneAndUpdate = async ({ model, filter, update, options = {} }) => {
    return await model.findOneAndUpdate(filter, update, { new: true, runValidators: true, ...options })
}

export const findOneAndDelete = async ({ model, filter}= {}) => {
    return await model.findOneAndDelete(filter)
}