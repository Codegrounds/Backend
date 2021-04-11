import Koa from 'koa';
import Json from 'koa-json';
import Cors from '@koa/cors';
import Logger from 'koa-logger';
import Router from 'koa-router';
import Session from 'koa-session';
import Parser from 'koa-bodyparser';
import { Authentication, Lesson, Runner, Validate } from 'codegrounds/controllers'

export const start = async () => {
	const app = new Koa()
	app.proxy = true
	app.keys = [process.env.POSTGRES_PASSWORD!]

	app.use(Cors({ origin: 'http://codegrounds.tale.me:3000', credentials: true, allowMethods: ['POST', 'OPTIONS'], exposeHeaders: ['set-cookie'] }))
	app.use(Json({ spaces: 4 }))
	app.use(Parser())
	app.use(Logger())
	app.use(Session({
		secure: true,
		sameSite: false
	}, app))

	const router = new Router();

	router.use('/authentication', Authentication.default.routes())
	router.use('/authentication', Authentication.default.allowedMethods())

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
