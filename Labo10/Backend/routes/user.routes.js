import { Router } from 'express'
import { displayHome } from '../controllers/users/home.controller.js'
import { getUsers } from '../controllers/users/getUsers.controller.js'
import { getUserById } from '../controllers/users/getUserById.controller.js'
import { createUser } from '../controllers/users/createUser.controller.js'
import { updateUser } from '../controllers/users/updateUser.controller.js'
import { deleteUser } from '../controllers/users/deleteUser.controller.js'
import verifyToken from '../middlewares/verifyToken.js'
import { signIn } from '../controllers/users/signin.controller.js'

const router = Router() 

router.get('/', displayHome)
router.post('/signin', signIn)
router.get('/users', verifyToken, getUsers)
router.get('/users/:id', verifyToken, getUserById)
router.post('/users', verifyToken, createUser)
router.put('/users/:id', verifyToken, updateUser)
router.delete('/users/:id', verifyToken, deleteUser)


export default router
