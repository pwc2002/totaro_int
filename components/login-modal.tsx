"use client"
import Image from "next/image"
import { X } from "lucide-react"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl p-8 w-full max-w-md mx-4 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {/* Content */}
        <div className="text-center">
          {/* Title */}
          <h2 className="text-2xl font-bold text-[#333333] mb-8">로그인</h2>

          {/* Logo */}
          <div className="mb-6">
            <Image src="/images/actfinderlogo.svg" alt="ACTFINDER" width={120} height={120} className="mx-auto" />
          </div>

          {/* Subtitle */}
          <p className="text-[#534741] mb-8 text-sm">ACTFINDER 서비스를 이용하기 위해 로그인이 필요합니다</p>

          {/* Login Buttons with Blur Overlay */}
          <div className="relative">
            <div className="space-y-3 blur-sm">
              <button className="w-full" disabled>
                <Image
                  src="/images/naver-button.png"
                  alt="네이버로 시작하기"
                  width={300}
                  height={50}
                  className="w-full"
                />
              </button>

              <button className="w-full" disabled>
                <Image
                  src="/images/kakao-button.png"
                  alt="카카오로 시작하기"
                  width={300}
                  height={50}
                  className="w-full"
                />
              </button>
            </div>
            
            {/* Overlay Message */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg px-6 py-3 border border-gray-200 shadow-lg">
                <p className="text-[#534741] font-medium text-sm">추후 업데이트 예정</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
