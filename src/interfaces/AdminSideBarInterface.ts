export interface NavInterface {
	name: string;
	vlist?: {
		name: string;
		link: string;
		permissions: string[] | [];
		permissions2?: { name: string }[];
	}[];
	list: {
		name: string;
		link: string;
		permissions: string[] | [];
	}[];
}
