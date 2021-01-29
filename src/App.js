import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ShiftScheduler from './shiftScheduler'
import Login from './authentication'
import './App.css'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/shift">
          <ShiftScheduler />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
