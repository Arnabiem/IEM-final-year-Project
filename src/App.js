import "./App.css"
import  { HomePages } from "./home/HomePages"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Header from "./components/header/Header"
import {Footer} from "./components/footer/Footer"
import LoginSignup from "./components/LoginSignup"
import SinglePage from "./components/watch/SinglePage"
function App() {
  return (
    <>
      <Router>
        <Header />
        
        <Switch>  
          <Route exact path='/' component={HomePages} />
          <Route path='/singlePage/:id' component={SinglePage} exact />
          <Route path='/login' component={LoginSignup} />
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;
