"use client"
import { useState } from 'react'
import { IoMdAdd } from "react-icons/io";
import { MdDelete } from "react-icons/md";

const Todo = () => {
  const [title, setTitle] = useState("");
  const [mainTask, setMainTask] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();
    setMainTask([...mainTask, {title}])
    setTitle('');
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
        <div key={index} className='flex justify-between items-center w-[419px] mb-5 bg-[#F2F2F2] rounded-xl'>
          <h5 className='text-xl font-semibold px-3 py-2 font-fontRubik'>{item.title}</h5>
          <button onClick={() => {deleteHandler(index)}} className='bg-red-500 text-white text-xl px-4 py-4 rounded-xl rounded-l-none font-bold transition-all duration-300 ease-in-out hover:scale-110 active:scale-50'> <MdDelete/> </button>
        </div>
      );
    });
  }
  return (
    <>
      <h1 className='bg-black text-white p-5 text-5xl font-bold text-center font-fontOleo'>Todo App</h1>
      <div className='bg-gradient-to-br from-rose-300 via-purple-400 to-blue-400 bg-no-repeat h-[90vh] my-0 mx-auto pt-20'>
        <div className='bg-white w-[600px] m-auto flex flex-col gap-8 rounded-xl text-center items-center pt-8 pb-8'>
          <form onSubmit={submitHandler} className='flex items-center gap-2'>
            <input type='text' required className='text-2xl border-2 border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:border-sky-500' placeholder='Enter task' value={title} onChange={(e)=> {
              setTitle(e.target.value)
            }} />
            <button className='bg-[#8E49E7] text-white px-4 py-3 text-2xl font-bold rounded-xl transition-all duration-300 active:scale-50 hover:bg-[#cba3ff] ease-in-out hover:scale-110'> <IoMdAdd/> </button>
          </form>
          <div>
            <div>{renderTask}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Todo;