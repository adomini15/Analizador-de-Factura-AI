import React, { useEffect, useState, useRef } from "react";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPlus,
	faUpDownLeftRight,
	faFileCsv,
} from "@fortawesome/free-solid-svg-icons";
import { arrayMove } from "react-sortable-hoc";
import InvoiceRow from "../invoice-row";
import { useInvoice } from "../../context/store";
import { useExportCsv } from "../../hooks/useExportCSV";

const csvOptions = {
	fieldSeparator: ",",
	quoteStrings: '"',
	decimalSeparator: ".",
	showLabels: true,
	showTitle: true,
	title: "Invoice",
	useTextFile: false,
	useBom: true,
	useKeysAsHeaders: true,
};

const InvoiceTable = () => {
	const [swapCellState, setSwapCellState] = useState(false);
	const [dataSet, setDataSet] = useState<any>(null);
	const refTable = useRef(null);
	const { invoice } = useInvoice();
	const { generateCsvDocument } = useExportCsv(csvOptions);

	useEffect(() => {
		if (invoice) {
			setDataSet(invoice);
		}
	}, [invoice]);

	const addColumn = () => {
		setDataSet({ ...dataSet, "[NEW COLUMN]": " " });
	};

	const removeColumn = (cellIndex: number) => {
		const key = Object.keys(dataSet)[cellIndex];

		const newDataSet = { ...dataSet };
		delete newDataSet[key];

		setDataSet(newDataSet);
	};

	const onSortCols = ({ oldIndex, newIndex }: any) => {
		const items = arrayMove(Object.keys(dataSet), oldIndex, newIndex);

		const newDataSet: any = {};

		Object.values(dataSet).forEach((value, index) => {
			newDataSet[items[index]] = value;
		});

		setDataSet(newDataSet);
	};

	const onSortVals = ({ oldIndex, newIndex }: any) => {
		const items = arrayMove(Object.values(dataSet), oldIndex, newIndex);

		const newDataSet: any = {};

		Object.keys(dataSet).forEach((key, index) => {
			newDataSet[key] = items[index];
		});

		setDataSet(newDataSet);
	};

	return (
		dataSet && (
			<div className="invoice-table">
				<div className="nav">
					<a href="#" onClick={() => generateCsvDocument(dataSet)}>
						<FontAwesomeIcon icon={faFileCsv}></FontAwesomeIcon>
						Export
					</a>

					{!swapCellState && (
						<a href="#" onClick={addColumn}>
							<FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
							new column
						</a>
					)}

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
								<InvoiceRow
									items={Object.keys(dataSet)}
									swapCellState={swapCellState}
									removeColumn={removeColumn}
									axis="x"
									onSortEnd={onSortCols}
								/>
							</thead>
							<tbody>
								<InvoiceRow
									items={Object.values(dataSet)}
									swapCellState={swapCellState}
									axis="x"
									helperClass="row"
									onSortEnd={onSortVals}
								/>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		)
	);
};

export default InvoiceTable;
