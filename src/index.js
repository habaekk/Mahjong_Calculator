import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { RecoilRoot } from 'recoil';
import { Analytics } from "@vercel/analytics/react"

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
      <Analytics />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);
