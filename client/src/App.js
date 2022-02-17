import React from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import {reducer, initialState} from './reducers/reducer';
import {createContext, useContext, useEffect, useReducer} from 'react';
import Login from './Components/Login';
import Signup from './Components/Signup';
<<<<<<< HEAD
import Navbar from './Components/Navbar/Navbar';
=======
import Navbar from './Components/Navbar/Navbar'
>>>>>>> 9a3e855da3be12c911ac2a0392e3e8e2c31fa263
import Votes from './Components/Votes/Votes';
import Home from './Components/Home/Home';

export const UserContext = createContext();

const Routing = () => {
  const history = useNavigate();
  const {state, dispatch} = useContext(UserContext);
  useEffect(() => {
    const token = (localStorage.getItem('jwt'));
    if(token){
      dispatch({type: 'TOKEN', payload: token});
    }else{
      history('/login');
    }
  },[])
  return (
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/signup" element={<Signup />} />
      <Route exact path="/votes" element={<Votes />} />
    </Routes>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{state,dispatch}}>
      <BrowserRouter>
        <Navbar />
        <Home />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
