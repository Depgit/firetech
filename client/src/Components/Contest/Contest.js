import React, { useContext, useEffect, useState } from 'react'
import './contest.css'
import Grid from '../Grid/Grid';
import { ContestContext } from '../../App';



export default function Contest(props) {
    const [itemData, setItemData] = useState([]);
    const { contest, dispatchContest } = useContext(ContestContext);

    useEffect(() => {
        if (contest.length === 0) {
            fetch('/api/contest/data', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem('jwt')
                }
            }).then(res => res.json())
                .then(result => {
                    result.data.map((res) => {
                        dispatchContest({ type: "CONTEST", payload: res })
                    })
                })
        }
    }, [])


    return (
        <div className='row p-top m-1'>
            {contest.length > 0 ? <Grid data={contest} /> : <h1>...Loading</h1>}
        </div>
    )
}
