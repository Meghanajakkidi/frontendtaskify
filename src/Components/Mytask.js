import { useState, useEffect } from "react"

function Mytask() {
    const [tasks, setTasks] = useState([])
    const [searchkey, setsearchkey] = useState("")
    const [filteredtask, setfilteredtask] = useState([])
    const [status, setstatus] = useState(["Alltasks", "completed", "inprogress", "not_started"])
    const [taskSummary, setTaskSummary] = useState({  InProgressCount: 0, CompletedCount: 0 })

    const getmyTasks = async () => {
        const user = await localStorage.getItem("loggedinuser") && JSON.parse(localStorage.getItem("loggedinuser"))
        fetch("https://backendtaskifiy.onrender.com/user/task/myTask/" + user.userId).then((res) => {
            return res.json();
        }).then((result) => {
            setTasks(result)
            setfilteredtask(result)
        })
    }
    const getTaskSummaryByUser = async ()=>{
        const user = await localStorage.getItem("loggedinuser") && JSON.parse(localStorage.getItem("loggedinuser"))
        fetch("https://backendtaskifiy.onrender.com/user/task/summary/"+ user?.userId).then((res) => {
            return res.json();
        }).then((result) => {
            setTaskSummary(result)
        })
    }

    useEffect(() => {
        getmyTasks();
        getTaskSummaryByUser ();
    }, [])

    const completetask = (e, id) => {
        fetch("https://backendtaskifiy.onrender.com/user/task/completeTask", { method: "PUT", headers: { "Content-type": "Application/Json" }, body: JSON.stringify({ id: id, status: "completed" }) }).then((res) => {
            return res.json();
        }).then((result) => {
            getmyTasks();
        })
    }

    const searchtasks = (e) => {
        setsearchkey(e.target.value)
        if (e.target.value) {
            let filteredtaskdata = tasks.filter((item) => {
                return item.taskName.includes(e.target.value)

            })
            setfilteredtask(filteredtaskdata)
        } else {
            setfilteredtask(tasks)
        }
    }





    const getTasksbystatus = async (status) => {
        const user = await localStorage.getItem("loggedinuser") && JSON.parse(localStorage.getItem("loggedinuser"))
        fetch(`https://backendtaskifiy.onrender.com/user/task/${user.userId}/byStatus/${status}`).then((res) => {
            return res.json();
        }).then((result) => {
            setTasks(result)
            setfilteredtask(result)
        })
    }
    const statuschange = (e) => {
        //console.log(e.target.value)
        getTasksbystatus(e.target.value)
    }


    return (

        <div className="container">
            <form className="d-flex" role="search" style={{ position: "absolute", top: "20px", left: "50%", }} >
                <input className="form-control me-2" type="search" style={{ width: "500px" }} placeholder="Search" onChange={(e) => searchtasks(e)} value={searchkey} />

            </form>
            <div className="demo">
                <div className="row mt-3">
                    <div className="col-md-3">
                        <div className="card text-center mb-3 card-shadow" style={{ borderBottom: '5px solid orange' }}>
                            <div className="card-body">
                                <h5 className="card-title">In Progress Tasks</h5>
                                <p className="card-text count-task">{taskSummary.InProgressCount}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="card text-center mb-3 card-shadow" style={{ borderBottom: '5px solid green' }}>
                            <div className="card-body">
                                <h5 className="card-title">Completed Tasks</h5>
                                <p className="card-text count-task">{taskSummary.CompletedCount}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <h1>MYTASK LIST</h1>
                <div className="row">
                    <div>
                        <div className="form-floating" style={{ borderRadius: "20%" }} onChange={(e) => statuschange(e)}>
                            <select className="form-select" id="floatingSelect">
                                {status.map((item) => {
                                    return (
                                        <option value={item}>{item}</option>
                                    )
                                })}

                            </select>

                        </div>
                    </div>
                    {filteredtask.length === 0 && <h4>NO TASKS AVALIABLE</h4>}
                    {filteredtask.map((tasks) => {
                        return (
                            <div className="col-md-3 mt-3">
                                <div className="card">
                                    {tasks.status === "inprogress" && <button style={{ position: "absolute", }} className="btn btn-success" onClick={(e) => completetask(e, tasks._id)}>{'completed'}</button>}
                                    {/* {tasks.status === "not_started" && <button style={{ position: "absolute", }} className="btn btn-success" onClick={(e) => assigntask(e, tasks._id, tasks.status)}>{'start'}</button>}*/}
                                    <img src="https://tse1.mm.bing.net/th?id=OIP.tSRRipIbDmNDBtdg6ouakQHaHa&pid=Api&P=0&h=180" className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{tasks?.taskId?.taskName}</h5>
                                        <p className="card-text">{tasks?.taskId?.taskDesc}</p>

                                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                                            <span className="badge text-bg-info">{tasks?.status}</span>
                                            {/*<span className="badge text-bg-danger" onClick={(e) => deletetask(e, tasks._id)}>delete</span>*/}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

        </div>

    )
}


export default Mytask