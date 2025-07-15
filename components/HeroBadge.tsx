import React from 'react'

interface HeroBadgeProps {
  lastUpdated: string
  reportUrl: string
}

export default function HeroBadge({ lastUpdated, reportUrl }: HeroBadgeProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-blue-200">
      <div className="flex items-center justify-center space-x-4">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900">ESG 진단 완료</h3>
          <p className="text-sm text-gray-500">최종 업데이트: {lastUpdated}</p>
          <a 
            href={reportUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-sm underline"
          >
            원본 보고서 보기
          </a>
        </div>
      </div>
    </div>
  )
} 