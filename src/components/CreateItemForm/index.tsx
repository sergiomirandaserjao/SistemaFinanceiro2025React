import { FormEvent, useState } from "react";
import classNames from "clsx";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { FaPlus } from "react-icons/fa";
import Select from "react-select";

import { Toast } from "@/utils/mixins/toast";
import { useTableData } from "@/hooks/useTableData";
import { useCategories } from "@/hooks/useCategories";
import { MaskedFormControl } from "@/components/MaskedFormControl";

import "./styles.scss";

type Props = {
	currentDate: string;
};

export function CreateItemForm({ currentDate }: Props) {
	const INITIAL_CATEGORY_IF_NO_OTHER_IS_SELECTED = 1;

	const [show, setShow] = useState(false);
	const [isIncome, setIsIncome] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState(
		INITIAL_CATEGORY_IF_NO_OTHER_IS_SELECTED
	);

	const { getTableData } = useTableData();
	const { categories } = useCategories();

	const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);

	const options: ReactSelectProps[] = categories.map((category) => {
		return {
			value: category.id,
			label: category.name
		};
	});

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		try {
			event.preventDefault();

			const formData = new FormData(event.currentTarget);
			const value = String(formData.get("value")).replace(",", ".");

			await axios.post("http://localhost:3001/projects", {
				...Object.fromEntries(formData),
				date: currentDate,
				category: selectedCategory,
				value: Number(value),
				expense: !isIncome
			});

			setIsIncome(false);
			setSelectedCategory(INITIAL_CATEGORY_IF_NO_OTHER_IS_SELECTED);

			handleClose();
			getTableData();

			Toast.fire({ icon: "success", title: "Item adicionado com sucesso!" });
		} catch (error) {
			console.error(error);

			Toast.fire({ icon: "error", title: "Erro ao adicionar item!" });
		}
	}

	return (
		<div className="pe-2">
			<Button
				variant="none"
				className="d-flex justify-content-center align-items-center rounded-circle button-success w-8 h-8 p-0"
				onClick={handleShow}
			>
				<FaPlus className="text-white" />
			</Button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header className="d-flex" closeButton>
					<Modal.Title className={classNames(isIncome ? "income-color" : "expense-color")}>
						{isIncome ? "Adicionar receita" : "Adicionar despesa"}
					</Modal.Title>
				</Modal.Header>

				<Form onSubmit={handleSubmit}>
					<Modal.Body className="d-flex flex-column gap-3">
						<Form.Switch
							id="isIncome"
							label="É uma receita?"
							onClick={(event) => setIsIncome(event.currentTarget.checked)}
						/>

						<Form.Group controlId="description">
							<Form.Label>Adicione uma descrição</Form.Label>
							<Form.Control
								name="description"
								placeholder="Adicione uma descrição"
								autoComplete="off"
								required
							/>
						</Form.Group>

						<div>
							<Form.Label htmlFor="category">Selecione uma categoria</Form.Label>
							<Select
								inputId="category"
								noOptionsMessage={() => "Nenhum resultado encontrado"}
								options={options}
								defaultValue={options[0]}
								onChange={(category) => setSelectedCategory(Number(category?.value))}
								components={{
									IndicatorSeparator: null
								}}
								styles={{
									control: (baseStyles) => ({
										...baseStyles,
										borderColor: "#dee2e6"
									})
								}}
								theme={(theme) => ({
									...theme,
									colors: {
										...theme.colors,
										primary: "#7066e070"
									}
								})}
							/>
						</div>

						<Form.Group controlId="value">
							<Form.Label>Digite o valor</Form.Label>
							<MaskedFormControl
								mask={Number}
								name="value"
								placeholder="Digite o valor"
								autoComplete="off"
								required
							/>
						</Form.Group>
					</Modal.Body>

					<Modal.Footer className="border-0 pt-0">
						<Button type="submit" variant="none" className="button-purple text-white">
							Salvar
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</div>
	);
}
