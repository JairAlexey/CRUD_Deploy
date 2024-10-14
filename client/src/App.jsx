import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import { AuthProvider } from './context/AuthContext'
import ProductsPage from './pages/ProductsPage'
import ProductsFormPage from './pages/ProductsFormPage'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import ProtectedRoute from './ProtectedRoute'
import { ProductProvider } from './context/ProductsContext'
import Navbar from './components/Navbar'

function App() {

  return (
    <AuthProvider>
      <ProductProvider>
        <BrowserRouter>
        <Navbar />
          <main className="container-global">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/add-products" element={<ProductsFormPage />} />
                <Route path="/products/:id" element={<ProductsFormPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Route>
            </Routes>
          </main>
        </BrowserRouter>
      </ProductProvider>
    </AuthProvider>
  )
}

export default App
