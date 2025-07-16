"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/nav/navbar"
import { LoginModal } from "@/components/login-modal"

export default function HomePage() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-black">
      {/* Navbar */}
      <Navbar onLoginClick={() => setIsLoginModalOpen(true)} />

      {/* Hero Section */}
      <main className="relative min-h-[calc(100vh-80px)] flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-background.png"
            alt="Professional workspace with dual monitors showing development environment"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-12 !leading-tight">
            당신의 상상력을 자극할 수십개의 아이디어
            <br />
            지금 만나보세요
          </h1>

          <Link href="/who-we-are">
            <Image
              src="/images/about-button.png"
              alt="About us"
              width={200}
              height={60}
              className="hover:scale-105 transition-transform cursor-pointer mx-auto"
            />
          </Link>
        </div>
      </main>

      {/* Login Modal */}
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </div>
  )
}
