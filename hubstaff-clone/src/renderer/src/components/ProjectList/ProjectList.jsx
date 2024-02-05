import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ProjectList = () => {
  const navigate = useNavigate()
  const [projects, setProjects] = useState([
    { id: 1, name: 'WAC PRO', startTime: null, running: false, elapsedTime: 0 },
    { id: 2, name: 'LOGOS', startTime: null, running: false, elapsedTime: 0 }
  ])

  const handleBackClick = () => {
    navigate(-1)
  }

  const handleStartTimer = (projectId) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId ? { ...project, startTime: new Date(), running: true } : project
      )
    )
  }

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.running
            ? { ...project, elapsedTime: new Date() - new Date(project.startTime) }
            : project
        )
      )
    }, 1000)

    return () => clearInterval(timerInterval)
  }, [])

  return (
    <div>
      <h1>Project List</h1>
      <button onClick={handleBackClick}>Back</button>

      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <strong>{project.name}</strong> - Started at:{' '}
            {project.startTime ? project.startTime.toString() : 'Not started'}
            <br />
            {project.running && (
              <span>Elapsed Time: {Math.floor(project.elapsedTime / 1000)} seconds</span>
            )}
            <br />
            <button onClick={() => handleStartTimer(project.id)} disabled={project.running}>
              {project.running ? 'Timer Running' : 'Start Timer'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProjectList
