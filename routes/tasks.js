const express = require("express")
const router = express.Router()
const {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
} = require('../controllers/task')



router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)
router.route('/').get(getAllTasks).post(createTask)


module.exports = router