import React from "react";
import { createRoot } from 'react-dom/client';
import './base.css'
import {App} from "./Components/App/App.js";


const root = createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);