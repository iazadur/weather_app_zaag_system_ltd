
import React from 'react';
import {
  BrowserRouter, Route, Routes
} from "react-router-dom";
import './App.css';
import { CountryInformation } from './components/CountryInformation';
import { NotFound } from './components/NotFound';
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
        <Route path="/not_found" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
