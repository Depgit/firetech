// Before we go into building the application, let’s look at some of the hooks we will be using:

//     useState — This hook allows us to use state in function components (the equivalent to this.state and this.setState in class components)
//     useContext — This hook takes in a context object and returns whatever is passed in as a value prop in MyContext.Provider . 
//                    If you do not know about context, it's a way of passing state from a parent 
//                    component to any other component within the tree (no matter how deep)
//                    without having to pass it through other components that do not require it (a problem aptly named prop drilling). 
//     useReducer — This is an alternative to useState and it can be used for complex state logic. 
//                      This is my favorite hook because it works just like the Redux library. It accepts a reducer of type:

//     (state, action) => newState

//     And also an initial state object before returning the new state.

import React from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import './App.css';
import {reducer, initialState} from './reducers/reducer';
import {createContext, useContext, useEffect, useReducer} from 'react';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Alluser from './Components/Alluser';
import Navbar from './Components/Navbar';
import Userdata from './Components/Userdata';


export const UserContext = createContext();

const Routing = () => {
  const history = useNavigate();
  const {state, dispatch} = useContext(UserContext);
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('jwt'));
    if(token){
      dispatch({type: 'TOKEN', payload: token});
      history('/');
    }else{
      history('/login');
    }
  },[])
  return (
    <Routes>
      {/* <Route path="/" element={<Navbar />} /> */}
      <Route exact path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/allusers" element={<Alluser />} />
      <Route path="/userdata" element={<Userdata />} />
    </Routes>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{state,dispatch}}>
      <BrowserRouter>
        <Navbar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
