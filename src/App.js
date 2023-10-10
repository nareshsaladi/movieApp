import {Route, Switch, Redirect} from 'react-router-dom'

import './App.css'
import Home from './components/Home'
import PopularMovies from './components/PopularMovies'
import LoginForm from './components/LoginForm'
import MovieItemDetails from './components/MovieItemDetails'
import SearchComponent from './components/SearchComponent'
import About from './components/About'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/popular" component={PopularMovies} />
    <ProtectedRoute exact path="/movies/:id" component={MovieItemDetails} />
    <ProtectedRoute exact path="/search" component={SearchComponent} />
    <ProtectedRoute exact path="/account" component={About} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
