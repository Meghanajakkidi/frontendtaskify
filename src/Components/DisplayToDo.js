import { useState, useEffect } from "react"





function DispalyToDo() {

    const [todos, settodos] = useState([])
    useEffect(() => {
        fetch("http://localhost:7000/todos/list").then(function (res) {
            return res.json();
        }).then(function (result) {
            settodos(result)
        })
    },[])
    return (
        <div className="container">
            {todos.length===0&&<h4> NO TODOS AVAILABLE</h4>}
            
           {todos.length>0 && <div className="row">
            <h4>MY TODOS</h4>
                <table className="table table-bordered" >
                    <thead>
                        <tr>
                            <th>SNO</th>
                            <th>TASKNAME</th>
                            <th>TASKDESCRIPTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todos.map((item) => {
                            return (
                                <tr>
                                    <td>{item.sno}</td>
                                    <td>{item.taskname}</td>
                                    <td>{item.taskdescription}</td>
                                </tr>
                            )
                             } ) }
                    </tbody>
                </table>
            </div>}
        </div>
    )
}

export default DispalyToDo