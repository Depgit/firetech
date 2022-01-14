import React , { useState, useEffect, useReducer, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

const Alluser = () =>{
    const [data, setData] = useState([]);
    const {state, dispatch} = useContext(UserContext);
    console.log(state);
    useEffect(() => {
        fetch('/api/users/allusers', {
            method: "get",
            headers: {
                "x-access-token": localStorage.getItem('jwt')
            }
        }).then(res => res.json())
            .then(data => {
                console.log(data);
                setData(data.user);
            })
    }, [])
    const deleteUser = (userid) => {
        fetch(`/api/users/deleteuser/${userid}`, {
            method: "delete",
            headers: {
                "x-access-token": localStorage.getItem('jwt')
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result);
                console.log(data);
                console.log(state);
                if(result.error){
                    alert(result.error);
                }else{
                    alert('User Deleted Successfully');
                    setData(data.filter(user => user._id !== userid));
                }
            })
    }
    return (
        <div className="container">
            {
                data.map(user => {
                    return (
                        <div className="row" key={user._id}>
                            <div className="col-md-4 offset-md-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Username : {user.username}</h5>
                                        <h5 className="card-title">Email : {user.email}</h5>
                                        <h5 className="card-title">Phone : {user.number}</h5>
                                        <h5 className="card-title">Address : {user.address}</h5>
                                        <button className="btn btn-danger btn-block" onClick={()=>deleteUser(user._id)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default Alluser;