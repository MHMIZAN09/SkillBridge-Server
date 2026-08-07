export interface ICategoryCreatePayload {
	name: string;
	description?: string;
	iconUrl?: string;
}

export interface ICategoryUpdatePayload {
	name?: string;
	description?: string;
	iconUrl?: string;
	isActive?: boolean;
}
