import { ReactNode, createContext, useEffect, useState } from "react";
import axios from "axios";

type TableDataContextType = {
	tableData: ItemProps[];
	getTableData: () => void;
};

type TableDataContextProviderProps = {
	children: ReactNode;
};

export const TableDataContext = createContext({} as TableDataContextType);

export function TableDataContextProvider({ children }: TableDataContextProviderProps) {
	const [tableData, setTableData] = useState<ItemProps[]>([]);

	async function getTableData() {
		const { data } = await axios.get<ItemProps[]>("http://localhost:3001/projects");

		setTableData(data);
	}

	useEffect(() => {
		getTableData();
	}, []);

	return (
		<TableDataContext.Provider value={{ tableData, getTableData }}>
			{children}
		</TableDataContext.Provider>
	);
}
