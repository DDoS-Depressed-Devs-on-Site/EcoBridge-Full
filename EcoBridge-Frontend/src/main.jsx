import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.jsx";
import { UserContextProvider } from "./scripts/Context/UserContext.jsx";
import { OrgContextProvider } from "./scripts/Context/OrgContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <OrgContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </OrgContextProvider>
  </StrictMode>
);
