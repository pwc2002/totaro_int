"use client"

import { useState } from "react"
import { Navbar } from "@/components/nav/navbar"
import { LoginModal } from "@/components/login-modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Calendar, Loader2, CheckCircle, XCircle, Mail } from "lucide-react"
import Image from "next/image"

interface EventFormData {
  eventName: string
  eventType: string
  expectedAttendees: string
  budgetRange: string
  preferredDate: string
  eventLocation: string
  eventDescription: string
  agreeToTerms: boolean
}

export default function ContactPage() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [formData, setFormData] = useState<EventFormData>({
    eventName: '',
    eventType: '컨퍼런스',
    expectedAttendees: '50명 이하',
    budgetRange: '500만원 이하',
    preferredDate: '',
    eventLocation: '서울',
    eventDescription: '',
    agreeToTerms: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })
  const [isResultModalOpen, setIsResultModalOpen] = useState(false)

  const handleInputChange = (field: keyof EventFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.agreeToTerms) {
      alert('개인정보 수집 및 이용에 동의해주세요.')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      const response = await fetch('/internal/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventName: formData.eventName,
          eventType: formData.eventType,
          expectedAttendees: formData.expectedAttendees,
          budgetRange: formData.budgetRange,
          preferredDate: formData.preferredDate,
          eventLocation: formData.eventLocation,
          eventDescription: formData.eventDescription
        }),
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: '행사 운영 신청이 성공적으로 전송되었습니다. 빠른 시일 내에 담당자가 연락드리겠습니다.'
        })
        setIsResultModalOpen(true)
        setFormData({
          eventName: '',
          eventType: '컨퍼런스',
          expectedAttendees: '50명 이하',
          budgetRange: '500만원 이하',
          preferredDate: '',
          eventLocation: '서울',
          eventDescription: '',
          agreeToTerms: false
        })
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.error || '신청 전송 중 오류가 발생했습니다.'
        })
        setIsResultModalOpen(true)
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: '네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
      })
      setIsResultModalOpen(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const teamMembers = [
    {
      name: '윤태준',
      role: '프로젝트 매니저',
      avatar: '/images/profile1.png'
    },
    {
      name: '박우찬',
      role: '크리에이티브 디렉터',
      avatar: '/images/profile2.png'
    },
    {
      name: '강우석',
      role: '이벤트 플래너',
      avatar: '/images/profile3.png'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar 
        onLoginClick={() => setIsLoginModalOpen(true)} 
        currentPage="contact" 
        showBorder={true}
      />

      {/* Main Content */}
      <div className="py-16 px-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">행사 운영 신청</h1>
            <p className="text-lg text-gray-600">간단한 정보 입력으로 행사 운영을 신청하세요</p>
          </div>

          {/* Event Application Form */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-16">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 행사명 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">행사명</label>
                  <Input 
                    placeholder="행사 이름을 입력하세요" 
                    value={formData.eventName}
                    onChange={(e) => handleInputChange('eventName', e.target.value)}
                    required
                    className="w-full"
                  />
                </div>

                {/* 행사 유형 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">행사 유형</label>
                  <select 
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.eventType}
                    onChange={(e) => handleInputChange('eventType', e.target.value)}
                  >
                    <option>컨퍼런스</option>
                    <option>세미나</option>
                    <option>워크샵</option>
                    <option>전시회</option>
                    <option>파티/연회</option>
                    <option>기타</option>
                  </select>
                </div>

                {/* 예상 참석자 수 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">예상 참석자 수</label>
                  <select 
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.expectedAttendees}
                    onChange={(e) => handleInputChange('expectedAttendees', e.target.value)}
                  >
                    <option>50명 이하</option>
                    <option>50-100명</option>
                    <option>100-300명</option>
                    <option>300-500명</option>
                    <option>500명 이상</option>
                  </select>
                </div>

                {/* 예산 범위 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">예산 범위</label>
                  <select 
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.budgetRange}
                    onChange={(e) => handleInputChange('budgetRange', e.target.value)}
                  >
                    <option>500만원 이하</option>
                    <option>500만원 - 1,000만원</option>
                    <option>1,000만원 - 3,000만원</option>
                    <option>3,000만원 - 5,000만원</option>
                    <option>5,000만원 이상</option>
                  </select>
                </div>

                {/* 희망 일정 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">희망 일정</label>
                  <div className="relative">
                    <Input 
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                      required
                      className="w-full"
                    />
                  </div>
                </div>

                {/* 행사 지역 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">행사 지역</label>
                  <select 
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.eventLocation}
                    onChange={(e) => handleInputChange('eventLocation', e.target.value)}
                  >
                    <option>서울</option>
                    <option>부산</option>
                    <option>대구</option>
                    <option>인천</option>
                    <option>광주</option>
                    <option>대전</option>
                    <option>울산</option>
                    <option>경기도</option>
                    <option>기타</option>
                  </select>
                </div>
              </div>

              {/* 행사 상세설명 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">행사 상세설명</label>
                <Textarea 
                  placeholder="행사의 목적, 주요 내용, 특별 요구사항 등을 상세히 설명해주세요." 
                  rows={4} 
                  value={formData.eventDescription}
                  onChange={(e) => handleInputChange('eventDescription', e.target.value)}
                  required
                  className="w-full"
                />
              </div>

              {/* 개인정보 동의 */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="agreeToTerms" className="text-sm text-gray-700">
                  개인정보 수집 및 이용에 동의합니다.
                </label>
              </div>

              {/* 신청하기 버튼 */}
              <Button 
                type="submit"
                className="w-full bg-black hover:bg-gray-800 text-white py-3 disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={isSubmitting || !formData.eventName || !formData.preferredDate || !formData.eventDescription || !formData.agreeToTerms}
              >
                {isSubmitting ? '신청 중...' : '신청하기'}
              </Button>
            </form>
          </div>

          {/* 전문 담당자팀 */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">전문 담당자팀</h2>
            <p className="text-lg text-gray-600">어려운 일 아이팀을 성공으로 이끌어드립니다</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{member.role}</p>
                <Button 
                  variant="outline" 
                  className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  연락하기
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {isSubmitting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 flex flex-col items-center space-y-4">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            <p className="text-gray-900 font-medium">신청을 전송 중입니다...</p>
          </div>
        </div>
      )}

      {/* Result Modal */}
      <Dialog open={isResultModalOpen} onOpenChange={setIsResultModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center justify-center mb-4">
              {submitStatus.type === 'success' ? (
                <CheckCircle className="w-16 h-16 text-green-500" />
              ) : (
                <XCircle className="w-16 h-16 text-red-500" />
              )}
            </div>
            <DialogTitle className="text-center text-xl">
              {submitStatus.type === 'success' ? '신청 완료' : '신청 실패'}
            </DialogTitle>
            <DialogDescription className="text-center text-gray-600 mt-4">
              {submitStatus.message}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-6">
            <Button 
              onClick={() => setIsResultModalOpen(false)}
              className="bg-black hover:bg-gray-800 text-white px-8"
            >
              확인
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Login Modal */}
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </div>
  )
}
