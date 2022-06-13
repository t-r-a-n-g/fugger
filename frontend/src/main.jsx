import ReactDOM from "react-dom/client";
import axios from "axios";
import App from "./App";

// axios default settings for sending cookies to server
axios.defaults.withCredentials = true;

const rootContainer = document.getElementById("root");
const root = ReactDOM.createRoot(rootContainer);

root.render(<App />);
