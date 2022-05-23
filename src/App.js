import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const[user,setUser]= useState([]);
  const[status,setStatus] = useState("online");
  useEffect(
    () => {
      fetch(
        "https://jsonplaceholder.typicode.com/users")
                  .then((res) => res.json())
                  .then((res) => {
                    setUser(res);
                    localStorage.setItem("user",JSON.stringify(res));
                  }).catch(
                    err=>{
                      let userData = localStorage.getItem("user")
                      setUser(JSON.parse(userData));
                      setStatus("offline")
                    }
                  )
    },[])
 console.log(user,"user")
  return (
    <div className="App">
    {(status !== "online")?<h2>
you are in offline mode
    </h2>:null}
    <header className="App-header">
        <h2>User List</h2>
        <table>
  <thead>
    <tr>
    <th>id</th>
    <th>Name</th>
    <th>Email</th>
    </tr>
  </thead>
  <tbody>
  {user && user?.map((item, index) => (
    <tr key={item.id}>
    <td>{item.id}</td>
    <td>{item.name}</td>
    <td>{item.email}</td>
  </tr>
  ))}
  </tbody>
  
</table>

   
      
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      
    </div>
  );
}

export default App;
