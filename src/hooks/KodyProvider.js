import React, { useState, createContext } from 'react';

let localStor = localStorage.getItem('kody-code');
let kodyLocal = localStor ? JSON.parse(localStor) : {};

let initState = {
  html: kodyLocal.html || '<p id="para">hello world</p>',
  css: kodyLocal.css || 'body {color: #000 }',
  javascript: kodyLocal.javascript || 'document.getElementById("para").innerHTML = "welcome";',
  mode: kodyLocal.mode || 'html',
  fontSize: kodyLocal.fontSize || 16
} || kodyLocal;

export const KodyContext = createContext();

export function KodyProvider ({ children }) {

  const [state, setState] = useState(initState);

  return <KodyContext.Provider value={{ state, setState }}>
    {children}
  </KodyContext.Provider>;
}