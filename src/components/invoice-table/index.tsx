import React, { useEffect, useState } from "react";
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
	colIndex?: number;
	onRemove?: Function;
};

const InvoiceCell = ({ text, swap, onRemove }: InvoiceCellPropsType) => {
	return (
		<td contentEditable={!swap}>
			<div>
				<div>{text}</div>

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
		</td>
	);
};

const InvoiceTable = () => {
	const [swapCellState, setSwapCellState] = useState(false);

	useEffect(() => {
		if (swapCellState) {
			const s1 = document.getElementById("s1");
			const s2 = document.getElementById("s2");

			if (s1 && s2) {
				const a = new Sortable(s1, {
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
		}
	}, [swapCellState, setSwapCellState]);

	const removeColumn = (cellIndex: number) => {
		const table = document.querySelector<HTMLTableElement>(".table table");

		if (table) {
			for (let i = 0; i < table.rows.length; i++) {
				table.rows[i].cells[cellIndex].remove();
			}
		}
	};

	const addColumn = () => {
		const table = document.querySelector<HTMLTableElement>(".table table");

		if (table) {
			const { rows } = table;

			for (let i = rows.length - 1; i >= 0; i--) {
				const count = rows[i].cells.length;
				const newCell = rows[i].cells[count - 1].outerHTML;
				rows[i].insertAdjacentHTML("beforeend", newCell);
				rows[i].cells[count].focus();
			}
		}
	};

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
					<table>
						<thead>
							<tr id="s1">
								<InvoiceCell
									text="First Name"
									swap={swapCellState}
									colIndex={0}
									onRemove={removeColumn}
								/>
								{/* <InvoiceCell
									text="Last Name"
									swap={swapCellState}
									column={true}
								/>
								<InvoiceCell
									text="Age Name"
									swap={swapCellState}
									column={true}
								/>
								<InvoiceCell
									text="Gender Name"
									swap={swapCellState}
									column={true}
								/> */}
							</tr>
						</thead>
						<tbody>
							<tr id="s2">
								<InvoiceCell text="Gian Carlos" swap={swapCellState} />
								{/* <InvoiceCell text="Perez Michel" swap={swapCellState} />
								<InvoiceCell text="24" swap={swapCellState} />
								<InvoiceCell text="Male" swap={swapCellState} /> */}
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default InvoiceTable;
