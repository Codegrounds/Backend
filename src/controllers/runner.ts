import { Context } from "koa";
import Router from "koa-router";
import { writeFile } from 'fs/promises';
import { exec, PromiseResult } from 'child-process-promise';

const router = new Router()

router.post('/javascript', async (ctx: Context) => {
	if (ctx.request.body && Object.keys(ctx.request.body).length > 0) {
		const body: {
			udid: string;
			data: string;
		} = ctx.request.body

		try {
			await writeFile(`/tmp/${body.udid}.js`, Buffer.from(body.data))
			let result = await exec(`node /tmp/${body.udid}.js`, { capture: [ 'stdout', 'stderr' ]})
			ctx.status = 200
				ctx.body = {
					message: 'Successful',
					date: new Date().toLocaleString(),
					data: {
						stdout: result.stdout.toString(),
						stderr: result.stderr.toString()
					}
				}
		} catch (err) {
			console.log(`Runner Error [${body.udid}]: ${err}`)
			ctx.status = 200
			ctx.body = {
				message: 'Successful',
				date: new Date().toLocaleString(),
				data: {
					stdout: null,
					stderr: err.stderr || err
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

export default router
