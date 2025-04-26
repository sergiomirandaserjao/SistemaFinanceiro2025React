import { ReactNode, createContext, useEffect, useState } from "react";
import axios from "axios";

type CategoriesContextType = {
	categories: CategoryProps[];
};

type CategoriesContextProviderProps = {
	children: ReactNode;
};

export const CategoriesContext = createContext({} as CategoriesContextType);

export function CategoriesContextProvider({ children }: CategoriesContextProviderProps) {
	const [categories, setCategories] = useState<CategoryProps[]>([]);

	async function getCategories() {
		const { data } = await axios.get<CategoryProps[]>("http://localhost:3001/categories");

		setCategories(data);
	}

	useEffect(() => {
		getCategories();
	}, []);

	return <CategoriesContext.Provider value={{ categories }}>{children}</CategoriesContext.Provider>;
}
