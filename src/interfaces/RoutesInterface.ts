import React from "react";
export interface RouteInterface {
	path: string;
	exact: boolean;
	component: React.FC;
	props?: any;
}
