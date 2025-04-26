import React from "react";
import ReactDOM from "react-dom/client";

import reportWebVitals from "./reportWebVitals";
import { CategoriesContextProvider } from "./contexts/CategoriesContext";
import { TableDataContextProvider } from "./contexts/TableDataContext";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "./global.scss";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
	<React.StrictMode>
		<TableDataContextProvider>
			<CategoriesContextProvider>
				<App />
			</CategoriesContextProvider>
		</TableDataContextProvider>
	</React.StrictMode>
);

reportWebVitals();
