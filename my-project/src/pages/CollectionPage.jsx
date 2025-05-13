import React, { useEffect, useRef, useState } from 'react'
import { FaFilter } from 'react-icons/fa';
import FilterSdeBar from '../components/Products/FilterSdeBar';
import SortOptions from '../components/Products/SortOptions';
import ProductGrid from '../components/Products/ProductGrid';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByFilters } from '../redux/slices/productsSlice';
const CollectionPage = () => {
  const { collection }=useParams();
  const [searchParams]=useSearchParams();
  const dispatch=useDispatch();
  const {products,loading,error}=useSelector((state)=>state.products);
  const queryParams=Object.fromEntries([...searchParams]);
 
  const sideRef=useRef(null);
 

  const [isSidebarOpen,setIsSideBarOpen]=useState(false);

  useEffect(() => {
    const allParams = { collection, ...Object.fromEntries([...searchParams]) };
  
    // Remove empty values
    const cleanedParams = Object.fromEntries(
      Object.entries(allParams).filter(([_, v]) => v?.trim?.() !== "")
    );
  
    
  
    dispatch(fetchProductsByFilters(cleanedParams));
  }, [dispatch, collection, searchParams]);
  
  

  useEffect(() => {
    dispatch(fetchProductsByFilters({ collection,...queryParams })); // replace with your real collection
  }, [dispatch, collection,searchParams]);

  useEffect(() => {
    console.log("Loading:", loading);
    console.log("Error:", error);
  }, [products, loading, error]);

  const toggleSideBar=()=>{
    setIsSideBarOpen(!isSidebarOpen);

  }
  const handleClickOutside=(e)=>{
      if(sideRef.current && !sideRef.current.contains(e.target)){
        setIsSideBarOpen(false);
      }
  }
  useEffect(()=>{
    document.addEventListener("mousedown",handleClickOutside);
    return()=>{
      document.removeEventListener("mousedown",handleClickOutside);
    }
   

  },[]);

  


 

  
  return (
    <div className="flex flex-col lg:flex-row">
      {/* mobile filte button */}
      <button onClick={toggleSideBar}className="lg:hidden border p-2 flex justify-center items-center">
        <FaFilter className='mr-2'/>Filters
      </button>
      {/* filter sidebar */}
      <div ref={sideRef} className={`${isSidebarOpen ? "translate-x-0":"-translate-x-full"} fixed inset-y-0 z-50 left-0 w-60 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}>
        <FilterSdeBar/>
      </div>
      <div className="flex-grow p-4">
        <h2 className="text-2xl uppercase mb-4">All Collection</h2>
        {/* sort Option */}
        <SortOptions/>

         {/* product Grid */}

         <ProductGrid products={products} loading={loading} error={error}/>
      </div>
    </div>
  )
}

export default CollectionPage