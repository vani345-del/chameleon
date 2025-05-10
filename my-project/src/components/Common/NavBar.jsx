import React, { useState } from 'react'
import { HiOutlineShoppingBag, HiOutlineUser } from 'react-icons/hi'
import { HiBars3BottomRight } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'
import CartDrawer from '../Layout/CartDrawer'
import { IoMdClose } from 'react-icons/io'
import { useSelector } from 'react-redux'

const NavBar = () => {
   const [draweropen,setDrawer]=useState(false);
   const [toggle3bar,setToggle3bar]=useState(false);
   const {cart}=useSelector((state)=>state.cart);
   const {user}=useSelector((state)=>state.auth)

   const cartItemCount=cart?.products?.reduce((total,product)=> total+product.quantity, 0||0);


     const handletogglebar3=()=>{
          setToggle3bar(!toggle3bar);
     }
  
      const toggleDrawer=()=>{
          setDrawer(!draweropen)
      }
  return (
    <>
   <nav className='flex justify-between items-center p-4'>
     <div>
      <Link to='/' className='text-2xl font-medium'>
      Chemeleon
      </Link>
     </div>
     <div className='hidden md:flex space-x-6'>
      <Link to="/collections/all?gender=Men" className='text-gray-700 hover:text-black text-sm font-medium uppercase'>
      Men
      </Link>
      <Link to="/collections/all?gender=Women" className='text-gray-700 hover:text-black text-sm font-medium uppercase'>
      Women
      </Link>
      <Link to="/collections/all?category=Top Wear" className='text-gray-700 hover:text-black text-sm font-medium uppercase'>
      Topware
      </Link>
      <Link to= "/collections/all?category=Bottom Wear" className='text-gray-700 hover:text-black text-sm font-medium uppercase'>
      Bottom ware
      </Link>
     </div>
     {/* right icons */}
     <div className='flex items-center space-x-4'>
      {user && user.role==="admin" &&(
        <Link to='/admin' className='block bg-black px-2 rounded text-sm text-white'>Admin</Link>
      )}
      
      <Link to='/profile' className='hover:text-black'>
      <HiOutlineUser className='h-6 w-6 text-gray-700'/>
      </Link>

      <button onClick={toggleDrawer}  className='relative hover:text-black'>
      <HiOutlineShoppingBag className='h-6 w-6 text-gray-700'/>
      {cartItemCount>0 && (
        <span className='absolute -top-1 bg-[#ea2e0e]  text-white text-xs rounded-full px-2 py-0.5'>
          {cartItemCount}
        </span>
      )}
      </button>
      <div className='overflow-hidden'>
      <SearchBar/>
      </div>
   

      <button onClick={handletogglebar3} className='md:hidden'>
      <HiBars3BottomRight className='h-6 w-6 text-gray-700'/>
      </button>
         
     </div>
   </nav>
     <CartDrawer toggleDrawer={toggleDrawer} draweropen={draweropen}/>
     <div className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${toggle3bar ? "translate-x-0":"-translate-x-full"}`}>
     <div className='flex justify-end p-4'>
      <button onClick={handletogglebar3}>
        <IoMdClose className='h-6 w-6 text-gray-600'/>
      </button>
     </div>
     <div className='p-4'>
      <h2 className='text-xl font-semibold mb-4'>Menu</h2>
      <nav className='space-y-4'>
        <Link
        to="/collections/all?gender=Men"
        onClick={ handletogglebar3}
        className='block text-gray-600 hover:text-black'
        >
          Men
        </Link>

        <Link
        to="/collections/all?gender=Women"
        onClick={ handletogglebar3}
        className='block text-gray-600 hover:text-black'
        >
           Women
        </Link>

        <Link
        to="/collections/all?category=Top Wear"
        onClick={ handletogglebar3}
        className='block text-gray-600 hover:text-black'
        >
          Topware
        </Link>

        <Link
        to="/collections/all?category=Bottom Wear"
        onClick={ handletogglebar3}
        className='block text-gray-600 hover:text-black'
        >
          BottomWare
        </Link>

      </nav>

     </div>
     </div>

     </>
  )
}

export default NavBar