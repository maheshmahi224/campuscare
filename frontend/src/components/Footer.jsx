import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <img 
              src="https://www.aksharaedu.in/assets/vsoft-logo.png" 
              alt="V Soft Logo" 
              className="h-8 w-8"
            />
            <span className="text-sm">
              Designed & Developed by <span className="font-semibold">V Soft</span>
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span>📞</span>
            <a href="tel:9014243908" className="hover:text-blue-400 transition">
              9014243908
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
