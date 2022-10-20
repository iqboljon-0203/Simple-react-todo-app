import 'bootstrap/dist/css/bootstrap.min.css'
import './App.scss';
import React from 'react';
import { useState } from 'react';
//Components
function App() {
const [todos,setTodos]=useState(JSON.parse(window.localStorage.getItem('todos')) || []);
const handleAddToDo = (evt)=>{
	if(evt.keyCode===13 && evt.target.value.trim().length>2){
		const newToDo={
			id:todos.at(-1) ? todos.at(-1).id+1:1,
			value:evt.target.value,
			isCompeleted:false
		}
		setTodos([...todos,newToDo])
		window.localStorage.setItem('todos',JSON.stringify([...todos,newToDo]));
		evt.target.value = null;
	}
};
const handleDeleteToDo = (evt) => {
	const filtered=todos.filter((item) => item.id !== evt.target.dataset.todoid-0)
	setTodos(
			filtered
		);
		window.localStorage.setItem(
			'todos',
			JSON.stringify(
				filtered
			)
	);
};
const handleCompletedToDo= (evt)=>{
		const complatedTodos = todos.map((todo) => {
			if(todo.id===evt.target.dataset.todoid-0){
				todo.isCompeleted = evt.target.checked;
			}
			return todo
		});
		setTodos(complatedTodos)
		window.localStorage.setItem("todos",JSON.stringify(todos))
}
	return (
    <>
	<h1 className='title'>TODO</h1>
	<div className="todo">
		<div className="wrapper">
			<input onKeyUp={handleAddToDo} className='todo_input' type="text" placeholder='Create a new todo...' />
			<button className='todo_button'>
				Add
			</button>
		</div>
		{
		todos.length>0 && (
		<ul className='todo_list'>
			{
				todos.map((todo)=>(
					<li key={todo.id} className="todo_item">
						<input data-todoid={todo.id} onChange={handleCompletedToDo}
						defaultChecked={todo.isCompeleted}
						className='check' type="checkbox" />
						<p className={`${todo.isCompeleted && "completed"} todo_name`}>{todo.value}{' '} </p>
						<button data-todoid={todo.id} onClick={handleDeleteToDo} className='delete_button'>X</button>
					</li>
				))
			}
		</ul>
			)
		}
		
	</div>
    </>
  );

}
export default App;
