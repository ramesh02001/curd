
import './App.css';

import { useEffect, useState } from 'react'
import { Button,EditableText,InputGroup,Toaster } from '@blueprintjs/core';
const addtoaster =Toaster.create({
  position:"top"
})

function App() {
  const [user,setuser]=useState([]);
  const [Newname,setNewname]=useState("");
  const [Newemail,setNewemail]=useState("");
  const [Newwebsite,setNewwebsite]=useState("");

  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((res)=>res.json()).then((json)=>setuser(json))
  },[])
  function adduser(){
    const name = Newname.trim();
    const email = Newemail.trim();
    const website = Newwebsite.trim();
    if(name && email && website){
      fetch('https://jsonplaceholder.typicode.com/users',
      {
        method:"POST",
        body:JSON.stringify({
          name,
          email,
          website
        }),
        headers:{
           "content-type" : "application/json; Charset=UTF-8"
           
          }
      }
    ).then((res)=>res.json()).then(data =>{setuser([...user,data]);
      addtoaster.show({
        message:"User added successfully",
        intent :"success",
        timeout:'3000'
      })
      setNewname("");
      setNewemail("");
      setNewwebsite("");
      
        
     
    })
    }

  }
  function onChangeHandler(id,key,value){
    setuser((user)=>{
       return user.map(users=>{
         return users.id === id ? {...users,[key]:value} : users
        })
    })

  }

function updateuser(id){
  const update =user.find((users)=> users.id===id)
  fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{
        method:"PUT",
        body:JSON.stringify(update),
        headers:{
           "content-type" : "application/json; Charset=UTF-8"
           
          }
      }
    ).then((res)=>res.json()).then(data =>{  
    
      addtoaster.show({
        message:"Update successfully",
        intent :"success",
        timeout:'3000'
      })
    })
    
}
function deleteuser(id){

  fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{
    method:"DELETE",
  }
).then(res=>res.json())
.then(data =>{
  setuser((user)=>{
    return (user.filter(users => users.id !== id))
  })

  addtoaster.show({
    message:"Update successfully",
    intent :"success",
    timeout:'3000'
  })
})
}
  return (
    <div className="App">
    
    <table>
      <thead>
        <th>id</th>
        <th>Name</th>
        <th>Email</th>
        <th>Mark</th>
        <th>Action</th>
      </thead>
      <tbody>
      {user.map((users)=>
        <tr key={users.id}>
          <td>{users.id}</td>
          <td><EditableText onChange={value => onChangeHandler(users.id,'name',value)} value={users.name}/></td>
          <td><EditableText onChange={value => onChangeHandler(users.id,'email',value)} value={users.email}/></td>
          <td><EditableText onChange={value => onChangeHandler(users.id,'website',value)} value={users.website}/></td>
          <td>
          <Button intent='primary' onClick={()=>updateuser(users.id)}>update</Button>
          &nbsp;
          <Button intent='danger'onClick={()=>deleteuser(users.id)}>delete</Button>
          </td>
        </tr>
      )}
        
      </tbody>
      <tfoot>
        <tr>
          <td></td>
          <td>
            <InputGroup placeholder='Enter Name' value={Newname} onChange={(e)=>setNewname(e.target.value)}/>
          </td>
          <td>
            <InputGroup   placeholder='Enter Email' value={Newemail} onChange={(e)=>setNewemail(e.target.value)}/>
          </td>
          <td>
            <InputGroup  placeholder='Enter Website' value={Newwebsite} onChange={(e)=>setNewwebsite(e.target.value)}/>
          </td>
          <td><Button intent='success' onClick={adduser}>AddUser</Button></td>
        </tr>
      </tfoot>
    </table>
    </div>
  );
}

export default App;
