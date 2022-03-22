import React, { useState, useEffect, DragEvent } from "react";
import Webcam from "react-webcam";
import { useSaveToPDF } from "../../hooks/useSaveToPDF";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCameraAlt,
	faEye,
	faFilePdf,
	faPlusCircle,
	faExclamationCircle,
	faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import "./index.css";

const format = {
	width: 350,
	height: 300,
};

const InvoiceCapture = () => {
	const [dragOverStatus, setDragOverStatus] = useState<boolean>(false);
	const [invalidFileType, setInvalidFileType] = useState<string | null>(null);
	const [serverResponseState, setServerResponseState] = useState(false);

	const [imageSrc, setImageSrc] = useState<string | null>(null);
	const [pdfFile, setPdfFile] = useState<File | null>(null);

	const { PDFBlob, save } = useSaveToPDF({
		orientation: "portrait",
		unit: "px",
		format: [format.height, format.width],
	});

	// handlers

	const handleOnSendFile = async () => {
		const formData = new FormData();
		formData.append("PDF_FILE", pdfFile!);

		setServerResponseState(true);

		const res = await axios.post("http://localhost:5000/upload", formData, {
			headers: {
				"Content-Type": "application/pdf",
			},
		});

		const { data } = res.data;

		console.log(data);

		setServerResponseState(false);

		setPdfFile(null);
		setImageSrc(null);
	};

	const handleOnDrag = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setDragOverStatus(!dragOverStatus);
	};

	const handleOnDragOver = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
	};

	const handleOnDrop = async (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setDragOverStatus(false);

		if (e.dataTransfer.files.length == 1) {
			const file = e.dataTransfer.files[0];

			if (file.type == "application/pdf") {
				setInvalidFileType(null);

				setPdfFile(file);

				const blob = URL.createObjectURL(file);
				setImageSrc(blob);

				return;
			}

			setInvalidFileType("Only PDF files are supported.");

			return;
		}

		setInvalidFileType("Only one file must be specified.");
	};

	useEffect(() => {
		if (PDFBlob) {
			const file = new File([PDFBlob], "001.pdf");
			setPdfFile(file);
			setImageSrc(URL.createObjectURL(PDFBlob));
		}
	}, [PDFBlob]);

	return (
		<section className="pdf-container">
			<div className="pdfcam">
				<Webcam {...format} screenshotFormat="image/jpeg">
					{({ getScreenshot }) => {
						return (
							<button
								onClick={() => {
									save(getScreenshot());
								}}
								className="btn btn-secondary"
							>
								<FontAwesomeIcon icon={faCameraAlt} />
								<span>Take PDF</span>
							</button>
						);
					}}
				</Webcam>

				<div
					className={`pdf-file-selecter ${dragOverStatus ? "ondragover" : ""}`}
					onDragEnter={handleOnDrag}
					onDragLeave={handleOnDrag}
					onDragOver={handleOnDragOver}
					onDrop={handleOnDrop}
				>
					<FontAwesomeIcon icon={dragOverStatus ? faPlusCircle : faFilePdf} />
					<span>
						{dragOverStatus ? "drop file here" : "Drag and Drop file"}
					</span>
				</div>
				{invalidFileType && (
					<div className="error">
						<FontAwesomeIcon icon={faExclamationCircle} />
						{invalidFileType}
					</div>
				)}
			</div>
			<div className="pdf-preview" style={{ width: format.width }}>
				{imageSrc && !serverResponseState ? (
					<>
						<iframe src={imageSrc!} />
						<button
							onClick={async () => await handleOnSendFile()}
							className="btn btn-primary"
						>
							<FontAwesomeIcon icon={faPaperPlane} />
							Enviar
						</button>
					</>
				) : (
					<div className="empty">
						{serverResponseState ? (
							<>
								<img
									src="https://www.facturar.ec/wp-content/uploads/2020/11/loadingblue.gif"
									width="35"
								/>
								<span>Processing</span>
							</>
						) : (
							<>
								<FontAwesomeIcon icon={faEye} />
								<span>Preview</span>
							</>
						)}
					</div>
				)}
			</div>
		</section>
	);
};

export default InvoiceCapture;
