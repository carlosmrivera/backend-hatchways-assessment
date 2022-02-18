import { Router } from 'express'
import PostsController from '../controllers/Posts.js'

const router = Router()

router.get('/', PostsController.list)

export default router