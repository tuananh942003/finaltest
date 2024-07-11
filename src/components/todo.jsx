import './Todo.css'
import { useState,useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';
const Todo = () => {

    const [topo,setTopo] = useState("Active")

    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
  

    useEffect(() => {
        const storedTask = JSON.parse(localStorage.getItem('tasks'));
        if (storedTask) {
            setTasks(storedTask);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const handleInputChange = (event) => {
      setNewTask(event.target.value);
    };


  // hàm trim là xoá khoảng trắng ở đầu và cuối chuỗi
    const handleAddTask = () => {
      if (newTask.trim() !== '') {
        setTasks([...tasks, { title: newTask, completed: false }]);
        setNewTask('');
      }
    };

    const taskCompletion = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].completed = !updatedTasks[index].completed;
        setTasks(updatedTasks);
    };
    
    const handleDeleteTask = (taskToDelete) => {
        const updatedTasks = tasks.filter(task => task !== taskToDelete);
        setTasks(updatedTasks);
    };
  
    const handleDeleteAllTasks = () => {
        setTasks([]);
    };

    return (
        <>
            <div className='navbar'>
                <ul className='navbar-topo'>
                    <li onClick={() => setTopo("All")} className={topo==="All"?"actives":""}>All</li>
                    <li onClick={() => setTopo("Active")}  className={topo==="Active"?"active":""}>Active</li>
                    <li onClick={() => setTopo("Compeleted")}  className={topo==="Compeleted"?"active":""}>Compeleted</li>
                </ul>
                <div className='narbar-bottom'></div>
                <div className='navbar-input'>
                    <input
                        type="text" 
                        placeholder='add details'
                        value={newTask}
                        onChange={handleInputChange} 
                    />
                    <button  onClick={handleAddTask}>Add</button>
                </div>

                <div className="task-list">
                    <ul>
                        {tasks.map((task, index) => (
                              <li key={index} className="task-item">
                                <input 
                                    type="checkbox"
                                    className='items-input' 
                                    checked={task.completed}
                                    onChange={() => taskCompletion(index)}
                                />
                                <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.title}</span>
                                {task.completed && (
                                    <FontAwesomeIcon 
                                        icon={faTrashAlt} 
                                        className='icon' 
                                        onClick={() => handleDeleteTask(task)}
                                    />
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
                {tasks.length > 0 && (
                    <button onClick={handleDeleteAllTasks} className='delete-all'>
                        <span style={{marginRight: "6px"}}><FontAwesomeIcon icon={faTrashAlt}/></span>    
                        Delete All
                    </button>
                )}
            </div>  
        </>
    )
}

export default Todo;