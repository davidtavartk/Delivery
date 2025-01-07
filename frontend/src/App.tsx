import Footer from "./components/Footer/Footer"
import Hero from "./components/Hero/Hero"
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
      <Footer />
    </div>
  )
}
export default App