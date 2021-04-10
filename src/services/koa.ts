import Koa from 'koa';
import Json from 'koa-json';
import Logger from 'koa-logger';
import Router from 'koa-router';
import Parser from 'koa-bodyparser';

export const start = async () => {
	const app = new Koa()
	app.use(Json({
		spaces: 4
	}))

	app.use(Parser())
	app.use(Logger())
	const router = new Router();

	app.use(router.routes())
	app.use(router.allowedMethods())
	app.listen(80, '0.0.0.0')
	console.info('Koa running successfully')
}
