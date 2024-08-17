import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import ProductsPage from './ProductsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegistrationForm  />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/products" element={<ProductsPage />} />

      </Routes>
    </Router>
  );
}

export default App;
