'use client'
import { useState, useEffect } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { MdDelete, MdEdit, MdDone, MdUndo } from 'react-icons/md';

const Todo = () => {
  const [title, setTitle] = useState('');
  const [mainTask, setMainTask] = useState(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    return savedTasks;
  });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(mainTask));
  }, [mainTask]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      // Edit existing task
      const updatedTasks = [...mainTask];
      updatedTasks[editIndex].title = title;
      setMainTask(updatedTasks);
      setEditIndex(null);
    } else {
      // Add new task
      setMainTask([...mainTask, { title, done: false }]);
    }

    setTitle('');
  };

  const editHandler = (index) => {
    const taskToEdit = mainTask[index].title;
    setTitle(taskToEdit);
    setEditIndex(index);
  };

  const deleteHandler = (index) => {
    let copytask = [...mainTask];
    copytask.splice(index, 1);
    setMainTask(copytask);
    setEditIndex(null); // Clear editIndex when deleting a task
  };

  const toggleDoneHandler = (index) => {
    const updatedTasks = [...mainTask];
    updatedTasks[index].done = !updatedTasks[index].done;
    setMainTask(updatedTasks);
  };

  let renderTask = <h2>No Tasks Available</h2>;

  if (mainTask.length > 0) {
    renderTask = mainTask.map((item, index) => {
      return (
        <div key={index} className={`flex justify-between items-center w-[419px] mb-5 bg-[#F2F2F2] rounded-xl transition-all ease-linear duration-300 hover:scale-100 cursor-pointer ${item.done ? 'opacity-50' : ''}`}>
          <button
              onClick={() => toggleDoneHandler(index)}
              className={`text-xl px-4 py-4 font-bold rounded-xl rounded-r-none transition-all duration-300 ease-in-out hover:scale-105 active:scale-50 ${item.done ? 'bg-green-500 text-white' : 'bg-gray-300'}`}
            >
              {item.done ? <MdUndo/> : <MdDone/>}
            </button>
          <h5 className={`text-xl font-semibold px-3 py-2 font-fontRubik ${item.done ? 'line-through' : ''}`}>{item.title}</h5>
          <div className='flex'>
            <button
              onClick={() => editHandler(index)}
              className='bg-blue-500 text-white text-xl px-4 py-4 rounded-xl rounded-r-none font-bold transition-all duration-300 ease-in-out hover:scale-105 active:scale-50'
            >
              <MdEdit />
            </button>
            <button
              onClick={() => deleteHandler(index)}
              className='bg-red-500 text-white text-xl px-4 py-4 rounded-xl rounded-l-none font-bold transition-all duration-300 ease-in-out hover:scale-105 active:scale-50'
            >
              <MdDelete />
            </button>
            
          </div>
        </div>
      );
    });
  }

  return (
    <>
      <h1 className='bg-black text-white text-6xl font-bold text-center font-fontOleo py-4 border-none'>Todo App</h1>
      <div className='bg-gradient-to-br from-rose-300 via-purple-400 to-blue-400 bg-no-repeat h-[90vh] my-0 mx-auto pt-20'>
        <div className='bg-white w-[600px] m-auto flex flex-col gap-8 rounded-xl text-center items-center pt-8 pb-8'>
          <form onSubmit={submitHandler} className='flex items-center gap-2'>
            <input
              type='text'
              required
              className='text-2xl border-2 border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:border-sky-500'
              placeholder='Enter task'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button
              className='bg-[#8E49E7] text-white px-4 py-3 text-2xl font-bold rounded-xl transition-all duration-300 active:scale-50  ease-in-out hover:scale-105'
              type='submit'
            >
              <IoMdAdd />
            </button>
          </form>
          <div>
            <div>{renderTask}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
