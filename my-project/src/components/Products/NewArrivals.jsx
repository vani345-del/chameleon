import React, { useEffect, useRef, useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import axios from "axios"

const NewArrivals = () => {
    const scrollRef=useRef(null);
    const[isDragging,setIsDragging]=useState(false);
    const [startX,setStartX]=useState(0);
    const [scrollLeft,setScrollLeft]=useState(false);
    const [canScrollLeft,setCanScrollleft]=useState(false);
    const [canScrollRight,setCanscrollright]=useState(true);

    const [newArrivals,setNewArrivals]=useState([]);
    useEffect(()=>{
        const fetchNewArrivals=async()=>{
            try {
                const response=await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`
                );
                setNewArrivals(response.data)
            } catch (error) {
                console.error(error)
                
            }
        };
        fetchNewArrivals();
    },[])
    const newarrivals=[
        {
            _id:'1',
            name:"style jacket",
            price:120,
            image:[
                {
                    url:"https://picsum.photos/500/500?random=1",
                    altText:"Style jacket"
                },
            ],
        },
        {
            _id:'2',
            name:"style jacket",
            price:120,
            image:[
                {
                    url:"https://picsum.photos/500/500?random=2",
                    altText:"Style jacket"
                },
            ],
        },
        {
            _id:'3',
            name:"style jacket",
            price:120,
            image:[
                {
                    url:"https://picsum.photos/500/500?random=3",
                    altText:"Style jacket"
                },
            ],
        },
        {
            _id:'4',
            name:"style jacket",
            price:120,
            image:[
                {
                    url:"https://picsum.photos/500/500?random=4",
                    altText:"Style jacket"
                },
            ],
        },
        {
            _id:'5',
            name:"style jacket",
            price:120,
            image:[
                {
                    url:"https://picsum.photos/500/500?random=5",
                    altText:"Style jacket"
                },
            ],
        },
        {
            _id:'6',
            name:"style jacket",
            price:120,
            image:[
                {
                    url:"https://picsum.photos/500/500?random=6",
                    altText:"Style jacket"
                },
            ],
        },
        {
            _id:'7',
            name:"style jacket",
            price:120,
            image:[
                {
                    url:"https://picsum.photos/500/500?random=7",
                    altText:"Style jacket"
                },
            ],
        },
        {
            _id:'8',
            name:"style jacket",
            price:120,
            image:[
                {
                    url:"https://picsum.photos/500/500?random=8",
                    altText:"Style jacket"
                },
            ],
        },
    ];

    const handleMouseDown=(e)=>{
        setIsDragging(true);
        setStartX(e.pageX-scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);

    };

    const handleMouseMove=(e)=>{
        if(!isDragging) return;
        const x=e.pageX-scrollRef.current.offsetLeft;
        const walk=x-startX;
        scrollRef.current.scrollLeft=scrollLeft-walk;
        
    }

    const handleMouseUpOrLeave=()=>{
        setIsDragging(false);
    }
    
    const scroll=(direction)=>{
        const scrollAmount=direction==="left" ? -300:300;
        scrollRef.current.scrollBy({left:scrollAmount,behaviour:"smooth"});
    }

    //update scroll buttons

    const updateSCrollButtons=()=>{
        const container=scrollRef.current;
        if(container){
            const leftScroll=container.scrollLeft;
            const rightScrollable=container.scrollWidth>leftScroll+container.clientWidth;

            setCanScrollleft(leftScroll>0);
            setCanscrollright(rightScrollable)
        }

    }



    useEffect(()=>{
        const container=scrollRef.current;
        if(container){
           container.addEventListener("scroll",updateSCrollButtons);
           updateSCrollButtons();
           return ()=>container.removeEventListener("scroll",updateSCrollButtons)
        }
    },[newArrivals])
  return (
    <section className='py-16 px-4 lg:px-0'>
        <div className="conatiner mx-auto text-center mb-10 relative">
            <h2 className="text-3xl font-bold mb-4">Explore New Arrivals</h2>
            <p className="text-lg text-gray-600 mb-8">
                Discover the latest styles straight off the runway ,freshly added to keep your wardrobe on thecutting edge of fashion.
            </p>

        {/* scrolling buttons */}
        <div className="absolute right-0 bottom-[-30px] flex space-x-2">
            <button onClick={()=>scroll("left")}
            disabled={!canScrollLeft}
            className={`p-2 rounded border ${canScrollLeft ? "bg-white text-black":"bg-gray-200 text-gray-400 cursor-not-allowed"}`}>

                <FiChevronLeft className='text-2xl'/>
            </button>
            <button onClick={()=>scroll("right")}
              disabled={!canScrollRight}
            className={`p-2 rounded border ${canScrollRight ? "bg-white text-black":"bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
            
                <FiChevronRight className='text-2xl'/>
            </button>
        </div>
        </div>
        {/* scrollable content */}
        <div ref={scrollRef}
         className={`container mx-auto overflow-x-scroll flex space-x-6 relative${isDragging ? "cursor-grabbing":"cursor-grab"}`}
         onMouseDown={handleMouseDown}
         onMouseMove={handleMouseMove}
         onMouseUp={handleMouseUpOrLeave}
         onMouseLeave={handleMouseUpOrLeave}
         >

            {newarrivals.map((product)=>(
                <div key={product._id} 
                className='min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative'>
                    <img src={product.image[0]?.url} alt={product.image[0]?.altText|| product.name} 
                    draggable="false"
                    className='w-full h-[500px]  object-cover rounded-lg'/>
                    <div className="absolute bottom-0 left-0 right-0 bg-opacity-50 backdrop-blur-md text-white p-4 rounded-b-lg">
                        <Link to={`/product/${product._id}`} className='block'>
                        <h4 className="font-medium">{product.name}</h4>
                        <p className='mt-1'>${product.price}</p>
                        </Link>
                    </div>
                </div>
            ))}
        </div>

    </section>
  )
}

export default NewArrivals