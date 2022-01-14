import React , {useContext , useState , useEffect , useReducer} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { UserContext } from '../App';

export default function Userdata() {
    const {state, dispatch} = useContext(UserContext);
    const history = useNavigate('')
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [number , setNumber] = useState('');
    const [address, setAddress] = useState('');
    
    const Postdata = async () => {
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            alert("wrong email addres pattern");
            return
        }
        if(!/^[0-9]{10}$/.test(number)){
            alert("wrong number pattern");
            return
        }
        // test username regex no space and alphanumeric character
        if(!/^[a-zA-Z0-9]*$/.test(username)){
            alert("wrong username pattern");
            return
        }
        fetch('/api/users/userdata', {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "applicaiton-type": "application/json"
            },
            body: JSON.stringify({
                username,
                number,
                email,
                address
            })
        }).then(res => res.json())
            .then(data=>{
                if(data.error){
                    alert(data.error);
                }else{
                    alert(data.message);
                    history('/');
                }
            }).catch(err=>{
                console.log(err);
            })
        
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4 offset-md-4">
                    <h1 className="text-center">Login</h1>
                    <div className="form-group">
                        <label>Username</label>
                        <input type={'text'} className="form-control" value={username} required  onChange={(e)=>setUsername(e.target.value)}   />
                        <label>Email</label>
                        <input type={'text'} className="form-control" value={email} required  onChange={(e)=>setEmail(e.target.value)} />
                        <label>Number</label>
                        <input type={'text'} className="form-control" value={number} required  onChange={(e)=>setNumber(e.target.value)} />
                        <label>Address</label>
                        <input type={'text'} className="form-control" value={address} required  onChange={(e)=>setAddress(e.target.value)} />
                        <button className="btn btn-primary btn-block" onClick={()=>Postdata()}
                        > Save user</button>
                    </div>
                </div>
            </div>
        </div>
    )
}