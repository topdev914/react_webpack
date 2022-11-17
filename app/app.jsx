import React, { useState, useEffect, useRef } from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Routes, Route } from "react-router-dom"



import Main from "./pages/main.jsx"
import Detail from "./pages/detail.jsx"
import { GlobalProvider } from "./provider/context"


import 'react-multi-carousel/lib/styles.css';
import "./styles/main.scss"

import { library } from '@fortawesome/fontawesome-svg-core'
import { faMagnifyingGlass, faClock, faTicket, faCreditCard, faClose, faMoneyCheck, faCircleCheck } from '@fortawesome/free-solid-svg-icons'
library.add(faMagnifyingGlass, faClock, faTicket, faCreditCard, faClose, faMoneyCheck, faCircleCheck)


function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/:imdbID" element={<Detail />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  )
}

ReactDOM.render(<App />, document.getElementById("app"))

if (module.hot) {
  module.hot.accept()
}
