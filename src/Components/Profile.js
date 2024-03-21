import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom"
function Profile() {
    const [user,setuser]=useState(null)
    const Navigate = useNavigate()
    const Logout = async () => {

        await localStorage.clear();
        Navigate("/login")
    }

    useEffect(()=>{
        let user = localStorage.getItem("loggedinuser") && JSON.parse(localStorage.getItem("loggedinuser"))
        if(user){
            fetch("http://localhost:7000/auth/profile/"+user.email).then((res)=>{
          return res.json()
        }).then((data)=>{
            setuser(data);
        })
        }
        
    },[])
    return (
        <div className="row">
            <div className="col-md-6">
                <div className="card text-center">
                    <div className="card-header">
                        my Profile
                    </div>
                   {user &&<div className="card-body">
                        <h5 className="card-title">{user.fullname}</h5>
                        <p className="card-text">{user.email}</p>
                        <Link className="btn btn-primary" onClick={() => Logout()}>Logout</Link>
                    </div>}
                    
                </div>
            </div>
        </div>
    )
}

export default Profile