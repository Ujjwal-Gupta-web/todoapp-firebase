import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { Container } from 'react-bootstrap';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Header from './components/Header';


function App() {
  return (<>
    <Router>
      <Header />
      <Container>
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
        <Routes>
          <Route exact path="/signup" element={<Signup />} />
        </Routes>
        <Routes>
          <Route exact path="/login" element={<Login />} />
        </Routes>
        <Routes>
          <Route exact path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Container>
    </Router>

  </>
  );
}

export default App;