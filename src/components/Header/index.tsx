import { useState, useEffect } from "react";
import localizedFormat from "dayjs/plugin/localizedFormat";
import classNames from "clsx";
import "dayjs/locale/pt-br";
import dayjs from "dayjs";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Button from "react-bootstrap/Button";

import { uppercaseFirstLetter } from "@/helpers";
import { CreateItemForm } from "@/components/CreateItemForm";

import "./styles.scss";

dayjs.extend(localizedFormat);

type Props = {
	currentDate: string;
	setCurrentDate: (currentDate: string) => void;
	tableData: ItemProps[];
};

export function Header({ currentDate, setCurrentDate, tableData }: Props) {
	const [balanceColor, setBalanceColor] = useState("");

	const currentMonth = currentDate.split("-")[1];

	const translatedDate = dayjs(currentDate)
		.locale("pt-br")
		.format("LL")
		.split(" ")
		.slice(2)
		.join(" ");

	const expenses = calculateExpenseOrBalanceForTheMonth(true);
	const incomes = calculateExpenseOrBalanceForTheMonth();
	const result = incomes - expenses;

	function calculateExpenseOrBalanceForTheMonth(isExpense?: boolean) {
		return tableData
			.filter((item) => {
				const month = item.date.split("-")[1];

				if (month === currentMonth) {
					return isExpense ? item.expense : !item.expense;
				}
			})
			.reduce((acc, item) => acc + item.value, 0);
	}

	function handlePreviousMonth() {
		setCurrentDate(dayjs(currentDate).subtract(1, "month").format("YYYY-MM"));
	}

	function handleNextMonth() {
		setCurrentDate(dayjs(currentDate).add(1, "month").format("YYYY-MM"));
	}

	function transformToCurrency(value: number) {
		return value.toLocaleString("pt-br", {
			style: "currency",
			currency: "BRL"
		});
	}

	useEffect(() => {
		result < 0 ? setBalanceColor("expense-color") : setBalanceColor("income-color");
	}, [result]);

	return (
		<div className="d-flex align-items-center text-center">
			<div className="d-flex gap-4">
				<Button
					variant="none"
					className="d-flex justify-content-center align-items-center rounded-circle button-gray w-8 h-8 p-0"
					onClick={handlePreviousMonth}
				>
					<FaChevronLeft />
				</Button>

				<div className="fw-semibold text-muted fs-17 w-40">
					{uppercaseFirstLetter(translatedDate)}
				</div>

				<Button
					variant="none"
					className="d-flex justify-content-center align-items-center rounded-circle button-gray w-8 h-8 p-0"
					onClick={handleNextMonth}
				>
					<FaChevronRight />
				</Button>
			</div>

			<div className="d-flex justify-content-between gap-10 mx-18 w-100">
				<div className="d-flex flex-column">
					<span className="fw-semibold text-muted fs-17">Despesa</span>
					<span className="fw-bold expense-color">{transformToCurrency(expenses)}</span>
				</div>

				<div className="d-flex flex-column">
					<span className="fw-semibold text-muted fs-17">Receita</span>
					<span className="fw-bold income-color">{transformToCurrency(incomes)}</span>
				</div>

				<div className="d-flex flex-column">
					<span className="fw-semibold text-muted fs-17">Saldo</span>
					<span className={classNames("fw-bold", balanceColor)}>{transformToCurrency(result)}</span>
				</div>
			</div>

			<CreateItemForm currentDate={currentDate} />
		</div>
	);
}
