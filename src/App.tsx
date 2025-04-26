import { useEffect, useState } from "react";
import dayjs from "dayjs";

import Card from "react-bootstrap/Card";

import { FilterList } from "./helpers";
import { useTableData } from "./hooks/useTableData";
import { FinanceTable } from "./components/FinanceTable";
import { Header } from "./components/Header";

export default function App() {
	const [filteredList, setFilteredList] = useState<ItemProps[]>([]);
	const [currentDate, setCurrentDate] = useState(dayjs().format("YYYY-MM-DD"));
	const { tableData } = useTableData();

	useEffect(() => {
		setFilteredList(FilterList(tableData, currentDate));
	}, [tableData, currentDate]);

	return (
		<Card.Body className="mt-8 mx-12 mb-12">
			<div className="rounded shadow bg-blue h-14">
				<div className="d-flex text-center flex-column text-white pt-8">
					<span className="fw-bold fs-3 pt-3">SISTEMA FINANCEIRO</span>
				</div>
			</div>

			<div className="d-flex flex-column bg-white rounded shadow gap-3 mb-9 mx-5 mt-n25 py-6 px-9">
				<Header currentDate={currentDate} setCurrentDate={setCurrentDate} tableData={tableData} />
				<FinanceTable filteredList={filteredList} />
			</div>
		</Card.Body>
	);
}
