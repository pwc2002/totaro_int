"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface NavbarProps {
  onLoginClick: () => void
  currentPage?: "home" | "who-we-are" | "review" | "contact" | "esg-dashboard"
  showBorder?: boolean
}

export function Navbar({ onLoginClick, currentPage, showBorder = false }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const getLinkClassName = (page: string) => {
    if (currentPage === page) {
      return "bg-black text-white px-6 py-3 rounded-none font-medium"
    }
    return "text-[#333333] hover:bg-black hover:text-white transition-all font-medium px-6 py-3"
  }

  const getMobileLinkClassName = (page: string) => {
    if (currentPage === page) {
      return "bg-black text-white px-6 py-4 font-medium block w-full text-left"
    }
    return "text-[#333333] hover:bg-black hover:text-white transition-all font-medium px-6 py-4 block w-full text-left"
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <header className={`bg-white px-6 py-4 relative z-50 ${showBorder ? 'border-b' : ''}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" onClick={closeMobileMenu}>
              <Image 
                src="/images/actfinderlogo.svg" 
                alt="ACTFINDER" 
                width={150} 
                height={40} 
                className="h-10 w-auto hover:opacity-80 transition-opacity" 
              />
            </Link>
          </div>

          {/* 데스크톱 네비게이션 */}
          <nav className="hidden md:flex items-center">
            <Link 
              href="/who-we-are" 
              className={getLinkClassName("who-we-are")}
            >
              Who We Are
            </Link>
            
            <Link 
              href="/esg-dashboard" 
              className={getLinkClassName("esg-dashboard")}
            >
              ESG
            </Link>
            
            <Link 
              href="/review" 
              className={getLinkClassName("review")}
            >
              Review
            </Link>
            
            <Link 
              href="/contact" 
              className={getLinkClassName("contact")}
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            {/* 데스크톱 로그인 버튼 */}
            <Button
              onClick={onLoginClick}
              className="hidden md:block bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white px-6 py-2 rounded-md font-medium transition-all"
            >
              로그인
            </Button>

            {/* 모바일 햄버거 메뉴 버튼 */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden flex flex-col items-center justify-center w-8 h-8 space-y-1 relative z-60"
              aria-label="메뉴 토글"
            >
              <span 
                className={`w-6 h-0.5 bg-[#333333] transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                }`}
              />
              <span 
                className={`w-6 h-0.5 bg-[#333333] transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span 
                className={`w-6 h-0.5 bg-[#333333] transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                }`}
              />
            </button>
          </div>
        </div>

        {/* 모바일 네비게이션 메뉴 */}
        <div 
          className={`md:hidden absolute top-full left-0 w-full bg-white border-t shadow-lg transition-all duration-300 z-50 ${
            isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
          }`}
        >
          <nav className="flex flex-col">
            <Link 
              href="/who-we-are" 
              className={getMobileLinkClassName("who-we-are")}
              onClick={closeMobileMenu}
            >
              Who We Are
            </Link>
            
            <Link 
              href="/esg-dashboard" 
              className={getMobileLinkClassName("esg-dashboard")}
              onClick={closeMobileMenu}
            >
              ESG
            </Link>
            
            <Link 
              href="/review" 
              className={getMobileLinkClassName("review")}
              onClick={closeMobileMenu}
            >
              Review
            </Link>
            
            <Link 
              href="/contact" 
              className={getMobileLinkClassName("contact")}
              onClick={closeMobileMenu}
            >
              Contact
            </Link>

            {/* 모바일 로그인 버튼 */}
            <div className="px-6 py-4 border-t">
              <Button
                onClick={() => {
                  onLoginClick();
                  closeMobileMenu();
                }}
                className="w-full bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white py-3 rounded-md font-medium transition-all"
              >
                로그인
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* 모바일 메뉴가 열려있을 때 배경 오버레이 */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeMobileMenu}
        />
      )}
    </>
  )
}
