import { useState } from "react"


function ToDoList(){
    const [taskname,settaskname]=useState("")
    const[taskdescription,settaskdescription]=useState("")

    const handletaskname =(e)=>{
        settaskname(e.target.value)
    }

    const handletaskdescription = (e)=>{
        settaskdescription(e.target.value)
    }
    const CreateToDo = ()=>{
        console.log(taskname,taskdescription)
        fetch("http://localhost:7000/todos/create",{method:"POST",headers:{"content-type":"application/json",},body:JSON.stringify({taskname,taskdescription})}).then(function (res) {
            return res.json();
            
        }).then(function (result) {
            console.log("data save successfully")
            ResetToDo();
        })

       const ResetToDo = ()=>{
            settaskdescription("")
            settaskname("")
        }
    }
    return(
        <div className="container">
            <div className="row">
            <h1>TODOS</h1>
            </div>
            <div className="row"> 
            <div className="col-md-6">
           <label>TASKNAME</label>
           <input type="text" className="form-control" value={taskname} onChange={handletaskname}/>
            </div>
            <div className="col-md-6">
           <label>TASk Description</label>
           <input type="text" className="form-control" value={taskdescription} onChange={(e)=>handletaskdescription(e) }/>
            </div>
            <div className="col-md-3 mt-4">
                  <button className="btn btn-primary" onClick={(()=>{CreateToDo()})}>ADDTASK</button>
            </div>
            </div>
              </div> 
    )
}

export default ToDoList