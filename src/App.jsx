import React, { useEffect, useState } from 'react'
import { Ellipsis } from 'lucide-react'
import Details from './Details'

const App = () => {

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [allTasks, setAllTasks] = useState(JSON.parse(localStorage.getItem("myList")) || [])

  const submitHandler = () => {
    const addNewTask = [...allTasks]
    if (title.trim() == '') {
      console.log("Error: Empty Title");
    } else {
      const newTask = {
        id: Date.now(),
        title: title.trim(),
        description: description.trim(),
        isCompleted: false
      }
      addNewTask.push(newTask)
      setAllTasks(addNewTask)

      setTitle('')
      setDescription('')
    }
  }

  useEffect(() => {
    localStorage.setItem("myList", JSON.stringify(allTasks))
  }, [allTasks])

  const handleDelete = (idx) => {
    const filteredTasks = allTasks.filter((e, index) => index !== idx)
    setAllTasks(filteredTasks)
  }

  const handleComplete = (idx) => {
    const filteredTasks = [...allTasks]
    filteredTasks[idx].isCompleted = !filteredTasks[idx].isCompleted
    setAllTasks(filteredTasks)
  }

  return (
    <>
      <div className='bg-gray-900 text-white p-6 sm:px-8 lg:px-10 py-6 sm:py-7 min-h-screen w-full font-sans flex flex-col gap-4'>

        <h1 className='py-4 text-3xl sm:text-4xl lg:text-5xl text-center bg-gray-950 rounded-xl font-bold border-b border-gray-600'>
          Todo
        </h1>

        <div className='flex flex-col gap-4 lg:flex-row lg:gap-4 min-h-125'>

          {/* Form */}
          <div className='p-5 bg-gray-950 w-full rounded-xl flex flex-col gap-5 border border-gray-600 shrink-0 lg:w-1/3'>
            <h1 className='text-xl sm:text-2xl font-bold text-center'>Create New Todo Task</h1>

            <div className='flex flex-col gap-4'>
              <input
                placeholder='Enter Task Title...'
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className='px-3 lg:px-4 py-3 w-full rounded bg-gray-800 outline-none'
              />

              <textarea
                placeholder='Enter description...'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className='px-3 lg:px-4 py-3 w-full rounded bg-gray-800 resize-none outline-none'
              ></textarea>

              <button
                onClick={submitHandler}
                className='bg-rose-500 rounded px-6 py-3 w-full font-bold hover:bg-rose-700 transition'
              >
                ADD
              </button>
            </div>
          </div>

          {/* Tasks */}
          <div className='p-5 bg-gray-950 rounded-xl flex flex-col gap-5 border border-gray-600 h-180  md:h-180 lg:h-140 w-full lg:w-2/3'>
            <h1 className='text-xl sm:text-2xl font-bold text-center'>Recent Tasks</h1>

            <div className='w-full flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 overflow-y-auto items-start pr-2'>

              {allTasks.map(function (elem, idx) {
                return (
                  <div key={idx} className={`${elem.isCompleted ? 'bg-gray-950' : 'bg-gray-900'}  w-full min-h-56 border rounded-xl flex flex-col justify-between`}>

                    <div className='w-full flex flex-col p-3 gap-5'>
                      <div className='w-full flex'>
                        <h3 className={`bg-amber-600 text-xl w-8/9 wrap-break-word leading-tight ${elem.isCompleted ? 'line-through opacity-60' : ''}`}>
                          {elem.title}
                        </h3>
                        <Ellipsis className='hover:bg-black p-1  h-full rounded w-1/9' />
                      </div>
                      <h3 className={`text-gray-400 text-sm w-full wrap-break-word leading-tight ${elem.isCompleted ? 'line-through opacity-60' : ''}`}>
                        {elem.description}
                      </h3>
                    </div>

                    <div className='w-full flex flex-col sm:flex-row items-end p-2 gap-2'>
                      <button
                        onClick={() => handleComplete(idx)}
                        className={`${elem.isCompleted ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-green-600 hover:bg-green-700'} rounded-xl py-2 w-full sm:w-1/2 font-semibold`}
                      >
                        {elem.isCompleted ? 'Undo' : 'Done'}
                      </button>

                      <button
                        onClick={() => handleDelete(idx)}
                        className='bg-rose-600 hover:bg-rose-700 rounded-xl py-2 w-full sm:w-1/2 font-semibold'
                      >
                        Delete
                      </button>
                    </div>

                  </div>
                )
              })}

            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default App