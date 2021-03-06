import { Lesson, User } from 'codegrounds/models';
import { Context } from 'koa';
import Router from 'koa-router';
import { getConnection, getRepository } from 'typeorm';

const router = new Router()

router.get('/save', async (ctx: Context) => {
	if (!ctx.session!.lookup_id) {
		ctx.status = 401
		ctx.body = {
			message: 'Unauthorized',
			date: new Date().toLocaleString()
		}

		return
	}

	if (ctx.request.query && Object.keys(ctx.request.query).length > 0) {
		const { id } = ctx.request.query;
		const lookup = await getRepository(User).findOne({ database_id: ctx.session!.lookup_id })
		if (lookup) {
			let exists = false
			let valueIndex = 0

			if (!lookup.code_saves) {
				lookup.code_saves = [{
					code_data: '',
					lesson_id: id!.toString()
				}]
			}

			lookup.code_saves.forEach((value, index) => {
				if (!exists && value.lesson_id === id!.toString()) {
					exists = true
					valueIndex = index
				}
			})

			if (!exists) {
				lookup.code_saves.push({
					code_data: '',
					lesson_id: id!.toString()
				})

				await getConnection().manager.save(lookup)

				ctx.status = 200
				ctx.body = {
					message: 'Successful: Recieved',
					date: new Date().toLocaleString(),
					data: {
						code_save: '',
						lesson_id: id!.toString()
					}
				}
			} else {
				const returnStatus = lookup.code_saves[valueIndex].code_data
				ctx.status = 200
				ctx.body = {
					message: 'Successful: Recieved',
					date: new Date().toLocaleString(),
					data: {
						status: returnStatus,
						lesson_id: id!.toString()
					}
				}
			}
		} else {
			ctx.status = 500
			ctx.body = {
				message: 'Internal Server Error',
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

router.post('/save', async (ctx: Context) => {
	if (!ctx.session!.lookup_id) {
		ctx.status = 401
		ctx.body = {
			message: 'Unauthorized',
			date: new Date().toLocaleString()
		}

		return
	}

	if (ctx.request.body && Object.keys(ctx.request.body).length > 0) {
		const { lesson_id, code_data } = ctx.request.body;
		const lookup = await getRepository(User).findOne({ database_id: ctx.session!.lookup_id })
		if (lookup) {
			if (lookup.code_saves === null) {
				lookup.code_saves = [{
					lesson_id: lesson_id,
					code_data: code_data
				}]
			} else {
				let exitMode = false
				let valueIndex = 0
				lookup.code_saves.forEach((value, index) => {
					if (!exitMode && value.lesson_id === lesson_id) {
						exitMode = true
						valueIndex = index
					}
				})

				if (!exitMode) {
					lookup.code_saves.push({
						lesson_id: lesson_id,
						code_data: code_data
					})
				} else {
					lookup.code_saves[valueIndex] = {
						lesson_id: lesson_id,
						code_data: code_data
					}
				}
			}

			await getConnection().manager.save(lookup)
			ctx.status = 200
			ctx.body = {
				message: 'Successful: Saved',
				date: new Date().toLocaleString()
			}
		} else {
			ctx.status = 500
			ctx.body = {
				message: 'Internal Server Error',
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

router.get('/status', async (ctx: Context) => {
	if (!ctx.session!.lookup_id) {
		ctx.status = 401
		ctx.body = {
			message: 'Unauthorized',
			date: new Date().toLocaleString()
		}

		return
	}

	if (ctx.request.query && Object.keys(ctx.request.query).length > 0) {
		const { id } = ctx.request.query;
		const lookup = await getRepository(User).findOne({ database_id: ctx.session!.lookup_id })
		if (lookup) {
			let exists = false
			let valueIndex = 0

			if (!lookup.completion_progress) {
				lookup.completion_progress = [{
					status: 'not_started',
					code_data: '',
					lesson_id: id!.toString()
				}]
			}

			lookup.completion_progress.forEach((value, index) => {
				if (!exists && value.lesson_id === id!.toString()) {
					exists = true
					valueIndex = index
				}
			})

			if (!exists) {
				lookup.completion_progress.push({
					status: 'not_started',
					code_data: '',
					lesson_id: id!.toString()
				})

				await getConnection().manager.save(lookup)

				ctx.status = 200
				ctx.body = {
					message: 'Successful: Recieved',
					date: new Date().toLocaleString(),
					data: {
						status: 'not_started',
						lesson_id: id!.toString()
					}
				}
			} else {
				const returnStatus = lookup.completion_progress[valueIndex].status
				ctx.status = 200
				ctx.body = {
					message: 'Successful: Recieved',
					date: new Date().toLocaleString(),
					data: {
						status: returnStatus,
						lesson_id: id!.toString()
					}
				}
			}
		} else {
			ctx.status = 500
			ctx.body = {
				message: 'Internal Server Error',
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

router.post('/status', async (ctx: Context) => {
	if (!ctx.session!.lookup_id) {
		ctx.status = 401
		ctx.body = {
			message: 'Unauthorized',
			date: new Date().toLocaleString()
		}

		return
	}

	if (ctx.request.body && Object.keys(ctx.request.body).length > 0) {
		const { lesson_id, status, code_data } = ctx.request.body;
		const lookup = await getRepository(User).findOne({ database_id: ctx.session!.lookup_id })
		if (lookup) {
			if (lookup.completion_progress === null) {
				lookup.completion_progress = [{
					lesson_id: lesson_id,
					code_data: code_data,
					status: status
				}]
			} else {
				let exitMode = false
				let valueIndex = 0
				lookup.completion_progress.forEach((value, index) => {
					if (!exitMode && value.lesson_id === lesson_id) {
						exitMode = true
						valueIndex = index
					}
				})

				if (!exitMode) {
					lookup.completion_progress.push({
						lesson_id: lesson_id,
						code_data: code_data,
						status: status
					})
				} else {
					lookup.completion_progress[valueIndex] = {
						lesson_id: lesson_id,
						code_data: code_data,
						status: status
					}
				}
			}

			await getConnection().manager.save(lookup)
			ctx.status = 200
			ctx.body = {
				message: 'Successful: Saved',
				date: new Date().toLocaleString()
			}
		} else {
			ctx.status = 500
			ctx.body = {
				message: 'Internal Server Error',
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
