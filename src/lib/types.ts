export enum UserTypes {
	Owner,
	Provider,
	Refugee,
	Undefined
}

export interface Country {
	id: number;
	name: string;
}

export interface Language {
	id: number;
	name: string;
}

export interface Owner {
	id: number;
	auth0_id: string;
	email: string;
	name: string;
	phone: string;
	locations?: Location[];
}

export interface Provider {
	id: number;
	auth0_id: string;
	email: string;
	name: string;
	phone: string;
	services?: Service[];
}

export interface Refugee {
	id: number;
	auth0_id: string;
	email: string;
	name: string;
	phone: string;
	notes: string;
	no_adults: number;
	no_children: number;
	accommodationRequest?: AccommodationRequest;
	country?: Country;
	language?: Language;
	location?: Location;
	id_country: number;
	id_language: number;
	id_loc?: number;
}

export interface Location {
	id: number;
	name: string;
	address: string;
	owner?: Owner;
	id_owner: number;
	services?: Service[];
}

export interface Service {
	id: number;
	name: string;
	description: string;
	provider?: Provider;
	location?: Location;
	id_provider: number;
	id_loc: number;
	type: ServiceTypes;
}

export interface AccommodationRequest {
	id: number;
	refugee?: Refugee;
	approved: number;
	id_refugee: number;
	id_location: number;
	location?: Location;
}

export enum ServiceTypes {
	GENERIC,
	FOOD,
	CLOTHES,
	MEDICAL_SERVICE,
	TRANSLATION_SERVICE,
	LEISURE
}

export function serviceTypeToString(type: ServiceTypes): string {
	switch (type) {
		case ServiceTypes.GENERIC: {
			return 'Generic';
		}
		case ServiceTypes.FOOD: {
			return 'Food';
		}
		case ServiceTypes.CLOTHES: {
			return 'Clothing';
		}
		case ServiceTypes.MEDICAL_SERVICE: {
			return 'Medical';
		}
		case ServiceTypes.TRANSLATION_SERVICE: {
			return 'Translation';
		}
		case ServiceTypes.LEISURE: {
			return 'Leisure';
		}
	}
}
