import express from 'express'

import routes from './routes'

const app = express()
const port = process.env.PORT ?? 3000

app.use('/api', routes)

export const server = app.listen(port)

export default app