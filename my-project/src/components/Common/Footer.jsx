import React from 'react'
import { FiPhoneCall } from 'react-icons/fi'
import { IoLogoInstagram } from 'react-icons/io'
import { RiTwitterLine } from 'react-icons/ri'
import { TbBrandMeta } from 'react-icons/tb'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='border-t py-12'>
        <div className='container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0'>
            <div>
                <h3 className='text-lg text-gray-800 mb-4'>News Letter</h3>
                    <p className='text-gray-500 mb-4 '>
                        Be the first to hear about new products, exclusive events, and online offers.
                    </p>
                    <p className='font-medium text-sm text-gray-600 md-6 '>Sign up and get 10% off your first order</p>
                    <form className='flex'>
                         <input
                         type='email'
                         placeholder='"enter your email'
                         className='p-3 text-sm border-t border-l border-b border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all'
                         required
                         />
                         <button type="submit"
                         className='bg-black text-white px-6 py-3 text-sm rounded-r-md hover:bg-gray-800 transition-all'
                         >Subscribe</button>
                    </form>
               
            </div>
             <div>
                <h3 className='text-lg text-gray-800 mb-4'>Shop</h3>
                <ul className='space-y-2 text-gray-600'>
                    <li>
                        <Link to='#' className='hover:text-gray-500 transition-colors'>Men's Top ware
                        </Link>
                    </li>
                    <li>
                        <Link to='#' className='hover:text-gray-500 transition-colors'>Women's Top ware
                        </Link>
                    </li>
                    <li>
                        <Link to='#' className='hover:text-gray-500 transition-colors'>Men's Bottom ware
                        </Link>
                    </li>
                    <li>
                        <Link to='#' className='hover:text-gray-500 transition-colors'>Women's Bottom ware
                        </Link>
                    </li>

                </ul>
             </div>

            {/* Support us*/}
             <div>
                <h3 className='text-lg text-gray-800 mb-4'>Shop</h3>
                <ul className='space-y-2 text-gray-600'>
                    <li>
                        <Link to='#' className='hover:text-gray-500 transition-colors'>Contact us
                        </Link>
                    </li>
                    <li>
                        <Link to='#' className='hover:text-gray-500 transition-colors'>About us
                        </Link>
                    </li>
                    <li>
                        <Link to='#' className='hover:text-gray-500 transition-colors'>FAQs
                        </Link>
                    </li>
                    <li>
                        <Link to='#' className='hover:text-gray-500 transition-colors'>Features
                        </Link>
                    </li>

                </ul>
             </div>
             {/*Follow us */}
             <div>
                <h3 className='text-lg text-gray-800 mb-4'>Follow Us</h3>
                <div className='flex items-center space-x-4 mb-6'>
                    <a href="https://www.facebook.com"
                    target='_blank'
                    rel="noopener noreferrer"
                    className='hover:text-gray-500'
                    >
                   <TbBrandMeta className='w-6 h-6'/>

                    </a>

                    <a href="https://www.facebook.com"
                    target='_blank'
                    rel="noopener noreferrer"
                    className='hover:text-gray-500'
                    >
                   <IoLogoInstagram className='w-6 h-6'/>

                    </a>

                    <a href="https://www.facebook.com"
                    target='_blank'
                    rel="noopener noreferrer"
                    className='hover:text-gray-500'
                    >
                   <RiTwitterLine className='w-6 h-6'/>

                    </a>

                </div>
                <p className='text-gray-500'>Call us</p>
                <p>
                    <FiPhoneCall className='w-6 h-6 inline-block mr-2' />1234-567-89
                </p>
             </div>


        </div>
        {/* {Footer Bottom>} */}
        <div className='container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-200 pt-6'>
            <p className='text-gray-500 text-sm tracking-tighter text-center'>©2025, compileTab. All Rights Reserved.

            </p>

        </div>


    </footer>
  )
}

export default Footer