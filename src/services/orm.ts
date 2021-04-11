import { createConnection } from 'typeorm';
import { Lesson, User } from 'codegrounds/models';

export const start = async () => {
	try {
		await createConnection({
			type: 'postgres',
			host: 'codegrounds_database',
			username: process.env.POSTGRES_USER,
			password: process.env.POSTGRES_PASSWORD,
			database: process.env.POSTGRES_DB,
			synchronize: true,
			logging: false,
			entities: [Lesson, User]
		})
		console.info('ORM connected to database')
	} catch (err) {
		console.error(`ORM failed to connect: ${err}`)
	}
}
