import { Context } from 'koa';
import Router from 'koa-router';
import { writeFile } from 'fs/promises';
import { exec, PromiseResult } from 'child-process-promise';
import { getRepository } from 'typeorm';
import { Lesson } from 'codegrounds/models';

const router = new Router()

function arraysEqual(a: Array<string> | string, b: Array<string> | string) {
	if (a instanceof Array && b instanceof Array) {
		if (a.length != b.length)
			return false;
		for (var i = 0; i < a.length; i++)
			if (!arraysEqual(a[i], b[i]))
				return false;
		return true;
	} else {
		return a == b;
	}
}

router.post('/javascript', async (ctx: Context) => {
	if (ctx.request.body && Object.keys(ctx.request.body).length > 0) {
		const { transaction_id, lesson_id, code_data } = ctx.request.body;
		let validationArray: string[]

		try {
			const lookup = await getRepository(Lesson).findOne({ lesson_id })
			if (!lookup) {
				ctx.status = 404
				ctx.body = {
					message: 'Not Found: Invalid Lesson ID',
					date: new Date().toLocaleString(),
				}

				return
			} else {
				validationArray = lookup.expected_output
				const testCode = Buffer.from(`${code_data}\nmodule.exports = ${lookup.function_name}`, 'utf8')
				const validationCode = Buffer.from(`const ${lookup.function_name} = require('./${transaction_id}')\n ${lookup.validation_code}`, 'utf8')

				await writeFile(`/tmp/${transaction_id}.js`, testCode)
				await writeFile(`/tmp/${transaction_id}-validation.js`, validationCode)
			}
		} catch (err) {
			ctx.status = 500
			ctx.body = {
				message: `Internal Server Error: ${err}`,
				date: new Date().toLocaleString()
			}

			return
		}

		await exec(`node /tmp/${transaction_id}-validation.js`, { capture: ['stdout', 'stderr'], timeout: 10000 }).then((result: PromiseResult<string>) => {
			if (result.stdout) {
				const validateArray = result.stdout.split(/\n/).filter(Boolean)
				if (arraysEqual(validateArray, validationArray)) {
					ctx.status = 200
					ctx.body = {
						message: 'Request Successful',
						date: new Date().toLocaleString(),
						data: {
							validation: true,
							exitCode: result.childProcess.exitCode,
							stdOutput: result.stdout || 'Unavailable',
							stdError: result.stderr || 'Unavailable'
						}
					}
				} else {
					ctx.status = 200
					ctx.body = {
						message: 'Request Successful',
						date: new Date().toLocaleString(),
						data: {
							validation: false,
							exitCode: result.childProcess.exitCode,
							stdOutput: result.stdout || 'Unavailable',
							stdError: result.stderr || 'Unavailable'
						}
					}
				}
			} else {
				ctx.status = 200
				ctx.body = {
					message: 'Request Successful',
					date: new Date().toLocaleString(),
					data: {
						validation: false,
						exitCode: result.childProcess.exitCode,
						stdOutput: result.stdout || 'Unavailable',
						stdError: result.stderr || 'Unavailable'
					}
				}
			}
		}).catch((result: PromiseResult<string>) => {
			ctx.status = 200
			ctx.body = {
				message: 'Request Successful',
				date: new Date().toLocaleString(),
				data: {
					validation: false,
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
