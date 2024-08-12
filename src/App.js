import logo from './logo.svg';
import './App.css';


import TaskList from './Components/TaskList';
import Loginroutes from './Components/Loginroutes';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from './Components/Navbar';
import Createtask from './Components/Createtask';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Dashboard from './Components/Dashboard';
import Profile from './Components/Profile';
import Changepassword from './Components/Changepassword';
import Mytask from './Components/Mytask';
import Users from './Components/Users';
import Adminavaliabletask from './Components/admin/Admintask';


function App() {
  return (
    <div className="container">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        integrity="sha512-Fo3rlrZj/k7ujTnHg4CGR2D7kSs0v4LLanw2qksYuRlEzO+tcaEPQogQ0KaoGN26/zrn20ImR1DfuLWnOo7aBA=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
      
      
      <BrowserRouter>
       
        <Routes>
          <Route path="login" element={<Login />}></Route>
          <Route path="signup" element={<Signup />}></Route>
          <Route element={<Loginroutes />}>
            <Route path="/" element={<Dashboard />}>
              <Route path="/" element={<TaskList />}></Route>
              <Route path='adimntasks' element={<Adminavaliabletask/>}></Route>
              <Route path="mytask" element={<Mytask />}></Route>
              <Route path="create" element={<Createtask />}></Route>
              <Route path='users' element={<Users/>}></Route>
              <Route path='profile' element={<Profile/>}></Route>
              <Route path='changepassword' element={<Changepassword/>}></Route>
            </Route>
          </Route>


        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
