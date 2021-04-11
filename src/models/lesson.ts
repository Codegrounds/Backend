import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Lesson {
	@PrimaryGeneratedColumn('uuid')
	id!: number;

	@Column({ nullable: false, unique: true })
	lesson_id!: string;

	@Column({ nullable: false })
	name!: string;

	@Column({ nullable: false })
	chapter!: string;

	@Column({ nullable: false })
	type!: string;

	@Column({ nullable: true })
	markdown!: string;

	@Column({ nullable: true })
	shell_code!: string;

	@Column({ nullable: true })
	function_name!: string;

	@Column({ nullable: true })
	validation_code!: string;

	@Column('simple-array', { nullable: true })
	expected_output!: string[];
}
