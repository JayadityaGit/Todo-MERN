import { Router } from "express";

import { createTodos, delteTodos, getTodos, updateTodos } from "../Controllers/todoController";


const routes = Router();

routes.get("/", getTodos)

routes.post("/", createTodos)

routes.patch("/:todoId", updateTodos)

routes.delete("/:todoId", delteTodos)


export default routes