import { useState } from "react"
import { Modal } from "react-bootstrap"
import { Button } from "react-bootstrap"
import { getTodo,  updateTodos } from "../Network/TodoApi"
import { todoModel } from "../Model/TodoModel"


interface EditTodoProps {
    onDismiss: ()=>void,

    taskId: string,

    changeTodos: (newTodo: todoModel)=>void
}



const EditTodo = ({onDismiss, taskId, changeTodos}:EditTodoProps) => {
    const [inputValue, setInputValue] = useState("")
  return (
    <div>
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>

                <Modal.Title>Update the task !!!</Modal.Title>

            </Modal.Header>

            <Modal.Body>
                <input type="text" placeholder="enter task !!" onChange={(event)=>{setInputValue(event.target.value)}}/>
            </Modal.Body>


            <Modal.Footer>
                <Button onClick={async()=>{

                    try {
                         await updateTodos(taskId, inputValue)

                         const response = await getTodo(taskId);

                         changeTodos(response)

                         onDismiss()


                    } catch (error) {
                        alert(error)
                        console.error(error)
                    }

                    
                }}>Save</Button>
            </Modal.Footer>
        </Modal>
    </div>
  )
}

export default EditTodo