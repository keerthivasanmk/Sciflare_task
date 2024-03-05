import { Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './Layout';
import Login from './components/Login';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Layout />} />
    </Routes>
  );
}

export default App;
