"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/nav/navbar"
import { LoginModal } from "@/components/login-modal"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, MessageCircle, PenTool } from "lucide-react"

export default function ReviewPage() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <Navbar 
        onLoginClick={() => setIsLoginModalOpen(true)} 
        currentPage="review" 
        showBorder={true}
      />
      

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#333333] mb-6">당신의 리뷰를 기다립니다</h1>
          <p className="text-xl text-[#534741] max-w-3xl mx-auto">
            ACTFINDER와 함께한 경험을 공유해주세요. 여러분의 소중한 의견이 더 나은 서비스를 만들어갑니다.
          </p>
        </div>

        

        <div className="text-center mt-16">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 border-[#196188]/20 p-6">
              <CardContent className="text-center p-0">
                <div className="w-16 h-16 bg-[#196188]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-[#196188]" />
                </div>
                <h3 className="text-lg font-semibold text-[#333333] mb-2">정직한 평가</h3>
                <p className="text-[#534741]">
                  솔직하고 정직한 리뷰를 통해 서비스 개선에 도움을 주세요.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-[#196188]/20 p-6">
              <CardContent className="text-center p-0">
                <div className="w-16 h-16 bg-[#196188]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-[#196188]" />
                </div>
                <h3 className="text-lg font-semibold text-[#333333] mb-2">경험 공유</h3>
                <p className="text-[#534741]">
                  다른 고객들이 더 나은 선택을 할 수 있도록 경험을 나눠주세요.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-[#196188]/20 p-6">
              <CardContent className="text-center p-0">
                <div className="w-16 h-16 bg-[#196188]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <PenTool className="w-8 h-8 text-[#196188]" />
                </div>
                <h3 className="text-lg font-semibold text-[#333333] mb-2">간편한 작성</h3>
                <p className="text-[#534741]">
                  몇 분 안에 간단하게 리뷰를 작성할 수 있습니다.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Login Modal */}
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </div>
  )
}
