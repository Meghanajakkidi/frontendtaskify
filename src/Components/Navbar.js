
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

function Navbar() {
    const Navigate = useNavigate()
    const [user,setuser]=useState("")
    const [istoggle,setistoggle] = useState(false)
    const getuserinfo= async()=>{
        const userinfo = await localStorage.getItem("loggedinuser") && JSON.parse(localStorage.getItem("loggedinuser"))
        setuser(userinfo)
    }

    useEffect(()=>{
        getuserinfo();
    })
    const Logout = async () => {

        await localStorage.clear();
        Navigate("login")
    }
    const dropdowntoggle =()=>{
        setistoggle(!istoggle)
    }
    return (
        <div>
            <nav className="navbar navbar-expand" style={{ backgroundColor: "#3cbda9", height: "80px" }}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/" >Taskify</Link>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item" style={{ marginTop: "10px" }}>
                                <Link to="/" className="nav-link active" aria-current="page" >TaskList</Link>
                            </li>
                           {user?.role!=="admin"  && <li className="nav-item" style={{ marginTop: "10px" }}>
                                <Link to="mytask" className="nav-link active" aria-current="page" >Mytask</Link>
                            </li>}
                           {user?.role==="admin" &&<li className="nav-item" style={{ marginTop: "10px" }} >
                                <Link className="nav-link" to="create" >Createtask</Link>
                            </li>}
                            {user?.role==="admin" &&<li className="nav-item" style={{ marginTop: "10px" }} >
                                <Link className="nav-link" to="users" >Users</Link>
                            </li>}
                            
                            <li class="nav-item dropdown">
                                <Link class="nav-link dropdown-toggle"  role="button" data-bs-toggle="dropdown"  style={{marginLeft:"auto"}}  onClick={()=>dropdowntoggle()}>
                                    <div style={{width:"50px",height:"50px",borderRadius:"50%",backgroundColor:"lightgrey",}}></div>
                                </Link>
                                <ul class="dropdown-menu" typeof="none" style={{}}>
                                   <li><Link className="dropdown-item"  onClick={() => Logout()}>Logout</Link></li>
                                    <li><Link  className="dropdown-item" to="changepassword">change password </Link></li> 
                                    <li><Link className="dropdown-item" to="profile">profile</Link></li>
                                </ul>
                            </li>

                        </ul>

                    </div>
                </div>
            </nav >

        </div >
    )
}

export default Navbar