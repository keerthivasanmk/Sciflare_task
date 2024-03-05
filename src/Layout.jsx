import { Routes, Route } from 'react-router-dom';
import './App.css';
import Table from './components/Table';
import Header from './components/Header';

function Layout() {
  return (
    <>
      <Header />
      <div className="App"> 
         <Table />
       </div>
    </>
  );
}

export default Layout;
