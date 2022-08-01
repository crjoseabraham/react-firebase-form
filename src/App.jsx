import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import Create from './components/Create'
import Edit from './components/Edit'
import Show from './components/Show'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element=<Show /> />
          <Route path='/create' element=<Create /> />
          <Route path='/edit/:id' element=<Edit /> />
          <Route />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
