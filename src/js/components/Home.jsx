import React, { useState, useEffect } from "react";
//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
  const [choresArray, setChoresArray] = useState([])

  const deleteToDo = (itemToDelete) => {
    const result = choresArray.filter((item) => item != itemToDelete);
    setChoresArray(result);
  };
  	const toDoUrl= "https://playground.4geeks.com/todo/users/shaelyn26"
	const getToDos = () => {
		fetch(toDoUrl)
		.then((resp)=> resp.json())
		.then((data)=> setChoresArray(data.todos)) 
	}
	useEffect(()=> {
		if (choresArray.length == 0){
			getToDos()

		}
	},[])
			
  return (
    <div className="container">
      <div className="title">
        <h1>My To-Do List</h1>
      </div>
      <ul>
        {
		choresArray.length > 0 ? 
		choresArray.map((item) => {
			return (
			  <div className="list d-flex">
				{item.label}
				<span className="delete-btn mx-2" onClick={() => deleteToDo(item)} onMouseOver={(e) => e.target.choresArray = "hover"}>
				  x
				</span>
			  </div>
			);
		  })
		: "there is no todos"
		}
      </ul>
      <input
      type="text"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
          const newChoreArray = [...choresArray,e.target.value]
            setChoresArray(newChoreArray)
          }
        }}
      />
    </div>
  );
};

export default Home;
