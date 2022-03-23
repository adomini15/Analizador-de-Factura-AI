import React, { useState, useEffect, Component } from "react";
import "./App.css";
import InvoiceTable from "./components/invoice-table/";
import InvoiceCapture from "./components/invoice-capture";
import { InvoiceProvider } from "./context/store";

function App() {
	return (
		<div className="App">
			<InvoiceProvider>
				<InvoiceCapture></InvoiceCapture>
				<InvoiceTable></InvoiceTable>
			</InvoiceProvider>
		</div>
	);
}

export default App;
