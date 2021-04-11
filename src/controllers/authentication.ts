import { Context } from 'koa';
import Router from 'koa-router';
import { getConnection, getRepository } from 'typeorm';
import { User } from 'codegrounds/models';

const router = new Router()

router.post('/signup', async (ctx: Context) => {
	if (ctx.request.body && Object.keys(ctx.request.body).length > 0) {
		const { username, password } = ctx.request.body;
		const lookup = await getRepository(User).findOne({ username })
		if (lookup) {
			ctx.status = 409
			ctx.body = {
				message: 'Conflict: User Exists',
				date: new Date().toLocaleString()
			}
		} else {
			const user = new User()
			user.username = username
			user.generatePassword(password)

			try {
				await getConnection().manager.save(user)
				ctx.status = 200
				ctx.body = {
					message: 'Successful: User Created',
					date: new Date().toLocaleString()
				}
			} catch (err) {
				console.log(err)
				ctx.status = 500
				ctx.body = {
					message: 'Internal Server Error',
					date: new Date().toLocaleString()
				}
			}
		}
	} else {
		ctx.status = 422
		ctx.body = {
			message: 'Unprocessable Entity: Missing Data',
			date: new Date().toLocaleString()
		}
	}
})

router.post('/logout', async (ctx: Context) => {
	if (ctx.session!.loggedIn) {
		ctx.session = null
		ctx.status = 200
		ctx.body = {
			message: 'Logged Out',
			date: new Date().toLocaleString()
		}
	} else {
		ctx.session = null
		ctx.status = 401
		ctx.body = {
			message: 'Unauthorized',
			date: new Date().toLocaleString()
		}
	}
})

router.post('/test', async (ctx: Context) => {
	if (ctx.session!.loggedIn) {
		ctx.status = 200
		ctx.body = {
			message: 'Signed In',
			date: new Date().toLocaleString()
		}
	} else {
		ctx.status = 200
		ctx.body = {
			message: 'Not Signed In',
			date: new Date().toLocaleString()
		}
	}
})

router.post('/login', async (ctx: Context) => {
	if (ctx.request.body && Object.keys(ctx.request.body).length > 0) {
		const { username, password } = ctx.request.body;
		const lookup = await getRepository(User).findOne({ username })
		if (lookup) {
			if (lookup.validatePassword(password)) {
				ctx.session!.loggedIn = true
				ctx.status = 200
				ctx.body = {
					message: 'Successful: Authorized',
					date: new Date().toLocaleString()
				}
			} else {
				ctx.status = 401
				ctx.body = {
					message: 'Not Found: Incorrect Password',
					date: new Date().toLocaleString()
				}
			}
		} else {
			ctx.status = 404
			ctx.body = {
				message: 'Not Found: User Not Found',
				date: new Date().toLocaleString()
			}
		}
	} else {
		ctx.status = 422
		ctx.body = {
			message: 'Unprocessable Entity: Missing Data',
			date: new Date().toLocaleString()
		}
	}
})

export default router
