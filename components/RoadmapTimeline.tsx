import React from 'react'
import { RoadmapItem } from '@/types/esg'

interface RoadmapTimelineProps {
  data: RoadmapItem[]
}

export default function RoadmapTimeline({ data }: RoadmapTimelineProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500'
      case 'in-progress': return 'bg-blue-500'
      case 'upcoming': return 'bg-gray-300'
      default: return 'bg-gray-300'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return '완료'
      case 'in-progress': return '진행중'
      case 'upcoming': return '예정'
      default: return '예정'
    }
  }

  return (
    <div className="p-6">
      <div className="space-y-8">
        {data.map((item, index) => (
          <div key={item.id} className="flex items-start space-x-4">
            {/* 타임라인 점 */}
            <div className="flex flex-col items-center">
              <div className={`w-4 h-4 rounded-full ${getStatusColor(item.status)}`}></div>
              {index < data.length - 1 && (
                <div className="w-0.5 h-16 bg-gray-200 mt-2"></div>
              )}
            </div>
            
            {/* 콘텐츠 */}
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-medium text-gray-900">{item.title}</h4>
                                 <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                   item.status === 'completed' ? 'bg-green-100 text-green-800' :
                   item.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                   'bg-gray-100 text-gray-800'
                 }`}>
                  {getStatusText(item.status)}
                </span>
              </div>
              
              <p className="text-gray-600 text-sm">{item.description}</p>
              
              <div className="flex items-center space-x-4 text-sm">
                <span className="text-gray-500">목표일: {item.date}</span>
                {item.progress > 0 && (
                  <span className="text-blue-600">진행률: {item.progress}%</span>
                )}
              </div>
              
              {item.progress > 0 && (
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 