import { RequestHandler } from "express";
import createHttpError from "http-errors";
import todoModel from "../Model/todoModel";
import { todo } from "../Model/todo";
import { isValidObjectId } from "mongoose";

export const getTodos: RequestHandler  = async(req, res, next)=>{

    try {

    //throw createHttpError(400, "server has stopped by the author")
    
    const response = await todoModel.find().exec();

    if(!response){
        throw createHttpError(400, "server could not fetch data from the database")
    }

    res.status(200).json(response)
    } catch (error) {
        next(error)
    }
    
}


interface inputTodo{
    task: string
}

export const createTodos: RequestHandler<unknown, unknown, inputTodo, unknown>  = async(req, res, next)=>{

    try {

    //throw createHttpError(400, "server has stopped by the author")

    const newTask = req.body.task;

    if(!newTask){
        throw createHttpError(400, "task is empty !!!")
    }
    
    const response = await todoModel.create({
        task: newTask
    });

    if(!response){
        throw createHttpError(400, "server could not create a new task !!!!")
    }

    res.status(201).json(response)
    } catch (error) {
        next(error)
    }
    
}

interface updateParams {
    todoId: string
}

export const updateTodos: RequestHandler<updateParams, todo[], inputTodo, unknown>  = async(req, res, next)=>{

    try {

    //throw createHttpError(400, "server has stopped by the author")

    const id = req.params.todoId

    if(!isValidObjectId(id)){
        throw createHttpError(400, "given id is invalid")
    }

    const newTask = req.body.task;

    if(!newTask){
        throw createHttpError(400, "task is empty !!!")
    }
    
    const response = await todoModel.findByIdAndUpdate(id, {
        task: newTask
    })

    if(!response){
        throw createHttpError(404, "server could not update the todo" )
    }

    res.sendStatus(200)
   
    } catch (error) {
        next(error)
    }
    
}



export const delteTodos: RequestHandler<updateParams, unknown, unknown ,unknown>  = async(req, res, next)=>{

    try {

    //throw createHttpError(400, "server has stopped by the author")

    const id = req.params.todoId;

    if(!isValidObjectId(id)){
        throw createHttpError(400, "invalid id !!")
    }
    
    const response = await todoModel.findByIdAndDelete(id);

    if(!response){
        throw createHttpError(400, "server could not fetch data from the database")
    }

    res.sendStatus(200)
    } catch (error) {
        next(error)
    }
    
}