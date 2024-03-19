
const Navbar:React.FC  = () => {
  
  return (
    <div className="flex h-[8vh] bg-stone-950  fixed w-full">
        <div className=' ms-8'>
            <img className=' w-[10vh]' src="https://cdn.dribbble.com/users/4542449/screenshots/14435668/artboard_8.png" alt="" />
        </div>
        <div className='h-[100%] flex w-full me-[17vh] justify-center relative '>
            <input className=' h-[70%] w-[40vh]  rounded-2xl p-4 outline-none border-none mt-2  ' type="search" placeholder='Search ...'  />
            <input className=' bg-white  p-2 border-l-2 shadow-2xl rounded-2xl absolute top-2 left-[105vh]' type="submit" />
        </div>
        <div>
          
        </div>
    </div>
  )
}

export default Navbar;