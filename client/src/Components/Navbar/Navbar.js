import React, { useContext, useState, useEffect, useReducer, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import "./navbar.css"
import NavLeft from './NavLeft'
export default function Navbar(props) {
    const searchModal = useRef(null)
    const [search, setSearch] = useState('')
    const [userDetails, setUserDetails] = useState([])
    const {state,dispatch} = useContext(UserContext)

    const fetchUsers = (query) => {
        setSearch(query)
        fetch('/api/auth/search-users', {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                query
            })
        }).then(res => res.json())
            .then(results => {
                console.log("kjfvn",results);
                setUserDetails(results.user)
            })
    }

    return (
        <div className="row fixed-top ">
            {/* <div className="col-2" ></div> */}
            <div className='col-12 r-flex nav-bg'>
                <div className='in-flex nulify width-auto m-1'>
                    <h5 className=''>Firetech</h5>
                    <div className='mx-1'>
                        {/* <input className="form-control" type="search" placeholder="Search" aria-label="Search" /> */}
                        <div >
                            <input
                                type="text"
                                placeholder="search users" id="colo"
                                value={search}
                                onChange={(e) => fetchUsers(e.target.value)}
                                className="form-control"
                            />
                            <ul className="">
                                {search && userDetails.map(item => {
                                    return <Link to={"/profile/" + item?.username} onClick={() => {
                                        setSearch('')
                                    }}><li className="">{item?.username}</li></Link>
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
                {/* <hr className="solid m-0"></hr> */}
                <div className='nulify d-flex align-items-center me-4 '>
                    <NavLeft />
                </div>
            </div>
            {/* <div className="col-2"></div> */}
        </div>
    )

}
