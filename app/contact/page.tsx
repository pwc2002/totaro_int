"use client"

import { useState } from "react"
import { Navbar } from "@/components/nav/navbar"
import { LoginModal } from "@/components/login-modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Phone, Mail, MapPin, Clock, Loader2, CheckCircle, XCircle, ArrowLeft } from "lucide-react"

// ContactPage 컴포넌트 import
import ContactPageComponent from "./contactPage"

interface FormData {
  name: string
  phone: string
  email: string
  inquiryType: string
  message: string
}

export default function ContactPage() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [showEventForm, setShowEventForm] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    inquiryType: '일반 문의',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })
  const [isResultModalOpen, setIsResultModalOpen] = useState(false)

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      const response = await fetch('/internal/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: '문의가 성공적으로 전송되었습니다. 빠른 시일 내에 답변드리겠습니다.'
        })
        setIsResultModalOpen(true)
        setFormData({
          name: '',
          phone: '',
          email: '',
          inquiryType: '일반 문의',
          message: ''
        })
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.error || '문의 전송 중 오류가 발생했습니다.'
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

  // 행사 신청 페이지를 보여줄 때
  if (showEventForm) {
    return (
      <div>
        <ContactPageComponent />
        <Button 
          onClick={() => setShowEventForm(false)}
          className="fixed top-20 left-6 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 z-10"
          variant="outline"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          뒤로 가기
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <Navbar 
        onLoginClick={() => setIsLoginModalOpen(true)} 
        currentPage="contact" 
        showBorder={true}
      />

      {/* Hero Section */}
      <div className="bg-gray-50 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            행사 운영의 모든 것을 한 곳에서 해결하세요
          </h1>
          <p className="text-xl text-gray-600 mb-10">
            전문 담당자와의 상담부터 행사 기획, 운영까지 원스톱 서비스를 제공합니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => setShowEventForm(true)}
              className="bg-black hover:bg-gray-800 text-white px-8 py-3 text-lg"
            >
              + 행사 신청하기
            </Button>
            <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 text-lg">
              📞 담당자 연락하기
            </Button>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Side - Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">담당자에게 연락하기</h2>
              <p className="text-gray-600 mb-8">
                궁금한 사항이나 상담이 필요하시면 언제든지 연락주세요. 전문 담당자가 신속하게 답변드리겠습니다.
              </p>

              <div className="space-y-6">
                {/* Phone Contact */}
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">전화 상담</h3>
                    <p className="text-lg font-medium text-gray-900">02-1234-5678</p>
                    <p className="text-sm text-gray-600">평일 09:00 - 18:00</p>
                  </div>
                </div>

                {/* Email Contact */}
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">이메일 문의</h3>
                    <p className="text-lg font-medium text-gray-900">contact@eventhub.co.kr</p>
                    <p className="text-sm text-gray-600">24시간 접수 가능</p>
                  </div>
                </div>

                {/* Visit */}
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">현장 출장 시간</h3>
                    <p className="text-lg font-medium text-gray-900">24시간 이내</p>
                    <p className="text-sm text-gray-600">위치제한 기준</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">이름</label>
                    <Input 
                      placeholder="홍길동" 
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">연락처</label>
                    <Input 
                      placeholder="010-1234-5678" 
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      required
                      className="w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">이메일</label>
                  <Input 
                    type="email" 
                    placeholder="example@email.com" 
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">문의 유형</label>
                  <select 
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.inquiryType}
                    onChange={(e) => handleInputChange('inquiryType', e.target.value)}
                  >
                    <option>일반 문의</option>
                    <option>행사 기획</option>
                    <option>행사 운영</option>
                    <option>마케팅 지원</option>
                    <option>기타</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">문의 내용</label>
                  <Textarea 
                    placeholder="문의하실 내용을 상세히 적어주세요." 
                    rows={4} 
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    required
                    className="w-full"
                  />
                </div>

                <Button 
                  type="submit"
                  className="w-full bg-black hover:bg-gray-800 text-white py-3 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  disabled={isSubmitting || !formData.name || !formData.phone || !formData.email || !formData.message}
                >
                  {isSubmitting ? '전송 중...' : '✈️ 문의 보내기'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {isSubmitting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 flex flex-col items-center space-y-4">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            <p className="text-gray-900 font-medium">문의를 전송 중입니다...</p>
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
              {submitStatus.type === 'success' ? '문의 전송 완료' : '문의 전송 실패'}
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
