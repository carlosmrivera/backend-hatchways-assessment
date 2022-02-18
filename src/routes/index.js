import { Router } from 'express'
import PostsRouter from './posts.js'
import CommonRouter from './common.js'

const router = Router()

router.use('/', CommonRouter)
router.use('/posts', PostsRouter)


export default router