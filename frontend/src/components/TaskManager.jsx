"use client"
import { useEffect, useState } from "react"
import axios from "axios"

const API_BASE = "http://localhost:5000/tasks"

export default function TaskManager() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
  })

  const fetchTasks = async () => {
    setLoading(true)
    try {
      const response = await axios.get(API_BASE)
      setTasks(response.data)
    } catch (error) {
      console.error("Error fetching tasks", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewTask((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAddTask = async () => {
    if (!newTask.title.trim() || !newTask.description.trim()) return
    try {
      await axios.post(API_BASE, newTask)
      setNewTask({ title: "", description: "" })
      fetchTasks()
    } catch (error) {
      console.error("Error adding task", error)
    }
  }

  const handleMarkDone = async (taskId) => {
    try {
      await axios.put(`${API_BASE}/${taskId}/complete`)
      fetchTasks()
    } catch (error) {
      console.error("Error marking task as done", error)
    }
  }

  const displayTasks = tasks.slice(0, 5)

  return (
    <div className="w-full h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full h-full bg-gray-50 rounded-2xl flex shadow-2xl overflow-hidden">
        {/* Left Panel */}
        <div className="w-1/2 border-r-[5px] border-gray-200 px-40 flex flex-col my-16 bg-gray-50 ">
          <h2 className="text-xl font-bold mb-8 text-gray-800">Add a Task</h2>

          <div className="mb-6">
            <input
              name="title"
              value={newTask.title}
              onChange={handleInputChange}
              type="text"
              placeholder="Title"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-black font-bold"
            />
          </div>

          <div className="mb-8">
            <textarea
              name="description"
              value={newTask.description}
              onChange={handleInputChange}
              placeholder="Description"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-inner resize-none h-32 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-black font-bold"
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleAddTask}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-14 rounded-lg transition-transform duration-200 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              Add
            </button>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-1/2 px-36 py-20 flex flex-col bg-gray-50 shadow-inner">
          <div className="space-y-6 flex-1">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">Loading tasks...</p>
              </div>
            ) : displayTasks.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">No tasks found</p>
              </div>
            ) : (
              displayTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-gray-300 px-6 py-4 rounded-xl flex items-center justify-between min-h-[140px] shadow-lg hover:shadow-2xl transform transition-transform duration-200 hover:-translate-y-1"
                >
                  <div className="flex-1 pr-4">
                    <h3 className="font-bold text-gray-900 text-3xl mb-4">{task.title}</h3>
                    <p className="text-lg font-bold text-gray-700 leading-relaxed">{task.description}</p>
                  </div>
                  <button
                    onClick={() => handleMarkDone(task.id)}
                    className="border border-black text-gray-700 text-sm font-medium px-10 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex-shrink-0 mt-10 shadow-md hover:shadow-lg"
                  >
                    Done
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
