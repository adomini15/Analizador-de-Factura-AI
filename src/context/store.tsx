import react, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const Store = createContext<any>(null);

Store.displayName = "Invoice";

export const useInvoice = () => useContext(Store);

export const InvoiceProvider = ({ children }: any) => {
	const [invoice, setInvoice] = useState(null);
	const [waiting, setWaiting] = useState<boolean>(false);

	const sendInvoice = async (formData: FormData) => {
		try {
			setWaiting(true);
			const res = await axios.post("http://localhost:5000/upload", formData, {
				headers: {
					"Content-Type": "application/pdf",
				},
			});

			const { data } = res.data;

			setInvoice(data);
			setWaiting(false);
		} catch (error) {
			throw error;
		}
	};

	const data: any = {
		invoice,
		waiting,
		sendInvoice,
	};

	return <Store.Provider value={data}>{children}</Store.Provider>;
};
