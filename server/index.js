const express =  require("express");
const app =  express();
const mysql2 = require("mysql2");
const cors =  require("cors");
const port  = 1812
const bodyParser = require('body-parser')

var db  = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "meet1812",
    database : "curd_contact"
  });

  app.use(cors({
    origin: '*'
}));

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))

// get api all the table 

app.get("/api/get" , (req , res)=>{
    var sqlget =  "SELECT * FROM new_table"
    db.query(sqlget ,  "SELECT * FROM new_table", 
        (error , result)=>{
        res.send(result);
    })
})



//  gat api only particular id on update button
app.get("/api/get/:id" , (req , res)=>{
   const {id} = req.params
    var sqlget =  "SELECT * FROM new_table WHERE id = ?"
    db.query(sqlget , id , 
        (error , result)=>{
        res.send(result);
    })
})



app.put("/api/put/:id" , (req ,res)=>{
    const {id} = req.params
    const {name , email , contact} = req.body;
    // console.log("hello");
    var sqlUpdate = "UPDATE new_table SET name = ?  , email = ?  , contact = ? WHERE id = ?"
    db.query(sqlUpdate , [name ,email , contact , id] ,  (error ,result)=>{
        if(error){
        console.log("error" , error)
        }

        res.send(result)
    
    })
})


//  post data from table submit button
app.post("/api/post" , (req ,res)=>{
    const {name , email , contact} = req.body;
    // console.log("hello");
    var sqlInsert = "INSERT INTO new_table(name , email , contact) VALUES (? , ? , ?)"
    db.query(sqlInsert , [name ,email , contact], (error ,result)=>{
        if(error){
        console.log("error" , error)
        }
    
    })
})




app.post("/api/remove/:id" , (req ,res)=>{
   const {id} =  req.params

   const sqlremove = "DELETE FROM  new_table WHERE id = ? "
   db.query(sqlremove , id , (err ,result)=>{
    // if(error){
    //     console.log("err");
    // }
    console.log(result);
   })
  
})

app.listen(port, ()=>{
    console.log("server is running ");
})