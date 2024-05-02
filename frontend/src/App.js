import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <main className=" min-h-[calc(100vh-130px)]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
