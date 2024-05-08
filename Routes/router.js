//import express
const express = require('express')

//import usercontroller
const userController = require('../Controllers/userController')
//import projeCtcontroller
const projectController = require("../Controllers/projectController")
//6.import jwtMiddleware
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
//7.import multiConfig
const multerConfig = require('../Middlewares/multerMiddleware')
//2.create  router object of express to define path
const router = express.Router()

//3.Register api call
router.post('/register',userController.register)

//4.login api call
router.post('/login',userController.login)

//5.add project api call
router.post('/project/add-project',jwtMiddleware,multerConfig.single('projectImage'),projectController.addProject)

//8.get a perticular project api call
router.get('/project/get-a-project',jwtMiddleware,projectController.getAProject)

//9.get 3 project details fot home api call
router.get('/project/home-projects',projectController.gethomeProjects)//no need to check token

//10.get all project details  api call
router.get('/project/all-projects',jwtMiddleware,projectController.getAllProjects)

//11.delete user project
router.delete('/project/delete-project/:pid',jwtMiddleware,projectController.deleteUserProject)

//12.update user project
router.put('/project/update-user-project/:pid',jwtMiddleware,multerConfig.single('projectImage'),projectController.updateUserProject)

module.exports = router