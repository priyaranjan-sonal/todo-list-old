import React, { useEffect, useState } from 'react';
import { Plus, Trash2, LayoutList } from 'lucide-react';

const App = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [allTasks, setAllTasks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("myList")) || [];
    } catch {
      return [];
    }
  });

  const submitHandler = () => {
    const trimmedTitle = title.trim();
    if (trimmedTitle === '') {
      console.log("Error: Empty Title");
      return;
    }

    const newTask = {
      id: Date.now(),
      title: trimmedTitle,
      description: description.trim(),
      isCompleted: false
    };

    setAllTasks(prev => [...prev, newTask]);
    setTitle('');
    setDescription('');
  };

  useEffect(() => {
    localStorage.setItem("myList", JSON.stringify(allTasks));
  }, [allTasks]);

  const handleDelete = (idx) => {
    const filteredTasks = allTasks.filter((_, index) => index !== idx);
    setAllTasks(filteredTasks);
  };

  const handleComplete = (idx) => {
    const newTasks = [...allTasks];
    newTasks[idx].isCompleted = !newTasks[idx].isCompleted;
    setAllTasks(newTasks);
  };

  return (
    <div className='min-h-screen bg-slate-100 text-slate-800 font-sans selection:bg-indigo-200 flex flex-col'>
      {/* Header */}
      <header className='w-full border-b border-slate-300 bg-white sticky top-0 z-10 shadow-sm'>
        <div className='max-w-7xl mx-auto px-6 py-5 flex items-center justify-center gap-3'>
          <div className='p-2 bg-indigo-200 text-indigo-600 rounded-xl shadow-sm'>
            <LayoutList className='w-7 h-7' />
          </div>
          <h1 className='text-3xl font-extrabold tracking-tight text-slate-900'>
            Task <span className='text-indigo-600'>Master</span>
          </h1>
        </div>
      </header>

      <main className='flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 items-start'>

        {/* Form Section */}
        <section className='w-full lg:w-1/3 lg:sticky lg:top-28 shrink-0'>
          <div className='bg-white rounded-3xl p-6 sm:p-8 border border-slate-300 shadow-md relative'>
            <div className='relative'>
              <div className='mb-8 text-center sm:text-left'>
                <h2 className='text-2xl font-bold text-slate-900 mb-2'>Create Task</h2>
                <p className='text-sm text-slate-600'>What do you need to get done?</p>
              </div>

              <div className='flex flex-col gap-5'>
                <div className='space-y-4'>
                  <div>
                    <input
                      placeholder='Task title...'
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className='w-full bg-slate-50 border border-slate-300 rounded-2xl px-5 py-4 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all shadow-sm'
                    />
                  </div>

                  <div>
                    <textarea
                      placeholder='Add description (optional)...'
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={4}
                      className='w-full bg-slate-50 border border-slate-300 rounded-2xl px-5 py-4 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all resize-none shadow-sm'
                    ></textarea>
                  </div>
                </div>

                <button
                  onClick={submitHandler}
                  disabled={!title.trim()}
                  className='mt-2 w-full bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 disabled:hover:bg-indigo-500 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.98]'
                >
                  <Plus className='w-5 h-5' />
                  ADD
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Tasks Section */}
        <section className='w-full lg:w-2/3 flex flex-col gap-6'>
          <div className='bg-indigo-300 flex items-center justify-between px-5 py-5 rounded-3xl'>
            <h2 className='text-xl sm:text-2xl font-bold text-slate-900'>Recent Tasks</h2>
            {allTasks.length > 0 && (
              <span className='px-4 py-1.5 bg-indigo-50 rounded-full text-sm font-semibold text-indigo-600 border border-indigo-300 shadow-sm'>
                {allTasks.length} {allTasks.length === 1 ? 'Task' : 'Tasks'}
              </span>
            )}
          </div>

          {allTasks.length === 0 ? (
            <div className='w-full h-64 bg-slate-50 border-2 border-dashed border-indigo-200 rounded-3xl flex flex-col items-center justify-center text-slate-500 p-6 text-center shadow-sm'>
              <div className='bg-indigo-50 p-4 rounded-full mb-4 shadow-sm border border-indigo-100'>
                <LayoutList className='w-8 h-8 opacity-75 text-indigo-600' />
              </div>
              <p className='text-lg font-bold text-slate-800'>No tasks yet</p>
              <p className='text-sm mt-1 text-slate-600'>Add a task to get started on your goals.</p>
            </div>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5 pb-10'>
              {allTasks.map((elem, idx) => (
                <div
                  key={elem.id || idx}
                  className={`group relative overflow-hidden rounded-3xl border border transition-all duration-300 flex flex-col h-full bg-white
                    ${elem.isCompleted
                      ? 'border-indigo-200 bg-indigo-500/50 opacity-80'
                      : 'border-slate-300 shadow-md hover:shadow-lg hover:border-indigo-400'
                    }
                  `}
                >
                  <div className='p-6 flex-1 flex flex-col gap-3 relative z-10'>
                    <h3 className={`font-bold text-xl leading-tight break-words pt-1
                      ${elem.isCompleted ? 'line-through text-slate-500' : 'text-slate-900'}
                    `}>
                      {elem.title}
                    </h3>

                    {elem.description && (
                      <p className={`text-sm break-words leading-relaxed mt-1 font-medium
                        ${elem.isCompleted ? 'line-through text-slate-400' : 'text-slate-600'}
                      `}>
                        {elem.description}
                      </p>
                    )}
                  </div>

                  <div className='p-4 border-t border-slate-200 bg-slate-50/50 mt-auto relative z-10 flex gap-3'>
                    <button
                      onClick={() => handleComplete(idx)}
                      className={`flex-1 flex items-center justify-center py-2.5 px-4 rounded-xl font-bold border transition-all focus:ring-2 focus:outline-none shadow-sm ${elem.isCompleted
                          ? 'border-amber-500 text-amber-900 bg-amber-200 hover:bg-amber-300 focus:ring-amber-500/30'
                          : 'border-emerald-500 text-emerald-800 bg-emerald-200 hover:bg-emerald-300 focus:ring-emerald-500/30'
                        }`}
                    >
                      {elem.isCompleted ? 'Undo' : 'Done'}
                    </button>

                    <button
                      onClick={() => handleDelete(idx)}
                      className='flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl border border-rose-500 text-rose-800 bg-rose-200 hover:bg-rose-300 font-bold transition-all focus:ring-2 focus:ring-rose-500/30 focus:outline-none shadow-sm'
                    >
                      <Trash2 className='w-[18px] h-[18px]' />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default App;