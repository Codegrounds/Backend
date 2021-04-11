import Koa from 'koa';
import Json from 'koa-json';
import Cors from '@koa/cors';
import Logger from 'koa-logger';
import Router from 'koa-router';
import Session from 'koa-session';
import Parser from 'koa-bodyparser';
import { Authentication, Editor, Lesson, Runner, Validate } from 'codegrounds/controllers'

export const start = async () => {
	const app = new Koa()
	app.proxy = true
	app.keys = [process.env.POSTGRES_PASSWORD!]

	const origin = process.env.NODE_ENV === 'development' ? 'http://codegrounds.atale.me:3000' : 'https://codegrounds.atale.me'
	const security = process.env.NODE_ENV === 'development' ? false : true

	app.use(Cors({ origin: 'http://codegrounds.atale.me:3000', credentials: true, allowMethods: ['POST', 'OPTIONS'], exposeHeaders: ['set-cookie'] }))
	app.use(Json({ spaces: 4 }))
	app.use(Parser())
	app.use(Logger())
	app.use(Session({
		secure: security,
		sameSite: false 
	}, app))

	const router = new Router();

	router.use('/authentication', Authentication.default.routes())
	router.use('/authentication', Authentication.default.allowedMethods())

	router.use('/editor', Editor.default.routes())
	router.use('/editor', Editor.default.allowedMethods())

	router.use('/lesson', Lesson.default.routes())
	router.use('/lesson', Lesson.default.allowedMethods())

	router.use('/runner', Runner.default.routes())
	router.use('/runner', Runner.default.allowedMethods())

	router.use('/validate', Validate.default.routes())
	router.use('/validate', Validate.default.allowedMethods())

	app.use(router.routes())
	app.use(router.allowedMethods())
	app.listen(80, '0.0.0.0')
	console.info('Koa running successfully')
}
