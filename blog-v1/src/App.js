import './App.css';
import Header from './components/header/header';
import Nav from './components/nav/nav';
import Sidebar from './components/sidebar/sidebar';
import Contenedor from './components/container/contenedor';
import Pie from './components/pie/pie';

function App() {
  let obj ={
    titulo:"My First Bootstrap 4 Page",
    parrafo:"Resize this responsive page to see the effect!"
  }

  let fecha = new Date().getFullYear();
  return (
    <>
      <Header titulo={obj.titulo} parrafo={obj.parrafo}/>
      <Nav/>
      <div className="container" style={{"marginTop" : "30px"}}>
        <div className="row">
        <Sidebar/>
        <Contenedor/>
        </div>
      </div>
      <Pie fecha={fecha}/>
    </>
  );
}

export default App;
