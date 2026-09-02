import './App.css'
import Header from './Components/Header'
import Navbar from './Components/Navbar'
import { FaGithub } from "react-icons/fa"
import Searchbar from './Components/Searchbar'
import Footer from './Components/Footer'


function App() {
  return (
    <>
      <Navbar />
      <Header />
      <Searchbar />
      <Footer />
    </>
  )
}

export default App
