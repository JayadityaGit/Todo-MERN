import { Button } from "react-bootstrap"
import { deleteTodos } from "../Network/TodoApi"
import { todoModel } from "../Model/TodoModel"
import { useState } from "react"



interface todoProps{
    task: string,
    id: string,
    whole: todoModel,
    remove:(todo: todoModel)=>void,
    onDismiss: ()=>void
    placeId : (id: string)=> void
}

const Todo = ({task, id, whole, remove, onDismiss, placeId}: todoProps) => {

  

  return (
    <div>
        
       <p>{task}</p> 

       <div>
       <Button variant="info" onClick={()=>{
           
         

           onDismiss()

           placeId(id)
           
       }}>Edit</Button>



       <Button variant="info" onClick={async()=>{

        try {
          await deleteTodos(id)

          remove(whole)
        } catch (error) {
          console.error(error)
          alert(error)
        }
          
       }}>Delete</Button>
       </div>
    
    </div>
  )
}

export default Todo