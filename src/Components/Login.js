import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Login() {
     const[email,setuseremail]=useState("")
     const [password,setuserpassword] = useState("")
     const [iserror,setiserror]=useState(false)
    const [errmsg,seterrmsg]=useState("")
    const[errors,seterrors]=useState({})
    const Navigate = useNavigate()
    const onchangeemail =(e)=>{
            setuseremail(e.target.value)
     }
    const onchangepassword =(e)=>{
                setuserpassword(e.target.value)
     }
     const valadiateloginform = ()=>{
        let errors = {}
        if(!email){
            errors.email="enter your email"
        }if(!password){
             errors.password="enter your pasword"
        } 
           return errors
     }
     const loginform =()=>{
        fetch("https://backendtaskifiy.onrender.com/auth/login", { method: "POST", headers: { "content-type": 'application/json' }, body:JSON.stringify({email,password}) } ).then((res) => {
            return res.json();
        }).then((result)=>{
            if(result.success){
                localStorage.setItem("loggedinuser",JSON.stringify({email:result.email ,userId:result.userId,role:result.role}))
                localStorage.setItem("loginuser",true)
                Navigate("/")
                
            }else{
                setiserror(true)
                seterrmsg(result.message)
                  }
        })
     }
     const login =(e)=>{
        e.preventDefault();
        let errors = valadiateloginform()
        seterrors(errors)
        if(Object.keys(errors).length===0){
                loginform()
        }else{
            return;
        }
        }

    return (

        <div className="container" style={{ width: "400px", height: "400px", borderRadius: "10%",border:"2px solid" ,marginTop:"50px",textAlign:"center"}}>
            <button style={{ width: "50px", height: "50px", borderRadius: "50%", backgroundColor: "#3cbda9",marginTop:"10px" }}><i>T</i></button>
            <form onSubmit={login}>
               <input type="email" placeholder="enter your email" style={{ width: "300px", height: "50px",margin:"20px" }} value={email} onChange={onchangeemail}></input><br/> <i style={{color:"red"}}>{errors?.email}</i>
                <input type="password" placeholder="enter your password" style={{ width: "300px", height: "50px",margin:"20px" } } value={password} onChange={onchangepassword}></input><br/><i style={{color:"red"}}>{errors?.password}</i><br/>
                <button style={{ width: "100px", height: "50px", borderRadius: "10%", backgroundColor: "#3cbda9" }}>login</button>
            </form>
            {iserror  && <div className="mt-3">
                        <i style={{color:"red"}}>{errmsg}</i> 
                   
                    </div>}
        </div>
 
    )
}

export default Login