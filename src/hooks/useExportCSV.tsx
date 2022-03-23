import { ExportToCsv, Options } from "export-to-csv";

export const useExportCsv = (options: Options) => {
	const generateCsvDocument = (data: {}) => {
		const csvExporter = new ExportToCsv(options);
		csvExporter.generateCsv([data]);
	};

	return {
		generateCsvDocument,
	};
};
