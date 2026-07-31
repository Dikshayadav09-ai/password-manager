import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './assets/components/navbar/Navbar'
import Passmanajer from './assets/components/passwordMAnager/Passmanajer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='main bg-zinc-900 min-h-screen'>
    <Navbar/>
    <Passmanajer/>
    </div>
  )
}

export default App
