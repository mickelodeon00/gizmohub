import './App.css';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <ToastContainer position="bottom-center" limit={1} />
      <Header />
      <main className=" min-h-[calc(100vh-130px)]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
