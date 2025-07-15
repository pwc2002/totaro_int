import React from 'react'

interface Benchmark {
  category: string
  industry: number
  ours: number
  maxValue: number
}

interface BenchmarkBarProps {
  data: Benchmark[]
}

export default function BenchmarkBar({ data }: BenchmarkBarProps) {
  return (
    <div className="p-6">
      <h3 className="text-xl font-medium text-gray-800 mb-6 text-center">업계 벤치마크 비교</h3>
      
      <div className="space-y-6">
        {data.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">{item.category}</span>
              <div className="flex items-center space-x-4 text-sm">
                <span className="text-blue-600">우리: {item.ours}</span>
                <span className="text-gray-500">업계: {item.industry}</span>
              </div>
            </div>
            
            <div className="relative">
              <div className="w-full bg-gray-200 rounded-full h-3">
                {/* 업계 평균 바 */}
                <div 
                  className="bg-gray-400 h-3 rounded-full absolute top-0 left-0"
                  style={{ width: `${(item.industry / item.maxValue) * 100}%` }}
                />
                {/* 우리 점수 바 */}
                <div 
                  className={`h-3 rounded-full absolute top-0 left-0 ${
                    item.ours < 20 ? 'bg-red-500' :
                    item.ours < 40 ? 'bg-orange-500' :
                    item.ours < 60 ? 'bg-yellow-500' :
                    item.ours < 80 ? 'bg-green-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${(item.ours / item.maxValue) * 100}%` }}
                />
              </div>
              
              {/* 업계 평균 표시 */}
              <div 
                className="absolute top-4 transform -translate-x-1/2"
                style={{ left: `${(item.industry / item.maxValue) * 100}%` }}
              >
                <div className="w-0.5 h-2 bg-gray-600"></div>
                <span className="text-xs text-gray-600 absolute top-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  업계평균
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 flex justify-center space-x-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded"></div>
          <span className="text-gray-600">우리 점수</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-gray-400 rounded"></div>
          <span className="text-gray-600">업계 평균</span>
        </div>
      </div>
    </div>
  )
} 