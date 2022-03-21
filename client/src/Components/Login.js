import React , {useContext , useState , useEffect , useReducer} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { UserContext } from '../App';

export default function Login() {
    const {state, dispatch} = useContext(UserContext);
    const history = useNavigate('')
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    
    const Postdata = async () => {
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            alert("wrong email addres pattern");
            return
        }
        fetch('/api/auth/login', {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "applicaiton-type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        }).then(res => res.json())
            .then(data=>{
                if(data.error){
                    console.log(data.error);
                    alert(data.error);
                }else{
                    alert('Login Successfully');
                    localStorage.setItem("jwt",data.token)
                    localStorage.setItem("user",JSON.stringify(data.user))
                    dispatch({type:"USER",payload:data.user})
                    history('/');
                }
            }).catch(err=>{
                console.log(err);
            })
    }
    return (
        <div className="container" style={{marginTop:"100px"}}>
            <div className="row">
                <div className="col-md-4 offset-md-4">
                    <h1 className="text-center">Login</h1>
                    <div className="form-group">
                        <label>Email</label>
                        <input type={'text'} className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                        <label>Password</label>
                        <input type={'password'} className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                        <button className="btn btn-primary btn-block" onClick={()=>Postdata()}>Login</button>
                        <p className="text-center">Don't have an account? <Link to="/signup">Register</Link></p>
                        <button className="btn btn-primary btn-block" onClick={()=>alert("relax and try to remember your password")}>Forget password</button>
                    </div>
                </div>
            </div>
        </div>
    )
}