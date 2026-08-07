export interface ISubjectCreatePayload {
	name: string;
	description?: string;
}

export interface ISubjectUpdatePayload {
	name?: string;
	description?: string;
}
