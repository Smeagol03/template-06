import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Invitation from "./pages/Invitation";
import Admin from "./pages/Admin";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Main Invitation Page */}
        <Route path="/" element={<Invitation />} />
        
        {/* Admin Dashboard */}
        <Route path="/admin" element={<Admin />} />
        
        {/* Backward Compatibility */}
        <Route path="/generator" element={<Admin />} />
      </Routes>
    </Router>
  );
};

export default App;
