import InvoiceCell from "../invoice-cell";
import { SortableContainer } from "react-sortable-hoc";

const InvoiceRow = SortableContainer(
	({ items, swapCellState, removeColumn }: any) => {
		return (
			<tr>
				{items.map((col: any, index: any) => (
					<InvoiceCell
						key={`item-${index}`}
						index={index}
						text={`${col}`}
						swap={swapCellState}
						onRemove={removeColumn}
					/>
				))}
			</tr>
		);
	}
);

export default InvoiceRow;
