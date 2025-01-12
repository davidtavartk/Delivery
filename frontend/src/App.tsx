import { ToastContainer } from "react-toastify"
import Footer from "./components/Footer/Footer"
import Hero from "./components/Hero/Hero"
import Locations from "./components/Locations/Locations"
import Navbar from "./components/Navbar/Navbar"
import TopRestaurants from "./components/TopRestaurants/TopRestaurants"
import WhyUs from "./components/WhyUs/WhyUs"

const App = () => {
  return (
    <div className="h-screen w-full">
      <Navbar />
      <Hero />
      <TopRestaurants />
      <WhyUs />
      <Locations />
      <Footer />
      <ToastContainer
          position="top-right"
          autoClose={5000}
          pauseOnHover={false}
          theme="dark"
        />
    </div>
  )
}
export default App;