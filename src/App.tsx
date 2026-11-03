import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { AskPage } from './pages/AskPage'
import { EventsPage } from './pages/EventsPage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { PoliciesPage } from './pages/PoliciesPage'
import { ProjectsPage } from './pages/ProjectsPage'
import { ResourcesPage } from './pages/ResourcesPage'
import { RoadmapsPage } from './pages/RoadmapsPage'
import { StrategiesPage } from './pages/StrategiesPage'
import { TeamPage } from './pages/TeamPage'
import { UpdatesPage } from './pages/UpdatesPage'
import { VisionPage } from './pages/VisionPage'

/** Defines the application routes inside the shared page layout. */
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="vision" element={<VisionPage />} />
        <Route path="strategies" element={<StrategiesPage />} />
        <Route path="roadmaps" element={<RoadmapsPage />} />
        <Route path="policies" element={<PoliciesPage />} />
        <Route path="updates" element={<UpdatesPage />} />
        <Route path="events" element={<EventsPage />} />
        <Route path="ask" element={<AskPage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="team" element={<TeamPage />} />
        <Route path="resources" element={<ResourcesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
