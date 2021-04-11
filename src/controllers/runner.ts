import { Context } from 'koa';
import Router from 'koa-router';
import { writeFile } from 'fs/promises';
import { exec, PromiseResult } from 'child-process-promise';

const router = new Router()

router.post('/javascript', async (ctx: Context) => {
	if (ctx.request.body && Object.keys(ctx.request.body).length > 0) {
		const { transaction_id, code_data } = ctx.request.body;

		try {
			await writeFile(`/tmp/${transaction_id}.js`, Buffer.from(code_data, 'utf8'))
		} catch (err) {
			ctx.status = 500
			ctx.body = {
				message: `Internal Server Error: ${err}`,
				date: new Date().toLocaleString()
			}

			return
		}

		await exec(`node /tmp/${transaction_id}.js`, { capture: ['stdout', 'stderr'], timeout: 10000 }).then((result: PromiseResult<string>) => {
			ctx.status = 200
			ctx.body = {
				message: 'Request Successful',
				date: new Date().toLocaleString(),
				data: {
					transactionId: transaction_id,
					exitCode: result.childProcess.exitCode,
					stdOutput: result.stdout || 'Unavailable',
					stdError: result.stderr || 'Unavailable'
				}
			}
		}).catch((result: PromiseResult<string>) => {
			ctx.status = 200
			ctx.body = {
				message: 'Request Successful',
				date: new Date().toLocaleString(),
				data: {
					transactionId: transaction_id,
					exitCode: result.childProcess.exitCode,
					stdOutput: result.stdout || 'Unavailable',
					stdError: result.stderr || 'Unavailable'
				}
			}
		})
	} else {
		ctx.status = 422
		ctx.body = {
			message: 'Unprocessable Entity: Missing Data',
			date: new Date().toLocaleString()
		}
	}
})

export default router
