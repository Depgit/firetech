import React from 'react'
import Topcontributer from './Topranker'
import Toprater from './Topranker'

export default function ShowToper() {
  return (
    < div className="row" style={{marginTop:"60px"}}>
        <div className='col-6'>
            <Topcontributer />
        </div>
        <div className='col-6'>
            <Toprater />
        </div>
    </div>
  )
}
