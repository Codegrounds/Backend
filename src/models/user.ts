import { BinaryLike, pbkdf2Sync, randomBytes } from 'crypto';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
	@PrimaryGeneratedColumn('uuid')
	database_id!: number;

	@Column({ nullable: false })
	private password_salt!: string;

	@Column({ nullable: false })
	private password_hash!: string;

	@Column({ nullable: false, unique: true })
	username!: string;

	@Column('simple-json', { nullable: true })
	code_saves!: [{ lesson_id: string; code_data: string; }];

	@Column('simple-json', { nullable: true })
	completion_progress!: [{ lesson_id: string; status: string; code_data: string; }];

	generatePassword(password: BinaryLike): void {
		this.password_salt = randomBytes(16).toString('hex');
		this.password_hash = pbkdf2Sync(password, this.password_salt, 1000, 64, 'sha512').toString('hex');
	}

	validatePassword(password: BinaryLike): boolean {
		const hash = pbkdf2Sync(password, this.password_salt, 1000, 64, 'sha512').toString('hex');
		return this.password_hash === hash;
	}
}
