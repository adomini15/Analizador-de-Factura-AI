import React, { useEffect, useState, useRef } from "react";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPlus,
	faUpDownLeftRight,
	faRemove,
} from "@fortawesome/free-solid-svg-icons";
import Sortable, { Swap } from "sortablejs";

Sortable.mount(new Swap());

type InvoiceCellPropsType = {
	text: string;
	swap?: boolean;
	onRemove?: Function;
};

const InvoiceCell = ({ text, swap, onRemove }: InvoiceCellPropsType) => {
	return (
		<td contentEditable={!swap}>
			<div>
				<div>{text}</div>

				<div>
					{swap ? (
						<FontAwesomeIcon icon={faUpDownLeftRight}></FontAwesomeIcon>
					) : (
						onRemove && (
							<div
								onClick={({ currentTarget: target }) => {
									onRemove?.(target.closest("td")?.cellIndex);
								}}
							>
								<FontAwesomeIcon
									icon={faRemove}
									style={{ cursor: "pointer" }}
								></FontAwesomeIcon>
							</div>
						)
					)}
				</div>
			</div>
		</td>
	);
};

const initialData: any = {
	data: {
		Firstname: "Gian Carlos",
		Lastname: "Perez Michel",
		Age: "26",
		Gender: "Male",
	},
};

new Map();

const InvoiceTable = () => {
	const [swapCellState, setSwapCellState] = useState(false);
	const [dataSet, setDataSet] = useState(initialData);
	const refTable = useRef(null);

	useEffect(() => {
		const s1 = document.getElementById("s1");
		const s2 = document.getElementById("s2");

		if (s1 && s2) {
			new Sortable(s1, {
				group: "sortable",
				animation: 150,
				swap: true,
				swapClass: "swap-hightlight",
			});

			new Sortable(s2, {
				group: "sortable",
				animation: 150,
				swap: true,
				swapClass: "swap-hightlight",
			});
		}
	}, []);

	useEffect(() => {
		if (!swapCellState) {
			updateDataSet();
		}
	}, [swapCellState, setSwapCellState]);

	const addColumn = () => {
		setDataSet({ data: { ...dataSet, "[NEW COLUMN]": " " } });
	};

	const removeColumn = (cellIndex: number) => {
		const key = Object.keys(dataSet)[cellIndex];

		const newDataSet = dataSet;
		delete newDataSet[key];

		setDataSet(newDataSet);
	};

	const updateDataSet = () => {
		const { rows } = refTable.current! as HTMLTableElement;

		const newDataSet: any = {};

		for (let i = 0; i < rows[0].cells.length; i++) {
			const column = rows[0].cells[i].textContent as string;
			const value = rows[1].cells[i].textContent as string;

			newDataSet[column.replace(" ", "")] = value;
		}

		setDataSet({ data: newDataSet });
	};

	useEffect(() => {
		console.log(dataSet);
	}, [dataSet]);

	return (
		<div className="invoice-table">
			<div className="nav">
				<a href="#" onClick={addColumn}>
					<FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
					new column
				</a>
				<a
					href="#"
					id="move"
					onClick={() => setSwapCellState(!swapCellState)}
					className={swapCellState ? "active" : ""}
				>
					<FontAwesomeIcon icon={faUpDownLeftRight}></FontAwesomeIcon>
					move item
				</a>
			</div>
			<div className="canvas">
				<div className="table">
					<table ref={refTable}>
						<thead>
							<tr id="s1">
								{Object.keys(dataSet.data).map((col, index) => (
									<InvoiceCell
										text={`${col}`}
										swap={swapCellState}
										onRemove={removeColumn}
									/>
								))}
							</tr>
						</thead>
						<tbody>
							<tr id="s2">
								{Object.values(dataSet.data).map((value, index) => (
									<InvoiceCell text={`${value}`} swap={swapCellState} />
								))}
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default InvoiceTable;
