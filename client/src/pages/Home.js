import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import { NavLink, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const Home = () => {
    const [data  , setdata] = useState([]);
   
    const thisId =  useParams();
    console.log(thisId);
   

    // useEffect(() =>{
    //   axios.get(`http://localhost:1812/api/get/${id}`).then((res)=>{
    //     console.log(res.data);
    //   }).catch((err)=>{
    //     console.log("err");
    //   }) 
    // },[id])


    useEffect(()=>{
      loaddata();
      console.log("use effctt call");

  },[])
    const loaddata = async() =>{
        const res = await axios.get("http://localhost:1812/api/get");
        // console.log((res.data))
        console.log("function call");
        setdata(res.data)
    }


    

    //   fetch method using
    // try{

    //     const res =  await fetch("http://localhost:1812/api/get" , {
    //     method : "GET",
    //     headers: { 'Content-Type': 'application/json' },
    //     body : JSON.stringify() 
    // })

    // const table = await res.json();
    // console.log(table);
    // setdata(table)

    // }catch(err){
    //     console.log(err);
    // }


    //  delete funcion onliclick event


    const deletHandler = (id) =>{
      if(window.confirm("Are you sure delete ?")){
        axios.post(`http://localhost:1812/api/remove/${id}`);
        // console.log("delete function call");
        toast.success("delete data success fully!")
        setTimeout(()=>{
          loaddata()
        },2000)
      }
        
    }


    //  update funtion 
  
    // const  updateHandler = (id) =>{
    //   axios.get(`http://localhost:1812/api/put/${id}`);
    //   console.log("update function call");
    // }




  return (
    <div className='main_container '>
        <div className='cotainer'>
            <div className='table_container'>
            <NavLink to={`/addedit`}> <Button variant="primary" style={{margin : "50px"}}>AddData</Button> </NavLink>
          
            <Table striped bordered hover>
            <thead>
              <tr>
                <th>id</th>
                <th>name</th>
                <th>email</th>
                <th>contact</th>
                <th>action</th>
              </tr>
            </thead>

            <tbody>
          
            {data.map((curEle , index)=>{

              return(
                <tr >
                <td>{index + 1}</td>
                <td>{curEle.name}</td>
                <td>{curEle.email}</td>
                <td>{curEle.contact}</td>
                <td>
                <NavLink to={`/update/${curEle.id}`}> <Button variant="primary"  >update</Button> </NavLink>
                <NavLink to={`/`}>  <Button variant="danger"  onClick={()=>{ deletHandler(curEle.id)}} >delete</Button>  </NavLink>
                <NavLink to={`/view/${curEle.id}`}>   <Button variant="info">view</Button>  </NavLink>
                
                </td>
              </tr> 

              )
            })}
                    
            </tbody>
          </Table>
            </div>
        </div>
    </div>
  )
}

export default Home