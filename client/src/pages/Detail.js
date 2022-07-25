import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import { useParams } from 'react-router-dom';

const Detail = () => {
const [viewData , setviewData] =  useState({});
const {name , email , contact} = viewData

const {id} =  useParams();

useEffect(()=>{
  axios.get(`http://localhost:1812/api/get/${id}`).then((res)=>setviewData(res.data))
}, [id])

console.log(viewData);

return (
    <div className='main_container'>
        <div className='container'>
            <div className=' card_container'>
            
            {[
              'Primary'
            ].map((variant) => (
              <Card
                bg={variant.toLowerCase()}
                key={variant}
                text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
                style={{ width: '18rem' }}
                className="mb-2"
              >
              
                <Card.Body>
                  <Card.Title> person Detail  {name}</Card.Title>
                  <Card.Title> </Card.Title>
                  <Card.Title>  </Card.Title>
                  <Card.Title></Card.Title>
                 
                </Card.Body>
              </Card>
            ))}
            </div>
        </div>

    </div>
  )
}

export default Detail