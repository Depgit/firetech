import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import io from 'socket.io-client';
import './chat.css'

// const socket = io();


export default function Chat(props) {
    const [data, setData] = useState('');
    const [newmessage, setNewMessage] = useState([]);

    useEffect(() => {
        fetch('/api/message/global', {
            method: 'get',
            headers: {
                'x-access-token': localStorage.getItem('jwt')
            }
        }).then(res => res.json())
            .then(data => {
                console.log(data);
                setNewMessage(data.messages);
            })
    }, [])

    console.log(newmessage);

    const message = () => {
        fetch('/api/message/global', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                body: data
            })
        }).then(res => res.json())
            .then(data => {
                setNewMessage([...newmessage, data.message]);
            })
        setData('');
    }

    return (
        <>
            <div style={{ marginTop: '100px' }}>
                <div className="w-75 m-auto" style={{ scrollBehavior: 'smooth' }} >
                    <div className="">
                        {
                            newmessage && newmessage.map((item, index) => {
                                return (
                                    <div key={index} className="mb-3">
                                        <div className="form-control w-100">
                                            <Link to={"/profile/" + item?.from}>
                                                <p className="card-text"><b>{item.from}</b></p>
                                            </Link>
                                            <p className="card-text">{item.body}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='row d-flex footer' >
                        <div className="col-10 ">
                            <input type="text" className='form-control' value={data || ''} onChange={(e) => setData(e.target.value)} />
                        </div>
                        <div className='col-2'>
                            <button className='form-control bg-secondary opacity-10 ' onClick={message}><b>Send</b></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}
