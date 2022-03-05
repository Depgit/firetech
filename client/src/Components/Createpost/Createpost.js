import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import './createpost.css';


export default function Createpost() {
    const [url, seturl] = useState('');
    const [image, setImage] = useState('');
    const [title, settitle] = useState('');
    const [description, setdescription] = useState('');
    const { state, dispatch } = useContext(UserContext);
    const history = useNavigate('')



    useEffect(() => {
        if (url) {
            fetch('/api/posts/createpost', {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "applicaiton-type": "application/json",
                    "x-access-token": localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    title,
                    url,
                })
            }).then(res => res.json())
                .then(data => {
                    if (data.error) {
                        console.log(data.error);
                        alert(data.error);
                    } else {
                        console.log(data);
                        alert('created Successfully');
                        dispatch({ type: "POSTS", payload: data.post })
                        history('/');
                    }
                }).catch(err => {
                    console.log(err);
                })
        }
    }, [url])

    const submitHandler = (e) => {
        e.preventDefault();
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "drpzet")
        data.append("cloud_name", "depimage")
        fetch("https://api.cloudinary.com/v1_1/depimage/image/upload", {
            method: "post",
            body: data
        })
            .then(res => res.json())
            .then(data => {
                seturl(data.url)
            })
            .catch(err => console.log(err))
    }



    return (
        <div className='mx-4 m-up' >
            <div className='row  mt-4 '>
                <div className='col-6  m-auto '>
                    <input type="text" className='form-control' placeholder='Title'
                        value={title}
                        onChange={(e) => settitle(e.target.value)}
                    />
                    <div className="form-control h-100">
                        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                    </div>
                    <input type="text" className="form-control" placeholder="Enter the description"
                        value={description}
                        onChange={(e) => { setdescription(e.target.value) }}
                    />
                    <div>
                        <button className='btn btn-primary mt-2'
                            onClick={submitHandler}
                        >Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
