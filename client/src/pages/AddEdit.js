import axios from 'axios';
import { useLocation, useNavigate  , useParams} from "react-router-dom";
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';

const AddEdit = () => {
 const navigate = useNavigate();
const [formdata , setformdata] = useState({
    name : "",
    email : "",
    contact : ""
})
console.log(formdata);
const {id} =  useParams();
console.log(id);

useEffect(()=>{
  axios.get(`http://localhost:1812/api/get/${id}`).then((res)=>{setformdata(...res.data)})
}, [id])


//  onhcange handler  function  

const changeHandler = (e) =>{
    const {name , value} = e.target
    setformdata((prev)=>{
        return ({...prev , [name] : value})
    })
}



//  submmit button  function


const submitHandler = async(e) =>{
  
    const {name , email , contact} = formdata
    e.preventDefault();
    if(!name || !email || !contact){
        toast.error("pls fill the all input ")
    }else if(!id){
         axios.post(" http://localhost:1812/api/post",{
          name ,
          email ,
          contact
        }).then((res)=>
          setformdata({name : "" , email : "" , contact : ""}) , 
          toast.success("data submited")
        ).catch((err)=>toast.error(err))
        setTimeout(()=>{
          navigate("/")
        }, 1000)

        // try{
        //   const res =  await fetch("http://localhost:1812/api/post",{
        //     method : "POST",
        //     headers :{'Content-Type': 'application/json'},
        //     body : JSON.stringify({helo :"helo"})
        //   })
  
        //   const data = await res.json()
        //   console.log(data);

          
        // }catch(err){
        //   console.log("err");
        // }
      


    }else{
      axios.put(`http://localhost:1812/api/put/${id}`,{
        name ,
        email ,
        contact
      }).then((res)=>
        setformdata({name : "" , email : "" , contact : ""}) , 
        toast.success("data update sucess fully")
      ).catch((err)=>toast.error(err))
      setTimeout(()=>{
        navigate("/")
      }, 1000)

    }
}

  return (
    <div className='main_container'>
        <div className='container'>
            <div className='addEdit_container'>
            <Form onSubmit={submitHandler}  >
            <Form.Group className="mb-3">
              <Form.Label>name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" name='name' id='name' value={formdata.name || ""} onChange = {changeHandler}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>email</Form.Label>
              <Form.Control type="email" name='email' id='email' value={formdata.email || ""}  placeholder="Enter email"  onChange = {changeHandler}/>
            </Form.Group>
      
            <Form.Group className="mb-3">
              <Form.Label>contact</Form.Label>
              <Form.Control type="text" name='contact' id='contact' value={formdata.contact || ""}  placeholder="Enter contact"  onChange = {changeHandler}/>
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
            </div>
        </div>
    </div>
  )
}

export default AddEdit