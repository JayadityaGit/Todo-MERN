import { useEffect, useState } from "react"
import styles from "./Styles/Main.module.css"
import { todoModel } from "./Model/TodoModel"
import { createTodos, getTodos } from "./Network/TodoApi"
import { Button } from "react-bootstrap"
import Todo from "./Components/Todo"
import EditTodo from "./Components/EditTodo"

const App = () => {

  //we need a store, to store the todos

  const [todos, setTodos] = useState<todoModel[]>([])

  const [inputValue, setInputValue] = useState("");


  const[showModalUpdate, setShowModalUpdate] = useState(false)



  const [taskId, setTaskId] = useState(" ")

  useEffect(() => {

    async function get() {

      try {
        const response = await getTodos();

        setTodos(response)

      
      } catch (error) {
        console.error(error);
        alert(error)
      }

    
      
    }
    
    get()
    
  }, [])
  

  return (
    <div>

      <div className={styles.mainBox}>

      {showModalUpdate&&<EditTodo taskId={taskId} onDismiss = {()=>{setShowModalUpdate(false)}} changeTodos = {(newTodos: todoModel)=>{
        const newArray = todos.map((value)=>{
             

          if(value._id === newTodos._id){
            return newTodos;
          }
          
          return value;
        })

        setTodos(newArray)
      }}/>}

        <h1>Todo App</h1>

        <div className="">
           <input type="text" value={inputValue} onChange={(event)=>{setInputValue(event.target.value)}}/>
           <Button variant="light" onClick={async()=>{

               try {
                const newTodo = await createTodos(inputValue);

                setTodos([...todos, newTodo])

                setInputValue("")


                
               } catch (error) {
                  console.error(error)

                  alert(error)
               }
              

           }}>Add Task</Button>
        </div>


        <div>
          {
            todos.map((todo)=>{
              return <Todo key={todo._id} whole={todo} task={todo.task} id={todo._id} placeId={(id: string)=>{setTaskId(id)}} onDismiss={()=>{setShowModalUpdate(true)}} remove={(delteTodo: todoModel)=>{
                setTodos(prevArray => prevArray.filter(element => element !== delteTodo))
              }}/>
            })
          }
        </div>

      </div>

      

    </div>
  )
}

export default App