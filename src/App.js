import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import './App.css';



const Component = () => {
  return <div>Meu Componente</div>
}

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route  path='/' element={<Component />}/>
        <Route  path='/page-1' element={<Component />}/>
        <Route  path='/page-2' element={<Component />}/>
      </Routes>
    </>
  );
}

export default App;
