import React, { useEffect, useState, useRef } from "react";
import io from 'socket.io-client';
import './chat.css'

const socket = io('http://localhost:8080');


export default function Chat(props) {
    const [data, setData] = useState('');
    const [newmessage, setNewMessage] = useState([]);

    useEffect(()=>{
        fetch('/api/message/global',{
            method: 'get',
            headers: {
                'x-access-token': localStorage.getItem('jwt')
            }
        }).then(res=>res.json())
        .then(data=>{
            console.log(data);
            setNewMessage(data.messages);
        })
    },[])

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
                console.warn('DATA  sent successfully');
            })
        socket.on('message', (data) => {
            console.log("socket data", data);
            setNewMessage([...newmessage,data]);
        })
        setData('');
    }

    return (
        <>
            <div className="chatting" style={{ marginTop: "100px", scrollBehavior: 'smooth' }} >
                <div className="container">
                    {
                        newmessage && newmessage.map((item, index) => {
                            return (
                                <div key={index} className="card mb-3">
                                    <div className="card-body">
                                        <p className="card-text"><b>{item.from}</b></p>
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
        </>
    )

}
