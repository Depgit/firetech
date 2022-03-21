import React, { useState, useEffect, useReducer, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';

const Topcontributer = () => {
    const [data, setData] = useState([]);
    const [topContributers, setTopContributers] = useState([]);
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
                setTopContributers(data.topContributers);
            })
    }, [])

    return (
        <table class="table table-primary table-striped" >
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">username </th>
                    <th scope="col">Contributions</th>
                </tr>
            </thead>
            {
                topContributers.map((topContributer,index) => {
                    return (
                        <tbody>
                            <tr>
                                <th scope="row">{index}</th>
                                <td><Link to={`/profile/${topContributer.username}`} className="text-decoration-none text-dark"> {topContributer.username}</Link></td> 
                                <td>{topContributer.contributions}</td>
                            </tr>
                        </tbody>
                    )
                })
            }
        </table>
    )
}
export default Topcontributer;