import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpDownLeftRight, faRemove } from "@fortawesome/free-solid-svg-icons";

import { SortableElement } from "react-sortable-hoc";

type InvoiceCellPropsType = {
	text: string;
	swap?: boolean;
	onRemove?: Function;
};

const InvoiceCell = SortableElement(
	({ text, swap, onRemove }: InvoiceCellPropsType) => {
		return (
			<td contentEditable={!swap}>
				<div>
					<div>{text}</div>

					<div contentEditable="false">
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
	}
);

export default InvoiceCell;
