import { Router } from 'express'
import { displayHome } from '../controllers/users/home.controller.js'
import { getUsers } from '../controllers/users/getUsers.controller.js'
import { getUserById } from '../controllers/users/getUserById.controller.js'
import { createUser } from '../controllers/users/createUser.controller.js'
import { updateUser } from '../controllers/users/updateUser.controller.js'
import { deleteUser } from '../controllers/users/deleteUser.controller.js'
import verifyToken from '../middlewares/verifyToken.js'
import { signIn } from '../controllers/users/signin.controller.js'

import { getCustomers } from '../controllers/customers/getCustomers.controller.js'
import { searchCustomers } from '../controllers/customers/searchCustomers.controller.js'

import { createSale } from '../controllers/sales/createSale.controller.js'
import { getSales } from '../controllers/sales/getSales.controller.js'
import { getSalesReport } from '../controllers/sales/getSalesReport.controller.js'

const router = Router() 

router.get('/', displayHome)
router.post('/signin', signIn)
router.get('/users', verifyToken, getUsers)
router.get('/users/:id', verifyToken, getUserById)
router.post('/users', verifyToken, createUser)
router.put('/users/:id', verifyToken, updateUser)
router.delete('/users/:id', verifyToken, deleteUser)
router.get('/customers', verifyToken, getCustomers)
router.get('/customers/search', verifyToken, searchCustomers)
router.post('/sales', verifyToken, createSale)
router.get('/sales', verifyToken, getSales)
router.get('/sales/report', verifyToken, getSalesReport)


export default router
