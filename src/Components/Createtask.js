import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Createtask() {
    const [taskName, settaskName] = useState()
    const [taskDesc, settaskDesc] = useState()
    const[ShowAlert,setShowAlert]= useState(false)
    const [ taskerr,setaskerr] = useState({})
    const navigate = useNavigate()
    const ontaskNamechange = (e) => {
        settaskName(e.target.value)
    }
    const ontaskDescchange = (e) => {
        settaskDesc(e.target.value)
    }
    const CreateTask = (taskData) => {
        let taskerr = validatetaskform()
        setaskerr(taskerr)
        if(Object.keys(taskerr).length===0){
          fetch("https://taskifiybackend.onrender.com/task/create", { method: "POST", headers: { 'content-type': "application/json" }, body: JSON.stringify(taskData) }).then(function (res) {
            return res.json()
        }).then(function (result) {
            if(result._id){
                setShowAlert(true)
          }
            console.log("data saved succesfully")
            navigate("/")
           
        })
         }else{
            return;
         } }
   
    const validatetaskform = ()=>{
        let taskerr ={}
            if(!taskName){
                taskerr.taskName="please enter your task"
            }if(!taskDesc){
                taskerr.taskDesc="please enter your description"
            }
        return taskerr
    }
    const savetask = (e) => {
        e.preventDefault();
        let taskData = {
            taskName,
            taskDesc,
            status:"not_started",
            assigned: true
        }
        CreateTask(taskData)
    }
    return (
        <div className="container">
            <h4><i>create your tasks here !!!</i></h4>
            <div className="card" style={{ width: "30rem", margin: "30px" , borderRadius:"10%" }}>
                <div className="card-body">
                    <form onSubmit={savetask}>
                        <div class="form-group" style={{ padding: "10px" }} value={{ taskName }} onChange={ontaskNamechange}>
                           <label >taskName:</label>
                            <input type="text" class="form-control" placeholder="Enter taskname" /><i style={{color:"red"}}>{taskerr?.taskName}</i><br/>

                        </div>
                        <div class="form-group" style={{ padding: "10px" }} value={{ taskDesc }} onChange={ontaskDescchange}>
                            <label>taskDescrption:</label>
                            <input type="text" class="form-control" placeholder=" enter taskDescrption" /><i style={{color:"red"}}>{taskerr?.taskDesc}</i><br/>
                        </div>
                       


                        <button type="submit" class="btn btn-danger" style={{ width: "100px", height: "50px" }}>Submit</button>
                        


                    </form>

                </div>
            </div>
           {ShowAlert && <div className="row">
                <div className="col-md-3 mt-4">
                    <div class="alert alert-success" role="alert">
                        task added succesfully!!
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default Createtask

