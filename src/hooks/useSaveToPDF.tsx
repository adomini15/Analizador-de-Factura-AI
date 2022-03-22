import jsPDF from "jspdf";
import React, { useEffect, useState } from "react";

type pdfOptions = {
	format: [number, number];
	orientation: "portrait" | "landscape";
	unit: "in" | "px";
};

export const useSaveToPDF = (options: pdfOptions) => {
	const [PDFBlob, setPDFBlob] = useState<Blob>();

	const save = async (imageDataURI: string | null) => {
		if (imageDataURI) {
			const pdf = new jsPDF(options);

			pdf.internal.scaleFactor = 400;

			pdf.addImage(
				imageDataURI,
				"A4",
				0,
				0,
				pdf.internal.pageSize.getWidth(),
				pdf.internal.pageSize.getHeight()
			);

			setPDFBlob(pdf.output("blob"));
		}
	};

	return {
		PDFBlob,
		save,
	};
};
