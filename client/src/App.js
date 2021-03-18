import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from 'react-router-dom';

import LandingPage from './components/Landing/LandingPage';
import Home from './components/Home/Home';
import NewApartmant from './components/Admin/NewApartmant';
import ProtectedRoute from './components/config/ProtectedRoute';

import createHistory from 'history/createBrowserHistory';
const history = createHistory();

function App() {
  return (
  <Router history={history} basename={process.env.PUBLIC_URL}>
  <Container>
    <Row>
      <Switch>
        <ProtectedRoute exact path='/' exact component={withRouter(LandingPage)} />
        <Route exact path='/home' component={withRouter(Home)} />
        <Route path='/admin' component={withRouter(NewApartmant)} />

        <Route path="*" component={() => "404 STRANICA NIJE PRONADJENA"} />
      </Switch>
    </Row>
  </Container>
  </Router>
  )
}

export default App;
