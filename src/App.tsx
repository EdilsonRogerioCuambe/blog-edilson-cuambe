import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/home'
import { Post } from './pages/post'
import { AboutMe } from './pages/about'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="post/:slug" element={<Post />} />
        <Route path="/me" element={<AboutMe />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
export const router = <App />
