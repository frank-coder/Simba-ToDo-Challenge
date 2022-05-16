const Task = require('../models/tasks')
const { CustomAPIError,BadRequestError,NotFoundError } = require('../errors/custom-error')


const getAllTasks = async (req, res) => {
  const tasks = await Task.find({})
  res.status(200).json({ tasks })
}

const createTask = async (req, res) => {
  const task = await Task.create(req.body)
  res.status(201).json({ task })
}

const getTask = async (req, res) => {
  const { id: taskID } = req.params
  const task = await Task.findOne({ _id: taskID })
  console.log(task)
  if (!task) {
    throw NotFoundError(`No task with id : ${taskID}`)
  }

  res.status(200).json({ task })
}

const deleteTask = async (req, res, next) => {
  const { id: taskID } = req.params
  const task = await Task.findOneAndDelete({ _id: taskID })
  if (!task) {
    throw NotFoundError(`No task with id : ${taskID}`)
  }
  res.status(200).json({ task })
}

const updateTask = async (req, res, next) => {
  const { id: taskID } = req.params

  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  })

  if (!task) {
    throw NotFoundError(`No task with id : ${taskID}`)
  }

  res.status(200).json({ task })
}

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask
}
