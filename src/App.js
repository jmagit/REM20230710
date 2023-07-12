import logo from './logo.svg';
import './App.css';
import { DemosJSX } from './demosJSX';
import { Demos } from './demos';

function App() {
  return (
    <div className="container-fluid">
      {/* <AppOld /> */}
      <DemosJSX />
      <Demos />
    </div>
  );
}

function AppOld() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Hola mundo</h1>
        <h2>Secreto: {process.env.REACT_APP_SECRET} {process.env.REACT_APP_API_URL}</h2>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
