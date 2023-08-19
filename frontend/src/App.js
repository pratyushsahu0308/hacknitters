import React from 'react'
import Header from './components/Header';
import { Container } from 'react-bootstrap';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
  <>
    <div style={{
      backgroundImage: `url("https://www.transparenttextures.com/patterns/diagonales-decalees.png")`,
      backgroundColor: "#ffffff",
    }}>
    <Header />
    <main className="py-3">
      <Container style={{marginTop:"75px"}}>
        <Outlet />
      </Container>
    </main>
    <Footer />
    <ToastContainer />
    </div> 
  </>
  )
}

export default App