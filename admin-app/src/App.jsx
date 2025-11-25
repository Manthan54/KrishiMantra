import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Farmers from './pages/Farmers';
import Advisories from './pages/Advisories';
import Settings from './pages/Settings';
import TestCard from './components/TestCard';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<><TestCard /><Dashboard /></>} />
          <Route path="/farmers" element={<Farmers />} />
          <Route path="/advisories" element={<Advisories />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;