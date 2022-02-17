import React, { useState, useEffect, useReducer, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';

const Topcontributer = () => {
    const [data, setData] = useState([]);
    const [topContributers, setTopContributers] = useState([]);
    const { state, dispatch } = useContext(UserContext);    
    console.log(state);
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
        <div className="container w-25">
            <table class="table table-primary table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">username </th>
                        <th scope="col">Contributions</th>
                    </tr>
                </thead>
                {
                    topContributers.map((topContributer) => {
                        return (
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>{topContributer.username}</td>
                                    <td>{topContributer.contributions}</td>
                                </tr>
                            </tbody>
                        )
                    })
                }
            </table>
        </div>
    )
}
export default Topcontributer;