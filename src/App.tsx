
import React from 'react';
import {
  BrowserRouter, Route, Routes
} from "react-router-dom";
import './App.css';
import { CountryInformation } from './components/CountryInformation';
import { Search } from './components/Search';
export interface Icountry {
  name: string,
  capital: string[],
  population: number,
  latlng: number[],
  flags: string
}

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="details" element={<CountryInformation />} >
          <Route path=":country" element={<CountryInformation />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
