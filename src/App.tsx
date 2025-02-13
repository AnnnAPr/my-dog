import React from 'react';
import {  BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import LoginPage from './components/LoginPage.tsx';
import HomePage from './components/HomePage.tsx';
import SearchComponent from './components/SearchComponent.tsx';

function App() {
  return (
    <>
			<Router>
				<Routes>
					<Route path="/" element={<LoginPage />} />
					<Route path="/home" element={<HomePage />} />
					<Route path="/search" element={<SearchComponent onSearch={(query) => console.log(query)} />} />
					<Route path="/" element={<Navigate replace to="/login" />} />
				</Routes>
        </Router>
			{/* <LoginPage /> */}
    </>
  );
}

export default App;
