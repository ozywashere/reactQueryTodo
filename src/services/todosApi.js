import axios from 'axios'

const todosApi = axios.create({
  baseURL: 'http://localhost:8000',
})

export const getTodos = async () => {
  const response = await todosApi.get('/todos')
  return response.data
}

export const addTodo = async (todo) => {
  const response = await todosApi.post('/todos', todo)
  return response.data
}

export const updateTodo = async (todo) => {
  const response = await todosApi.patch(`/todos/${todo.id}`, todo)
  return response.data
}

export const deleteTodo = async ({ id }) => {
  const response = await todosApi.delete(`/todos/${id}`, id)
  return response.data
}

export default todosApi
