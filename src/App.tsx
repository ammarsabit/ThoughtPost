
import { useState } from 'react';
import BlogCard from './components/BlogCard.tsx'
import './App.css'

// const [post, setPost] = useState<{usrName: string; date: string; titile: string; tags: []}>([])

function App() {
  return (
    <div>
      <BlogCard/>
    </div>
  );
}

export default App
