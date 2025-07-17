import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  interface Task {
    title: string;
  }

  const [taskInfo, setTaskInfo] = useState<Task[]>([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/task/").then((res) => {
      setTaskInfo(res.data);
    });
  }, []);

  return (
    <div className="App">
      {taskInfo.map((task) => (
        <div>{task.title}</div>
      ))}
      <p>Hello</p>
    </div>
  );
}

export default App;
