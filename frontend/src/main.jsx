import ReactDOM from "react-dom/client";
import App from "./App";
import "./i18nextConfig";

const rootContainer = document.getElementById("root");
const root = ReactDOM.createRoot(rootContainer);

root.render(<App />);
