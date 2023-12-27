import { DndProvider } from 'react-dnd'
import './App.css'
import Homepage from './components/Homepage'
import Navbar from './components/Navbar'
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {

  return (
    <>
      <Navbar />
      <DndProvider backend={HTML5Backend}>
        <Homepage />
      </DndProvider>
    </>
  )
}

export default App
