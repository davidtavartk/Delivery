import Navbar from '../components/Navbar/Navbar';
import { ToastContainer } from 'react-toastify';
import Footer from '../components/Footer/Footer';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <div className="h-screen w-full">
      <Navbar />

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
      <ToastContainer position="top-right" autoClose={5000} pauseOnHover={false} theme="dark" />
    </div>
  );
};

export default RootLayout;
