import React, { useState, useEffect, useReducer, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

const Toprater = () => {
    const [data, setData] = useState([]);
    const [toprankers, settoprankers] = useState([]);
    const { state, dispatch } = useContext(UserContext);
    
    useEffect(() => {
        fetch('api/auth/Topranker', {
            method: "get",
            headers: {
                "x-access-token": localStorage.getItem('jwt')
            }
        }).then(res => res.json())
            .then(data => {
                console.log(data);
                settoprankers(data.topRanker);
            })
    }, [])

    return (
        <div>
            <table class="table table-primary table-striped" >
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">username </th>
                        <th scope="col">rating</th>
                    </tr>
                </thead>
                {
                    toprankers.map((topranker,index) => {
                        return (
                            <tbody>
                                <tr>
                                    <th scope="row">{index}</th>
                                    <td><Link to={`/profile/${topranker.username}`} className="text-decoration-none text-dark"> {topranker.username} </Link></td>
                                    <td>{topranker.rating}</td>
                                </tr>
                            </tbody>
                        )
                    })
                }
            </table>
        </div>
    )
}
export default Toprater;