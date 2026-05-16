
  import ReactDOM from "react-dom/client";
  import React from "react";
  import { ClerkProvider } from "@clerk/clerk-react";
  import "./styles/index.css";
  import App from "./app/App.tsx";
import { BrowserRouter } from "react-router";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

ReactDOM.createRoot(
  document.getElementById("root")!
).render(

  <React.StrictMode>

    <ClerkProvider
      publishableKey={clerkPubKey}
    >
       <BrowserRouter>

       <App />

       </BrowserRouter>

    </ClerkProvider>

  </React.StrictMode>
);