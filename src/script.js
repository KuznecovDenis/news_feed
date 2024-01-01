import React from "react";
import { createRoot } from 'react-dom/client';
import {App} from "./Components/App/App.js";

import './base.css'

const root = createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);