import {
	Table,
	Column,
	Model,
	DataType,
	HasOne,
	CreatedAt,
	HasMany,
} from 'sequelize-typescript';
import { UserRefreshToken } from './userRefreshToken.model';
import { UserVerification } from './userVerification.model';

@Table({
	tableName: 'app_user',
	timestamps: true,
	updatedAt: false,
	underscored: true,
})
export class AppUser extends Model {
	@Column({
		type: DataType.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	})
	id!: number;

	@Column({
		type: DataType.STRING(60),
		allowNull: false,
		unique: true,
	})
	email!: string;

	@CreatedAt
	createdAt!: Date;

	@Column({
		type: DataType.STRING(60),
		allowNull: false,
	})
	name!: string;

	@Column({
		type: DataType.STRING(2),
		allowNull: false,
		defaultValue: 'en',
	})
	preferredLanguage!: string;

	@Column({
		type: DataType.BOOLEAN,
		allowNull: false,
		defaultValue: false,
	})
	isVerified!: boolean;

	@HasOne(() => UserVerification)
	verification!: UserVerification;

	@HasMany(() => UserRefreshToken)
	refreshTokens!: UserRefreshToken[];
}
