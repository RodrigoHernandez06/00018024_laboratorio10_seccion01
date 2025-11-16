// routes/user.routes.js
import { Router } from 'express'
import { displayHome } from '../controllers/home.controller.js'
import { getUsers } from '../controllers/getUsers.controller.js'
import { getUserById } from '../controllers/getUserById.controller.js'
import { createUser } from '../controllers/createUser.controller.js'
import { updateUser } from '../controllers/updateUser.controller.js'
import { deleteUser } from '../controllers/deleteUser.controller.js'
import verifyToken from '../middlewares/verifyToken.js'
import { signIn } from '../controllers/signin.controller.js'

const router = Router()

router.get('/', displayHome)
router.post('/signin', signIn)
router.get('/users', verifyToken, getUsers)
router.get('/users/:id', verifyToken, getUserById)
router.post('/users', verifyToken, createUser)
router.put('/users/:id', verifyToken, updateUser)
router.delete('/users/:id', verifyToken, deleteUser)


export default router
