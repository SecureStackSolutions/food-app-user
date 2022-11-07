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
	tableName: 'user_refresh_token',
	timestamps: false,
	underscored: true,
})
export class UserRefreshToken extends Model {
	@ForeignKey(() => AppUser)
	@Column({
		type: DataType.INTEGER,
		primaryKey: true,
	})
	userId!: number;

	@Column({
		type: DataType.STRING,
		allowNull: false,
		primaryKey: true,
	})
	token!: string;

	@BelongsTo(() => AppUser)
	user!: AppUser;
}
