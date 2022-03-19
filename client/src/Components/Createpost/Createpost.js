import React, { useContext, useEffect, useState } from 'react'
import { UserContext, PostContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import './createpost.css';
import {ConverBase64} from '../../utils/convertBase64'


export default function Createpost() {
    const [url, seturl] = useState('');
    const [image, setImage] = useState('');
    const [title, settitle] = useState('');
    const [description, setdescription] = useState('');
    const { state, dispatch } = useContext(UserContext);
    const { post, dispatchPost } = useContext(PostContext);
    const history = useNavigate('')
    const [upload, setUpload] = useState(true);

    // const ConverBase64 = (file) => {
    //     return new Promise((resolve, reject) => {
    //         const fileReader = new FileReader();
    //         fileReader.readAsDataURL(file);
    //         fileReader.onload = () => {
    //             resolve(fileReader.result);
    //         };
    //         fileReader.onerror = (error) => {
    //             reject(error);
    //         };
    //     });
    // }

    useEffect(() => {
        if (url) {
            // console.log("url >> ", url);
            fetch('/api/posts/createpost', {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    title,
                    url
                })
            }).then(res => res.json())
                .then(data => {
                    if (data.error) {
                        console.log(data);
                    }
                    else {
                        dispatchPost({ type: "POSTS", payload: data.post })
                        alert('created Successfully');
                        history('/');
                    }
                    setUpload(true);
                }).catch(err => {
                    setUpload(true);
                    console.log(err);
                })
        }
    }, [url])

    const submitHandler = () => {
        setUpload(false);
        seturl(image);
    }



    return (
        <div className='mx-4 m-up' >
           {
               upload ?
               <div className='row  mt-4 '>
               <div className='col-6  m-auto '>
                   <input type="text" className='form-control' placeholder='Title'
                       value={title}
                       onChange={(e) => settitle(e.target.value)}
                   />
                   <div className="form-control h-100">
                       <input type="file" onChange={async (e) => setImage(await ConverBase64(e.target.files[0]))} />
                   </div>
                   <input type="text" className="form-control" placeholder="Enter the description"
                       value={description}
                       onChange={(e) => { setdescription(e.target.value) }}
                   />
                   <div>
                       <button className='btn btn-primary mt-2'
                           onClick={() => submitHandler()}
                       >Submit</button>
                   </div>
               </div>
           </div>
           :
            <h1>...upload</h1>
           }
        </div>
    )
}
