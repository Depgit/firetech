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
    return (
        <div className="container">
            {
                data.map(user => {
                    return (
                        <div className="row" key={user._id}>
                            <div className="col-md-4 offset-md-4">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">{user.username}</h5>
                                        <h5 className="card-title">{user.email}</h5>
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