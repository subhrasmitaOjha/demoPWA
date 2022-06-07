
import "./App.css";
import { useEffect, useState } from "react";

import axios from "axios";
import CreateTask from "./pages/CreateTask";
// import logo from './logo.svg';
// import logopwa from './pwa.jpeg';

function App() {
  const [user1, setUser1] = useState([]);
  const [status, setStatus] = useState("online");

  useEffect(() => {
    var config = {
      method: "get",
      url: "http://127.0.0.1:8000/tasks",
      headers: {},
    };

    axios(config)
      .then(function (response) {
        const dataRes = JSON.stringify(response?.data?.data);
        // console.log(dataRes,"----------> user");
         setUser1( JSON.parse(dataRes));
        localStorage.setItem("user", dataRes);
      })
      .catch(function (error) {
        let userData = localStorage.getItem("user")
            setUser1(JSON.parse(userData));
            setStatus("offline")
      });
  },
  []
);
console.log(user1,"=========user1")
  return (
    <div className="App">
      {status !== "online" ? <h2>you are in offline mode</h2> : null}
    <CreateTask />
      <header className="App-header">
        <h2>Task List</h2>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>Task</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {(user1?.length >= 1) &&
              user1?.map((item,index) => (
                <tr key={(item?.id)?(item.id):index}>
                  <td>{(item?.id)?(item.id):index}</td>
                  <td>{item?.task_name}</td>
                  <td>{item?.description}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </header>
      {/* <img src={logopwa} className="App-logo" alt="logo" /> */}
    </div>
  );
}

export default App;
