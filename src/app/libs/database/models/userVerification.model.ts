import {
	Table,
	Column,
	Model,
	DataType,
	BelongsTo,
	ForeignKey,
} from 'sequelize-typescript';
import { AppUser } from './appUser.model';

@Table({
	tableName: 'user_verification',
	timestamps: false,
	underscored: true,
	freezeTableName: true,
})
export class UserVerification extends Model {
	@ForeignKey(() => AppUser)
	@Column({
		type: DataType.INTEGER,
		primaryKey: true,
	})
	userId!: number;

	@Column({
		type: DataType.STRING(4),
		allowNull: false,
	})
	code!: string;

	@Column({
		type: DataType.DATE,
		allowNull: false,
	})
	validUntil!: Date;

	@BelongsTo(() => AppUser)
	user!: AppUser;
}

export const userVerificationSchema = `
type UserVerification {
	userId: Int!
	code: String!
	validUntil: String!
	user: AppUser!
}`;
