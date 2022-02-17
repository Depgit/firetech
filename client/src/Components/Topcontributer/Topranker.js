import React, { useState, useEffect, useReducer, useContext } from 'react';
import { UserContext } from '../../App';

const Topcontributer = () => {
    const [data, setData] = useState([]);
    const [toprankers, settoprankers] = useState([]);
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
                settoprankers(data.topRanker);
            })
    }, [])

    return (
        <div>
            <table class="table table-primary table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">username </th>
                        <th scope="col">rating</th>
                    </tr>
                </thead>
                {
                    toprankers.map(topranker => {
                        return (
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>{topranker.username}</td>
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
export default Topcontributer;