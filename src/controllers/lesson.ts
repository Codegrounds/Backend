import { Lesson } from 'codegrounds/models';
import { Context } from 'koa';
import Router from 'koa-router';
import { getConnection, getRepository } from 'typeorm';

const router = new Router()

router.post('/new', async (ctx: Context) => {
	if (ctx.request.body && Object.keys(ctx.request.body).length > 0) {
		const { lesson_id, name, type, chapter, markdown, shell_code, function_name, validation_code, expected_output } = ctx.request.body;
		const result = await getRepository(Lesson).findOne({ lesson_id })
		if (result) {
			ctx.status = 409
			ctx.body = {
				message: 'Conflict: Lesson Exists',
				date: new Date().toLocaleString()
			}
		} else {
			const lesson = new Lesson()
			lesson.lesson_id = lesson_id
			lesson.name = name
			lesson.type = type
			lesson.chapter = chapter

			if (markdown) {
				lesson.markdown = markdown
			}

			if (shell_code) {
				lesson.shell_code = shell_code
				lesson.function_name = function_name
				lesson.validation_code = validation_code
				lesson.expected_output = expected_output
			}

			await getConnection().manager.save(lesson)
			ctx.status = 201
			ctx.body = {
				message: 'Successful: Created',
				date: new Date().toLocaleString(),
				data: lesson
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
