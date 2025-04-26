import { CategoriesContext } from "@/contexts/CategoriesContext";
import { useContext } from "react";

export function useCategories() {
	const value = useContext(CategoriesContext);

	return value;
}
