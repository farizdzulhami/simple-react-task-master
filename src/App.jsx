import { useState, useEffect } from 'react'

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, { id: Date.now(), text: input, completed: false }]);
      setInput('');
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') addTask();
  };

  return (
    <div className="glass-card">
      <h1>Task Master</h1>
      <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Organize your productivity with style</p>
      
      <div className="input-group">
        <input 
          type="text" 
          placeholder="What needs to be done?" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className="primary" onClick={addTask}>
          Add Task
        </button>
      </div>

      <div className="task-list">
        {tasks.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
            No tasks yet. Start by adding one above!
          </div>
        ) : (
          tasks.map(task => (
            <div key={task.id} className="task-item">
              <div className="task-content">
                <div 
                  className={`checkbox ${task.completed ? 'checked' : ''}`}
                  onClick={() => toggleTask(task.id)}
                >
                  {task.completed && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  )}
                </div>
                <span className={`task-text ${task.completed ? 'completed' : ''}`}>
                  {task.text}
                </span>
              </div>
              <button className="delete-btn" onClick={() => deleteTask(task.id)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6h18"></path>
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                </svg>
              </button>
            </div>
          ))
        )}
      </div>

      <div style={{ marginTop: '2rem', fontSize: '0.9rem', color: '#64748b' }}>
        {tasks.filter(t => !t.completed).length} tasks remaining
      </div>
    </div>
  )
}

export default App
