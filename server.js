import express from 'express'
import configExpressApp from './src/config/express.js'

const app = express()
configExpressApp(app)