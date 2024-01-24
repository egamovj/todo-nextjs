"use client"
import { useState } from 'react'

const Todo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mainTask, setMainTask] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();
    setMainTask([...mainTask, {title, description}])
    setTitle('');
    setDescription('');
    console.log(mainTask);
  };

  const deleteHandler = (index) => {
    let copytask = [...mainTask]
    copytask.splice(index, 1);
    setMainTask(copytask);
  }

  let renderTask = <h2>No Tasks Available</h2>;

  if (mainTask.length > 0) {
    renderTask = mainTask.map((item,index) => {
      return ( 
        <li key={index} className='flex items-center justify-between mb-8'>
          <div className='flex items-center justify-between w-2/3' >
            <h5 className='text-2xl font-semibold'>{item.title}</h5>
            <h6 className='text-lg font-semibold'> {item.description} </h6>
          </div>
          <button onClick={() => {deleteHandler(index)}} className='bg-red-500 text-white px-4 py-2 rounded font-bold'>Delete</button>
        </li> 
      );
    });
  }
  return (
    <>
      <h1 className='bg-black text-white p-5 text-5xl font-bold text-center'>ToDo</h1>
      <form onSubmit={submitHandler}>
        <input type='text' className='text-2xl border-zinc-800 border-4 m-8 px-4 py-2' placeholder='Enter task' value={title} onChange={(e)=> {
          setTitle(e.target.value)
        }} />
        <input type='text' className='text-2xl border-zinc-800 border-4 m-8 px-4 py-2' placeholder='Enter description' value={description} onChange={(e)=>{
          setDescription(e.target.value)
        }} />
        <button className='bg-black text-white px-4 py-3 text-2xl font-bold rounded m-5'>Add task</button>
      </form>
      <hr/>
      <div className='p-8 bg-slate-200'>
        <ul>{renderTask}</ul>
      </div>
    </>
  )
}

export default Todo;