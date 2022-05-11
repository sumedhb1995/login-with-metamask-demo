export interface ICampaign {
	id?: string;
	name: string;
	slogan: string;
	shortDescription: string;
	longDescription: string;
	createdAt: Date;
	updatedAt: Date;
	createdByUserId: string;
	questIds: string[];
}

export interface IQuest {
	id?: string;
	name: string;
	description: string;
	endsAt: Date;
	taskIds: string[];
	createdByUserId: string;
}

export interface ITask {
	id?: string;
	name: string;
	description: string;
	reward: number;
	currency: string;
}

export enum OAuthType {
	'twitter',
	'facebook',
	'okta',
}

export interface IUser {
	id: number;
	username: string;
	nonce: string;
	publicAddress: string;
}

export interface IAuthenticatedUser extends IUser {
	password: string;
	autoGeneratedPassword?: string;
}
