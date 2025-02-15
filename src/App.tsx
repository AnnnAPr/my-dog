import React from 'react';
import {  BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import SearchComponent from './components/SearchComponent';

function App() {
  return (
    <>
			<Router>
				<Routes>
					<Route path="/" element={<LoginPage />} />
					<Route path="/home" element={<HomePage />} />
					<Route path="/search" element={<SearchComponent onSearch={(query) => console.log(query)} />} />
				</Routes>
        </Router>
			{/* <LoginPage /> */}
    </>
  );
}

export default App;
