import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../App';

export default function Createpost() {
    const [url, seturl] = useState('');
    const [title, settitle] = useState('');
    const [description, setdescription] = useState('');
    const {state, dispatch} = useContext(UserContext);

    console.log(state);
    
    const validateLink = (url) => {
        if (url.length === 0) {
            return true;
        }
        const reg = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/
        const reg2 = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(:[0-9]+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/

        if (reg.test(url) || reg2.test(url)) {
            return true;
        }
        return false;
    }

    const submitHandler = async (e) => {
        e.preventDefault();
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
            .then(data=>{
                if(data.error){
                    console.log(data.error);
                    alert(data.error);
                }else{
                    console.log(data);
                    alert('created Successfully');
                    dispatch({type:"POSTS",payload:data.post})
                }
            }).catch(err=>{
                console.log(err);
            })
    }

    return (
        <div className='mx-4' style={{ marginTop: "60px" }}>
            <h1 className='text-center '>Createpost</h1>
            <h3>How to create post?</h3>
            <h4> visit the image hosting site <a href="https://imgbb.com/"  target="_blank" > Link </a>  </h4>
            <h4> upload the image and copy  the link you get after uploading </h4>
            <h4> paste the link in the input box below </h4>

            <div className='row form-control mt-4'>
                <div className='col-6 card-body m-auto '>
                    <input type="text" className='form-control' placeholder='Title'
                        value={title}
                        onChange={(e) => settitle(e.target.value)}
                    />
                    <input type="text" className="form-control" placeholder="Enter the link"
                        value={url}
                        onChange={(e) => {seturl(e.target.value)}}
                    />
                    {
                        (!validateLink(url)) ?
                           <img src="https://i.imgur.com/XqQXZvK.jpg" alt="img" className='img-fluid' />
                            :
                            <></>
                    }
                    <input type="text" className="form-control" placeholder="Enter the description" 
                        value={description}
                        onChange={(e) => {setdescription(e.target.value)}}
                    />
                    <button className='btn btn-primary mt-2'
                       onClick={submitHandler}
                    >Submit</button>
                </div>

            </div>
        </div>
    )
}
