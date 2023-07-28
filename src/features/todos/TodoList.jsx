import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getTodos, addTodo, updateTodo, deleteTodo } from '../../services/todosApi'
import { useState } from 'react'
import { MdOutlineRestoreFromTrash, MdFileUpload } from 'react-icons/md'
function TodoList() {
  const [newTodo, setNewTodo] = useState('')

  const queryClient = useQueryClient()

  const {
    isLoading,
    isError,
    error,
    data: todos,
  } = useQuery({ queryKey: ['todos'], queryFn: getTodos, select: (data) => data.sort((a, b) => b.id - a.id) })

  console.log(todos)
  const addTodoMutation = useMutation(addTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos')
    },
  })

  const updateTodoMutation = useMutation(updateTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos')
    },
  })

  const deleteTodoMutation = useMutation(deleteTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos')
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newTodo) return
    addTodoMutation.mutate({ userId: 1, todo: newTodo })
    setNewTodo('')
  }
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>{error.message}</div>
  return (
    <div className='todos'>
      <div className='container'>
        {/* Add Todo */}
        <form onSubmit={handleSubmit} className='form'>
          <div className='form-control'>
            <input type='text' value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
            <button type='submit' className='btn btn-submit'>
              <MdFileUpload />
            </button>
          </div>
        </form>

        {/* Todo List */}

        <ul className='todo-list'>
          {todos.map((todo) => (
            <li key={todo.id}>
              <div className='todo-item'>
                <input
                  type='checkbox'
                  checked={todo.completed}
                  onChange={() => updateTodoMutation.mutate({ ...todo, completed: !todo.completed })}
                />

                <h3
                  onDoubleClick={() => updateTodoMutation.mutate({ ...todo, completed: !todo.completed })}
                  className='todo-item__title subtitle-lg'
                  style={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                  }}
                >
                  {todo.todo}
                </h3>
                <div className='todo-item__actions'>
                  <button disabled={!todo.completed} onClick={() => deleteTodoMutation.mutate({ id: todo.id })}>
                    <MdOutlineRestoreFromTrash size={32} />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default TodoList
