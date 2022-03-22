import React from "react";
import "./App.css";
import InvoiceTable from "./components/invoice-table/";
import InvoiceCapture from "./components/invoice-capture";

function App() {
	return (
		<div className="App">
			{/* <InvoiceCapture></InvoiceCapture> */}
			<InvoiceTable></InvoiceTable>
		</div>
	);
}

export default App;
