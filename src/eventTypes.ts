import { Type } from 'avsc';

export const userEventType = Type.forSchema({
	type: 'record',
	name: 'user',
	fields: [
		{
			name: 'userId',
			type: 'int',
		},
	],
});
