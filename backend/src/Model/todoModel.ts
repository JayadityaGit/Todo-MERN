import { InferSchemaType, Schema, model } from "mongoose";


const todo = new Schema({
    task: {type: String, required: true},
})


type todoModel = InferSchemaType<typeof todo>

export default model <todoModel> ("todo", todo)
