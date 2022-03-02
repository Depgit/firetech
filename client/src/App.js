import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import {reducer, initialState} from './reducers/reducer';
import {postreducer,postinitialState} from './reducers/post';
import {createContext, useContext, useEffect, useReducer} from 'react';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Navbar from './Components/Navbar/Navbar'
import Votes from './Components/Votes/Votes';
import Home from './Components/Home/Home';
import Profile from './Components/Profile/Profile';
import Contest from './Components/Contest/Contest';
import Contributer from './Components/Topcontributer/Topcontributer'
import Grid from './Components/Grid/Grid';
import PostCard from './Components/PostCard/PostCard';
import ShowToper from './Components/Topcontributer/ShowToper';
import Createpost from './Components/Createpost/Createpost';

export const UserContext = createContext();
export const PostContext = createContext();

const Routing = () => {
  const history = useNavigate();
  const {state, dispatch} = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if(user?.username){
      dispatch({type: 'USER', payload: user});
    }else{
      history('/login');
    }
  },[])
  return (
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/signup" element={<Signup />} />
      <Route exact path="/profile" element={<Profile />} />
      <Route exact path="/contests" element={<Contest />} />
      <Route exact path="/rankers" element={<ShowToper /> } />
      <Route exact path="/createpost" element={<Createpost />} />
      <Route path="/" element={<Home />} />
    </Routes>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [post , dispatchPost] = useReducer(postreducer, postinitialState);

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
