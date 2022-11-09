import React from 'react';
import Layout from './components/Layout';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import TransactionList from './pages/TransactionList';

function App() {
  return (
    <Layout>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/transactions" element={<TransactionList />} />
        </Routes>
      </Router>
     
    </Layout>
  );
}

export default App;
