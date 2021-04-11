import Koa from 'koa';
import Json from 'koa-json';
import Cors from '@koa/cors';
import Logger from 'koa-logger';
import Router from 'koa-router';
import Parser from 'koa-bodyparser';
import { Lesson, Runner, Validate } from 'codegrounds/controllers'

export const start = async () => {
	const app = new Koa()
	app.use(Cors({
		origin: '*'
	}))
	app.use(Json({ spaces: 4 }))
	app.use(Parser())
	app.use(Logger())
	const router = new Router();

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
