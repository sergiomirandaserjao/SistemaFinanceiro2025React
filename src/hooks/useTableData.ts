import { useContext } from "react";

import { TableDataContext } from "@/contexts/TableDataContext";

export function useTableData() {
	const value = useContext(TableDataContext);

	return value;
}
