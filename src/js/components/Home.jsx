import React, { useState, useEffect } from "react";
//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
  const [choresArray, setChoresArray] = useState([]);

  // const deleteToDo = (itemToDelete) => {
  //   const result = choresArray.filter((item) => item != itemToDelete);
  //   setChoresArray(result);
  // };
  // const toDoUrl= "https://playground.4geeks.com/todo/users/shaelyn26"

  const toDoUrl = "https://playground.4geeks.com/todo/";

  const getToDos = async() => {
    const response = await fetch(toDoUrl + "users/shaelyn26")
      // .then((resp) => resp.json())
      // .then((data) => ;
        const data = await response.json()
        setChoresArray(data.todos)
        console.log("store info ",data.todos)
        return data
  };

  const addToDo = async(input) => {
    const choices = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(input)
    }
    const response = await fetch(toDoUrl + "todos/shaelyn26", choices)
    // .then((resp)=> resp.json())
    
    // .then((data) => console.log(data, "item added"))
    const data = await response.json()
    getToDos()
    return data
  }

  const deleteToDo = async(list)=> {
    const tasks = {
      method: "DELETE",
      headers: {
        "Content-type": "application/json"
      },
    
    }
    console.log(list)
    const response = await fetch(toDoUrl + `todos/${list.id}`, tasks)
    // .then((resp) => resp.json())

    // .then((data) => console.log(data, "this item was deleted"))
    // .then(getToDos())
    const data = await response.json
    getToDos()
    return data
  }




  // .catch(error => {console.log(error,"there was an error");
  // });
    

  useEffect(() => {
    if (choresArray.length == 0) {
      getToDos();
    }
  }, []);

  return (
    <div className="container">
      <div className="title">
        <h1>My To-Do List</h1>
      </div>
      <ul>
        {choresArray.length > 0
          ? choresArray.map((item) => {
              return (
                <div className="list d-flex" key={item.id}>
                  {item.label}
                  <span
                    className="delete-btn mx-2"
                    onClick={() => deleteToDo(item)}
                    onMouseOver={(e) => (e.target.choresArray = "hover")}
                  >
                    x
                  </span>
                </div>
              );
            })
          : "there is no todos"}
      </ul>
      <input
        type="text"
        onKeyDown={(e) => {
          if (e.key === "Enter") { 
            const toDoObject = {
              "label": e.target.value,
              "is_done": true
            }
            addToDo(toDoObject)
            const newChoreArray = [...choresArray, toDoObject];
            setChoresArray(newChoreArray);
          }
        }}
      />
      {/* GET THE ID TO DELETE THE TO DO ( TRY ON POSTMAN FIRST) <--- HOME WORK !! */}
    </div>
  );
};

export default Home;
