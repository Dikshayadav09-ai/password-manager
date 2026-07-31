import React from 'react'

const Navbar = () => {
  return (
    <div className='h-[10vh] w-full bg-zinc-800 text-yellow-50 p-1 flex items-center justify-between'>
      <div className='ml-5'>
        <h1 className='text-2xl'>Pass<p className='text-green-400 inline'>OP</p> </h1>
      </div>
      <div className='mr-20 text-yellow-50'>
        <ul className='flex gap-8 text-xl'>
          <a href=""><li>Home</li></a>
          <a href=""><li>About</li></a>
          <a href=""><li>Contact</li></a>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
