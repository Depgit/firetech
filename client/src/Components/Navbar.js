import React , {useContext , useState , useEffect , useReducer} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { UserContext } from '../App';

export default function Navbar() {
    const {state, dispatch} = useContext(UserContext);
    const history = useNavigate('')

    const renderList = () => {
        if(state){
            return (
                <>
                    <li key="2"><Link to="/allusers">All users</Link></li>
                </>
            )
        }else{
            return (
                <>
                    <li key="2"><Link to="/signup">Signup</Link></li>
                    <li key="3"><Link to="/login">Login</Link></li>
                </>
            )
        }
    }
    return (
        <nav>
            <div className="nav-wrapper">
                <Link to={state ? '/':'/login'} className="brand-logo">Home</Link>
                <ul className="right">
                    {renderList()}
                </ul>
            </div>
        </nav>
    )
}
