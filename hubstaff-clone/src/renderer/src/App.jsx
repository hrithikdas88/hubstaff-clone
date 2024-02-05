import Login from './components/Login/Login'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProjectList from './components/ProjectList/ProjectList'

function App() {
  const ipcHandle = () => window.electron.ipcRenderer.send('ping')

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="projectList" element={<ProjectList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
