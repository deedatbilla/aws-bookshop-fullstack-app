import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react'
import Amplify, { API, graphqlOperation,Auth } from 'aws-amplify'
import { createTodo } from './graphql/mutations'
import { listTodos } from './graphql/queries'
import awsExports from "./aws-exports";
// import {SignIn,SignUp} from './Pages/'

import { HashRouter, Switch } from "react-router-dom";
import {Provider} from './Context/Context'
import {PublicRoute,PrivateRoute} from './Helpers'
import {MainContent} from './Views/'
const SignIn = React.lazy(() => import("./Pages/SignIn"));
const SignUp = React.lazy(() => import("./Pages/SignUp"));
Amplify.configure(awsExports);
// const initialState = { name: '', description: '' }

 const App = () => {
 
//   const [formState, setFormState] = useState(initialState)
//   const [todos, setTodos] = useState([])

//   useEffect(() => {
    // fetchTodos()
//   }, [])

//   function setInput(key, value) {
//     setFormState({ ...formState, [key]: value })
//   }

  async function fetchTodos() {
    try {
      
      // console.log()
      // const todoData = await API.graphql(graphqlOperation(listTodos))
      // const todos = todoData.data.listTodos.items
      // setTodos(todos)
    } catch (err) { console.log('error fetching todos') }
  }

//   async function addTodo() {
//     try {
//       if (!formState.name || !formState.description) return
//       const todo = { ...formState }
//       setTodos([...todos, todo])
//       setFormState(initialState)
//       await API.graphql(graphqlOperation(createTodo, {input: todo}))
//     } catch (err) {
//       console.log('error creating todo:', err)
//     }
//   }

  return (
    // <div style={styles.container}>
    //   <h2>Amplify Todos</h2>
    //   <input
    //     onChange={event => setInput('name', event.target.value)}
    //     style={styles.input}
    //     value={formState.name}
    //     placeholder="Name"
    //   />
    //   <input
    //     onChange={event => setInput('description', event.target.value)}
    //     style={styles.input}
    //     value={formState.description}
    //     placeholder="Description"
    //   />
    //   <button style={styles.button} onClick={addTodo}>Create Todo</button>
    //   {
    //     todos.map((todo, index) => (
    //       <div key={todo.id ? todo.id : index} style={styles.todo}>
    //         <p style={styles.todoName}>{todo.name}</p>
    //         <p style={styles.todoDescription}>{todo.description}</p>
    //       </div>
    //     ))
    //   }
    // </div>

    <Provider>
      
      <HashRouter>
        <React.Suspense fallback={<div>Loading</div>}>
     
       
     
          <Switch>
            <PublicRoute restricted={true} path="/signin" component={SignIn} />
            <PublicRoute restricted={true} path="/signup" component={SignUp} />
            <PrivateRoute path="/" component={MainContent} />
          </Switch>
       
      </React.Suspense>
      </HashRouter>
    </Provider>
  
  )
}

const styles = {
  container: { width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 },
  todo: {  marginBottom: 15 },
  input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
  todoName: { fontSize: 20, fontWeight: 'bold' },
  todoDescription: { marginBottom: 0 },
  button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' }
}

export default App