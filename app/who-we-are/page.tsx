"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/nav/navbar"
import { LoginModal } from "@/components/login-modal"

export default function WhoWeArePage() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <Navbar 
        onLoginClick={() => setIsLoginModalOpen(true)} 
        currentPage="who-we-are"
      />

      {/* Hero Banner */}
      <div className="w-full -mt-px">
        <Image
          src="/images/top-hook.png"
          alt="당신의 재능, 우리가 함께 디자인합니다"
          width={1920}
          height={60}
          className="w-full h-auto"
        />
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}


        {/* Our Crew Title Image */}
        <div className="mb-12">
          <Image
            src="/images/Ourcrew.svg"
            alt="Our crew"
            width={226}
            height={54}
            className=""
          />
        </div>

        {/* Team Members Section - Vertical Layout */}
        <div className="mb-16 space-y-8">
          {/* Profile 1 */}
          <div className="flex justify-center">
            
              <Image
                src="/images/junbin.png"
                alt="Designer - 남은 순간 이상하게, 쓰는 순간 부드럽게"
                width={800}
                height={300}
                className="w-full max-w-4xl h-auto"
              />
            
          </div>
          
          {/* Profile 2 */}
          <div className="flex justify-center">
            <Link href="https://www.songseungju.dev/" target="_blank" rel="noopener noreferrer" className="cursor-pointer transition-transform hover:scale-105">
              <Image
                src="/images/seungju.png"
                alt="Developer - 기능은 정확하게, 화풀는 몸짓 없이"
                width={800}
                height={300}
                className="w-full max-w-4xl h-auto"
              />
            </Link>
          </div>
          
          {/* Profile 3 */}
          <div className="flex justify-center">
            
              <Image
                src="/images/taejun.png"
                alt="Product - 프로젝트에 잠든 구죽, 개월은 이미 시작입니다"
                width={800}
                height={300}
                className="w-full max-w-4xl h-auto"
              />
            
          </div>

          {/* Profile 4 */}
          <div className="flex justify-center">
            
              <Image
                src="/images/woochan.png"
                alt="Woochan Profile"
                width={800}
                height={300}
                className="w-full max-w-4xl h-auto"
              />
            
          </div>

          {/* Profile 5 */}
          <div className="flex justify-center">
            <Link href="https://sangjune-portfolio.vercel.app/" target="_blank" rel="noopener noreferrer" className="cursor-pointer transition-transform hover:scale-105">
              <Image
                src="/images/sangjune2.png"
                alt="Sangjune Profile"
                width={800}
                height={300}
                className="w-full max-w-4xl h-auto"
              />
            </Link>
          </div>
        </div>

        {/* Company Vision Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#333333] mb-6">
            Our Vision
          </h2>
          <p className="text-lg text-[#666666] max-w-4xl mx-auto leading-relaxed">
            ACTFINDER는 개인과 기업의 브랜드 가치를 높이고, 
            더 나은 첫인상을 통해 성공적인 관계를 구축할 수 있도록 지원합니다.
          </p>
        </div>
      </main>

      {/* Login Modal */}
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </div>
  )
}
