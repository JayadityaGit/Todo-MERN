import { todoModel } from "../Model/TodoModel";

async function ErrorFetchData(input: RequestInfo, init?: RequestInit) {

    const response = await fetch(input, init);

    if(response.ok){
        return response;
    }else{
        const errorBody = await response.json();

         throw Error(errorBody.error)
    }
    
}


export async function getTodos() {

    

      const response = await ErrorFetchData("/api/todos", {method: "GET"});

      return response.json();
    
    
  }



export async function createTodos(inputValue: string) :Promise<todoModel>  {
    
    const response = await ErrorFetchData("/api/todos", {

        method: "POST",

        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({task: inputValue})
    })


    return response.json()

}


export async function deleteTodos(todoId: string) {
     await ErrorFetchData("/api/todos/"+todoId, {
        method:"DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    })
}