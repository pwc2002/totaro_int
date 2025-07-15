'use client'

import React from 'react'

interface EsgScore {
  subject: string
  value: number
  maxValue: number
}

interface EsgRadarProps {
  data: EsgScore[]
}

export default function EsgRadar({ data }: EsgRadarProps) {
  const maxRadius = 100
  const center = 120
  const angleStep = (Math.PI * 2) / data.length

  const getColor = (value: number) => {
    if (value < 20) return 'stroke-red-500'
    if (value < 40) return 'stroke-orange-500'
    if (value < 60) return 'stroke-yellow-500'
    if (value < 80) return 'stroke-green-500'
    return 'stroke-blue-500'
  }

  const getPoint = (index: number, radius: number) => {
    const angle = angleStep * index - Math.PI / 2
    const x = center + radius * Math.cos(angle)
    const y = center + radius * Math.sin(angle)
    return { x, y }
  }

  const pathData = data.map((item, index) => {
    const radius = (item.value / item.maxValue) * maxRadius
    const point = getPoint(index, radius)
    return `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  }).join(' ') + ' Z'

  return (
    <div className="p-6">
      <h3 className="text-xl font-medium text-gray-800 mb-6 text-center">ESG 점수 분석</h3>
      
      <div className="relative">
        <svg width="240" height="240" className="mx-auto">
          {/* 배경 원들 */}
          {[20, 40, 60, 80, 100].map((radius, index) => (
            <circle
              key={index}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="1"
              opacity={0.5}
            />
          ))}
          
          {/* 축 선들 */}
          {data.map((_, index) => {
            const point = getPoint(index, maxRadius)
            return (
              <line
                key={index}
                x1={center}
                y1={center}
                x2={point.x}
                y2={point.y}
                stroke="#e5e7eb"
                strokeWidth="1"
                opacity={0.5}
              />
            )
          })}
          
          {/* 데이터 영역 */}
          <path
            d={pathData}
            fill="rgba(59, 130, 246, 0.2)"
            stroke="rgb(59, 130, 246)"
            strokeWidth="2"
          />
          
          {/* 데이터 점들 */}
          {data.map((item, index) => {
            const radius = (item.value / item.maxValue) * maxRadius
            const point = getPoint(index, radius)
            return (
              <circle
                key={index}
                cx={point.x}
                cy={point.y}
                r="4"
                fill="rgb(59, 130, 246)"
                stroke="white"
                strokeWidth="2"
              />
            )
          })}
          
          {/* 라벨들 */}
          {data.map((item, index) => {
            const point = getPoint(index, maxRadius + 20)
            return (
              <text
                key={index}
                x={point.x}
                y={point.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-sm font-medium fill-gray-700"
              >
                {item.subject}
              </text>
            )
          })}
        </svg>
      </div>
      
      <div className="mt-6 space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-sm text-gray-600">{item.subject} 영역</span>
            <span className={`text-sm font-medium ${
              item.value < 20 ? 'text-red-600' : 
              item.value < 40 ? 'text-orange-600' : 
              item.value < 60 ? 'text-yellow-600' : 
              item.value < 80 ? 'text-green-600' : 'text-blue-600'
            }`}>
              {item.value}점
            </span>
          </div>
        ))}
      </div>
    </div>
  )
} 