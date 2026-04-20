import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [category, setCategory] = useState("health");
  const [filter, setFilter] = useState("all");

  const API = "https://todo-app-backend-7vbg.onrender.com";

  const categories = ["all", "health", "shopping", "finance", "work", "study", "others"];

  // FETCH TASKS
  const fetchTasks = async () => {
    const res = await axios.get(`${API}/tasks`);
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ADD TASK
  const addTask = async () => {
    if (!text) return;

    await axios.post(`${API}/tasks`, {
      text,
      category
    });

    setText("");
    fetchTasks();
  };

  // DELETE TASK
  const deleteTask = async (id) => {
    await axios.delete(`${API}/tasks/${id}`);
    fetchTasks();
  };

  // MARK COMPLETE
  const completeTask = async (id) => {
    await axios.put(`${API}/tasks/${id}`);
    fetchTasks();
  };

  // FILTER
  const filteredTasks =
    filter === "all"
      ? tasks
      : tasks.filter((t) => t.category === filter);

  return (
    <div
      style={{
        backgroundColor: "#0f0f0f",
        minHeight: "100vh",
        padding: "20px",
        color: "white",
        fontFamily: "Arial"
      }}
    >
      <h2>📝  Todo App</h2>

      {/* INPUT */}
      <input
        placeholder="Enter task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          padding: "10px",
          marginRight: "10px",
          backgroundColor: "#1e1e1e",
          color: "white",
          border: "1px solid #333"
        }}
      />

      {/* CATEGORY */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{
          padding: "10px",
          backgroundColor: "#1e1e1e",
          color: "white",
          border: "1px solid #333"
        }}
      >
        <option value="health">Health</option>
        <option value="shopping">Shopping</option>
        <option value="finance">Finance</option>
        <option value="work">Work</option>
        <option value="study">Study</option>
        <option value="others">Others</option>
      </select>

      <button onClick={addTask} style={{ marginLeft: "10px", padding: "10px" }}>
        Add Task
      </button>

      {/* FILTER */}
      <div style={{ marginTop: "20px" }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              marginRight: "10px",
              padding: "6px 10px",
              backgroundColor: filter === cat ? "white" : "#1e1e1e",
              color: filter === cat ? "black" : "white",
              border: "1px solid #333"
            }}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* TASK LIST */}
      <div style={{ marginTop: "20px" }}>
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            style={{
              padding: "12px",
              margin: "10px 0",
              border: "1px solid #333",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#1a1a1a"
            }}
          >
            {/* TASK TEXT */}
            <div>
              <div
                style={{
                  color: task.completed ? "gray" : "white",
                  textDecoration: task.completed ? "line-through" : "none"
                }}
              >
                {task.text}
              </div>

              <div style={{ fontSize: "12px", color: "#aaa" }}>
                {task.category}
              </div>
            </div>

            {/* BUTTONS */}
            <div style={{ display: "flex", gap: "10px" }}>

              {/* COMPLETE BUTTON */}
              <button
                onClick={() => completeTask(task.id)}
                style={{
                  backgroundColor: task.completed ? "green" : "#333",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  cursor: "pointer"
                }}
              >
                {task.completed ? "Done ✔" : "Complete"}
              </button>

              {/* DELETE BUTTON */}
              <button
                onClick={() => deleteTask(task.id)}
                style={{
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  cursor: "pointer"
                }}
              >
                Delete
              </button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;