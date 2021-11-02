/* import logo from './logo.svg'; */
import './App.css';
/* import MyComponent, { SegundoComponente, TercerComponente } from './MyComponent'; */
import { Container } from './components/container/container';
import { Header } from './components/header/header';
import { Nav } from './components/nav/nav';
import { SideBar } from './components/sidebar/sidebar';
import { Footer } from './components/footer/footer';

function App() {

  //header object
  let myObject = {
    title:"This is my Website",
    description:"Welcome to this wonderful place!"
  }

  const {title, description} = myObject;
  let todaysDate =  new Date();
  let year = todaysDate.getFullYear();

  return (
    <>
      <Header title={title} description={description} />
      <Nav />
      <div className="container" style={{"marginTop":"30px"}}>
        <div className="row">
          <SideBar />
          <Container />
        </div>
      </div>
      <Footer year={year} />
    </>

  );
}

export default App;
