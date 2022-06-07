import React, { useEffect, useState } from "react";

import axios from "axios";

export default function CreateTask() {
  const [user, setUser] = useState({
    owner: "1",
    task_name: "",
    description: "",
  });
  const { task_name, description } = user;
  const LocData = localStorage.getItem("userData");
  const handlInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const submitData = async (e) => {
    e.preventDefault();
    var FormData = require("form-data");
    var data = new FormData();
    data.append("owner", "1");
    data.append("description", description);
    data.append("task_name", task_name);
    let userListData = [];
    var config = {
      method: "post",
      url: "http://127.0.0.1:8000/tasks",
      headers: {},
      data: data,
    };
    axios(config)
      .then(function (response) {
        //list api call
        window.location.reload(true);
      })
      .catch((error) => {
        let userList = localStorage.getItem("user");
        if (userList) {
          userListData = JSON.parse(userList);
        }
        localStorage.setItem("userData", JSON.stringify(user));
        let SingleUser = localStorage.getItem("userData");
        const singleUserData = JSON.parse(SingleUser);
        userListData.push(singleUserData);
        localStorage.setItem("user", JSON.stringify(userListData));
        window.location.reload(true);
      });
  };

  const dataLocAdd = localStorage.getItem("userData");
// console.log(dataLocAdd,"dataLocAdd")
  useEffect(() => {
    if(dataLocAdd){
      const userListData2 = JSON.parse(dataLocAdd);
      // console.log(userListData2.description,"--------- userListData2")
      var FormData = require("form-data");
      var dataLoc = new FormData();
      dataLoc.append("owner", 1);
      dataLoc.append("description", userListData2.description);
      dataLoc.append("task_name", userListData2.task_name);
      var config = {
        method: "post",
        url: "http://127.0.0.1:8000/tasks",
        headers: {},
        data: dataLoc,
      };
      axios(config)
        .then(function (response) {
          // window.location.reload(true);
          console.log(response,"api for add local call successfully")

          localStorage.clear("userData")

        })
        .catch((error) => {
          console.log(error,"api for add local call failed")
        })
    }
  }, [dataLocAdd]);

  return (
    <div className="container">
      <h5> Create New Task</h5>
      <div className="w-75 mx-auto shadow p-5">
        <form onSubmit={submitData}>
          <div className="form-group">
            <input
              className="form-control form-control-lg"
              name="task_name"
              value={task_name}
              onChange={(e) => handlInput(e)}
              placeholder="Task"
            />
          </div>

          <div className="form-group">
            <input
              className="form-control form-control-lg"
              name="description"
              value={description}
              placeholder="description"
              onChange={(e) => handlInput(e)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Add Task
          </button>
         
        </form>
        <img src="https://www.gstatic.com/webp/gallery3/1.png"
      alt="rose"/>
      {/* <img src="https://www.gstatic.com/webp/gallery3/1.png"
      alt="new"/> */}
      </div>
    </div>
  );
}
