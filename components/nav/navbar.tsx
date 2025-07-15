"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface NavbarProps {
  onLoginClick: () => void
  currentPage?: "home" | "who-we-are" | "review" | "contact" | "esg-dashboard"
  showBorder?: boolean
}

export function Navbar({ onLoginClick, currentPage, showBorder = false }: NavbarProps) {
  const getLinkClassName = (page: string) => {
    if (currentPage === page) {
      return "bg-black text-white px-6 py-3 rounded-none font-medium"
    }
    return "text-[#333333] hover:bg-black hover:text-white transition-all font-medium px-6 py-3"
  }

  return (
    <header className={`bg-white px-6 py-4 ${showBorder ? 'border-b' : ''}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <Image 
              src="/images/actfinderlogo.svg" 
              alt="ACTFINDER" 
              width={150} 
              height={40} 
              className="h-10 w-auto hover:opacity-80 transition-opacity" 
            />
          </Link>
        </div>

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

        <Button
          onClick={onLoginClick}
          className="bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white px-6 py-2 rounded-md font-medium transition-all"
        >
          로그인
        </Button>
      </div>
    </header>
  )
}
