import { Hono } from 'hono'
import { auth } from './routes/auth'

const app = new Hono()

app.route('/api/v1/', auth)

export default app
