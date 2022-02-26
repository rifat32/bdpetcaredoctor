import { toast } from "react-toastify";
export const ErrorMessage = (status: number, message: string) => {
	if (status === 404 || status === 400 || status === 409 || status === 403) {
		toast.error(message);
	}
};
