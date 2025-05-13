import React, { useState } from 'react'
import { HiMagnifyingGlass, HiMiniXCircle } from 'react-icons/hi2';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setFilters,fetchProductsByFilters } from '../../redux/slices/productsSlice';

const SearchBar = () => {
  const [searchbar,setsearchbar]=useState('');
  const [isopen,setIsOpen]=useState(false);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  

  const searchHandler=()=>{
    setIsOpen(!isopen)
  }


  const handleSearchbar=(e)=>{
    e.preventDefault();
    dispatch(setFilters({search:searchbar}));
    dispatch(fetchProductsByFilters({search:searchbar}));
    navigate(`/collections/all?search=${searchbar}`)
    setIsOpen(false)
  }

  
  return (
    <div className={`flex items-center justify-center w-full transition-all duration-300 ${isopen ? "absolute top-0 left-0 w-full bg-white h-24 z-50":"w-auto"}`}>
    {isopen ? (
      <form onSubmit={handleSearchbar}
      className='relative flex justify-center items-center w-full'>
      <div className='relative w-1/2'>
      <input type='text' placeholder='search...' value={searchbar}
       onChange={(e)=>setsearchbar(e.target.value)}
       className='bg-gray-100 px-4 py-2 pr-12 pl-2 rounded-lg focus:outline-none w-full placeholder:text-gray-700'/>
      <button type='submit' className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800'>
        <HiMagnifyingGlass className='h-6 w-6'/>
      </button>
      </div>
      <button type='button'
      onClick={searchHandler}
      className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800'
      >
        <HiMiniXCircle className='h-6 w-6'/>

      </button>
    </form>):(
      <button onClick={searchHandler}>
        <HiMagnifyingGlass className='h-6 w-6'/>
        </button>
    )}
    </div>
  )
}

export default SearchBar