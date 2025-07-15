'use client'

import { useState, useEffect } from "react"

// 그래프 데이터 (웹사이트 미리보기 데이터 대신)
const chartPreviews = [
  {
    id: 1,
    title: "ESG 점수 분포",
    description: "환경·사회·지배구조 영역별 성과",
    type: "radar",
    data: [
      { subject: '환경(E)', value: 85.5, maxValue: 100 },
      { subject: '사회(S)', value: 88.0, maxValue: 100 },
      { subject: '지배구조(G)', value: 82.5, maxValue: 100 },
      { subject: '혁신', value: 79.2, maxValue: 100 },
      { subject: '리스크관리', value: 86.8, maxValue: 100 },
      { subject: '투명성', value: 84.3, maxValue: 100 }
    ],
    color: "bg-blue-50",
    chartColor: "#3b82f6"
  },
  {
    id: 2,
    title: "월별 탄소 배출량",
    description: "2024년 온실가스 배출 추이",
    type: "line",
    data: [
      { month: '1월', emissions: 245 },
      { month: '2월', emissions: 238 },
      { month: '3월', emissions: 252 },
      { month: '4월', emissions: 241 },
      { month: '5월', emissions: 235 },
      { month: '6월', emissions: 228 },
      { month: '7월', emissions: 222 },
      { month: '8월', emissions: 215 },
      { month: '9월', emissions: 208 },
      { month: '10월', emissions: 201 },
      { month: '11월', emissions: 195 },
      { month: '12월', emissions: 188 }
    ],
    color: "bg-green-50",
    chartColor: "#10b981"
  },
  {
    id: 3,
    title: "업계 벤치마크 비교",
    description: "동종업계 대비 ESG 성과",
    type: "bar",
    data: [
      { category: '환경성과', industry: 65, company: 85.5 },
      { category: '사회책임', industry: 72, company: 88.0 },
      { category: '지배구조', industry: 69, company: 82.5 },
      { category: '혁신경영', industry: 58, company: 79.2 },
      { category: '위험관리', industry: 71, company: 86.8 }
    ],
    color: "bg-purple-50",
    chartColor: "#8b5cf6"
  },
  {
    id: 4,
    title: "에너지 사용 비율",
    description: "재생에너지 vs 일반에너지",
    type: "donut",
    data: [
      { name: '재생에너지', value: 42, color: '#10b981' },
      { name: '천연가스', value: 28, color: '#3b82f6' },
      { name: '전력', value: 22, color: '#f59e0b' },
      { name: '기타', value: 8, color: '#ef4444' }
    ],
    color: "bg-orange-50",
    chartColor: "#f59e0b"
  },
  {
    id: 5,
    title: "사회적 임팩트 지표",
    description: "지역사회 기여도 측정",
    type: "area",
    data: [
      { year: '2020', employment: 120, education: 85, community: 95 },
      { year: '2021', employment: 135, education: 92, community: 108 },
      { year: '2022', employment: 158, education: 105, community: 125 },
      { year: '2023', employment: 172, education: 118, community: 142 },
      { year: '2024', employment: 189, education: 135, community: 165 }
    ],
    color: "bg-pink-50",
    chartColor: "#ec4899"
  }
]

// 차트 컴포넌트들
const RadarChart = ({ data, color }: { data: any[], color: string }) => {
  const centerX = 160
  const centerY = 140
  const radius = 90
  const angleStep = (2 * Math.PI) / data.length

  const points = data.map((item, index) => {
    const angle = index * angleStep - Math.PI / 2
    const value = (item.value / item.maxValue) * radius
    return {
      x: centerX + Math.cos(angle) * value,
      y: centerY + Math.sin(angle) * value,
      labelX: centerX + Math.cos(angle) * (radius + 25),
      labelY: centerY + Math.sin(angle) * (radius + 25),
      subject: item.subject,
      value: item.value
    }
  })

  // 평균값 라인 추가
  const avgValue = data.reduce((sum, item) => sum + item.value, 0) / data.length
  const avgPoints = data.map((_, index) => {
    const angle = index * angleStep - Math.PI / 2
    const value = (avgValue / 100) * radius
    return {
      x: centerX + Math.cos(angle) * value,
      y: centerY + Math.sin(angle) * value
    }
  })

  const pathData = points.map((point, index) => 
    `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ') + ' Z'

  const avgPathData = avgPoints.map((point, index) => 
    `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ') + ' Z'

  return (
    <svg width="320" height="280" className="mx-auto">
      {/* 배경 그라데이션 */}
      <defs>
        <radialGradient id="bgGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#e2e8f0" />
        </radialGradient>
        <linearGradient id={`chartGradient-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="1" />
        </linearGradient>
      </defs>
      
      <rect width="320" height="280" fill="url(#bgGradient)" rx="12"/>
      
      {/* 배경 격자 - 더 세밀하게 */}
      {[18, 36, 54, 72, 90].map(r => (
        <circle key={r} cx={centerX} cy={centerY} r={r} fill="none" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2,2"/>
      ))}
      
      {/* 축선 */}
      {data.map((_, index) => {
        const angle = index * angleStep - Math.PI / 2
        const endX = centerX + Math.cos(angle) * radius
        const endY = centerY + Math.sin(angle) * radius
        return (
          <line key={index} x1={centerX} y1={centerY} x2={endX} y2={endY} stroke="#94a3b8" strokeWidth="2"/>
        )
      })}
      
      {/* 평균값 영역 */}
      <path d={avgPathData} fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5"/>
      
      {/* 데이터 영역 */}
      <path d={pathData} fill={`url(#chartGradient-${color})`} stroke={color} strokeWidth="3"/>
      
      {/* 데이터 포인트 */}
      {points.map((point, index) => (
        <g key={index}>
          <circle cx={point.x} cy={point.y} r="7" fill="white" stroke={color} strokeWidth="3"/>
          <circle cx={point.x} cy={point.y} r="3" fill={color}/>
          <text x={point.x} y={point.y - 12} textAnchor="middle" fontSize="10" fill="#1f2937" fontWeight="700">
            {point.value}
          </text>
        </g>
      ))}
      
      {/* 라벨 */}
      {points.map((point, index) => (
        <text key={index} x={point.labelX} y={point.labelY} textAnchor="middle" fontSize="11" fill="#1f2937" fontWeight="600">
          {point.subject}
        </text>
      ))}
      
      {/* 중앙 로고 */}
      <circle cx={centerX} cy={centerY} r="12" fill={color}/>
      <text x={centerX} y={centerY + 3} textAnchor="middle" fontSize="10" fill="white" fontWeight="700">ESG</text>
    </svg>
  )
}

const LineChart = ({ data, color }: { data: any[], color: string }) => {
  const width = 320
  const height = 280
  const padding = 50
  const maxValue = Math.max(...data.map(d => d.emissions))
  const minValue = Math.min(...data.map(d => d.emissions))
  
  const points = data.map((item, index) => ({
    x: padding + (index * (width - 2 * padding)) / (data.length - 1),
    y: height - padding - ((item.emissions - minValue) / (maxValue - minValue)) * (height - 2 * padding),
    value: item.emissions
  }))

  // 목표선 추가 (평균값의 95%)
  const targetValue = (maxValue + minValue) / 2 * 0.95
  const targetY = height - padding - ((targetValue - minValue) / (maxValue - minValue)) * (height - 2 * padding)

  // 면적 그래프용 경로
  const areaPathData = points.map((point, index) => 
    `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ') + ` L ${width - padding} ${height - padding} L ${padding} ${height - padding} Z`

  const linePathData = points.map((point, index) => 
    `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ')

  return (
    <svg width="320" height="280" className="mx-auto">
      <defs>
        <linearGradient id={`lineGradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="1" />
        </linearGradient>
        <filter id="dropShadow">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.3"/>
        </filter>
      </defs>
      
      <rect width="320" height="280" fill="#f8fafc" rx="12"/>
      
      {/* Y축 격자 및 값 */}
      {[0, 25, 50, 75, 100].map(percent => {
        const y = height - padding - (percent / 100) * (height - 2 * padding)
        const value = Math.round(minValue + (maxValue - minValue) * (percent / 100))
        return (
          <g key={percent}>
            <line x1={padding} y1={y} x2={width-padding} y2={y} stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3,3"/>
            <text x={padding - 8} y={y + 3} textAnchor="end" fontSize="9" fill="#64748b" fontWeight="500">
              {value}
            </text>
          </g>
        )
      })}
      
      {/* 목표선 */}
      <line x1={padding} y1={targetY} x2={width-padding} y2={targetY} stroke="#ef4444" strokeWidth="2" strokeDasharray="8,4"/>
      <text x={width - padding + 5} y={targetY + 3} fontSize="9" fill="#ef4444" fontWeight="600">목표</text>
      
      {/* 면적 */}
      <path d={areaPathData} fill={`url(#lineGradient-${color})`}/>
      
      {/* 라인 */}
      <path d={linePathData} fill="none" stroke={color} strokeWidth="4" filter="url(#dropShadow)"/>
      
      {/* 포인트 */}
      {points.map((point, index) => (
        <g key={index}>
          <circle cx={point.x} cy={point.y} r="8" fill="white" stroke={color} strokeWidth="3"/>
          <circle cx={point.x} cy={point.y} r="4" fill={color}/>
          {/* 값 표시 */}
          <rect x={point.x - 15} y={point.y - 25} width="30" height="16" fill={color} rx="3"/>
          <text x={point.x} y={point.y - 15} textAnchor="middle" fontSize="9" fill="white" fontWeight="700">
            {point.value}
          </text>
        </g>
      ))}
      
      {/* X축 라벨 */}
      {data.map((item, index) => {
        const x = padding + (index * (width - 2 * padding)) / (data.length - 1)
        return (
          <text key={index} x={x} y={height - 20} textAnchor="middle" fontSize="10" fill="#374151" fontWeight="600">
            {item.month}
          </text>
        )
      })}
      
      {/* 제목 */}
      <text x={width/2} y={25} textAnchor="middle" fontSize="12" fill="#1f2937" fontWeight="700">
        탄소배출량 추이 (톤CO₂)
      </text>
    </svg>
  )
}

const BarChart = ({ data, color }: { data: any[], color: string }) => {
  const width = 320
  const height = 280
  const padding = 50
  const maxValue = 100
  const barWidth = (width - 2 * padding) / (data.length * 2.5)
  
  return (
    <svg width="320" height="280" className="mx-auto">
      <defs>
        <linearGradient id={`barGradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="1" />
        </linearGradient>
        <linearGradient id="industryGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#94a3b8" stopOpacity="1" />
          <stop offset="100%" stopColor="#cbd5e1" stopOpacity="1" />
        </linearGradient>
        <pattern id="pattern" patternUnits="userSpaceOnUse" width="4" height="4">
          <rect width="4" height="4" fill="#f1f5f9"/>
          <path d="M 0,4 L 4,0 M -1,1 L 1,-1 M 3,5 L 5,3" stroke="#cbd5e1" strokeWidth="1"/>
        </pattern>
      </defs>
      
      <rect width="320" height="280" fill="#f8fafc" rx="12"/>
      
      {/* Y축 격자 및 값 */}
      {[0, 25, 50, 75, 100].map(percent => {
        const y = height - padding - (percent / 100) * (height - 2 * padding)
        return (
          <g key={percent}>
            <line x1={padding} y1={y} x2={width-padding} y2={y} stroke="#e2e8f0" strokeWidth="1" strokeDasharray="2,2"/>
            <text x={padding - 8} y={y + 3} textAnchor="end" fontSize="9" fill="#64748b" fontWeight="500">
              {percent}
            </text>
          </g>
        )
      })}
      
      {data.map((item, index) => {
        const x = padding + index * (barWidth * 2.5) + 15
        const industryHeight = (item.industry / maxValue) * (height - 2 * padding)
        const companyHeight = (item.company / maxValue) * (height - 2 * padding)
        
        return (
          <g key={index}>
            {/* 그림자 */}
            <rect 
              x={x + 2} 
              y={height - padding - industryHeight + 2} 
              width={barWidth * 0.7} 
              height={industryHeight} 
              fill="#d1d5db" 
              rx="2"
            />
            <rect 
              x={x + barWidth + 2} 
              y={height - padding - companyHeight + 2} 
              width={barWidth * 0.7} 
              height={companyHeight} 
              fill="#d1d5db" 
              rx="2"
            />
            
            {/* 업계 평균 */}
            <rect 
              x={x} 
              y={height - padding - industryHeight} 
              width={barWidth * 0.7} 
              height={industryHeight} 
              fill="url(#industryGradient)"
              stroke="#94a3b8"
              strokeWidth="1"
              rx="2"
            />
            <text x={x + barWidth * 0.35} y={height - padding - industryHeight - 5} textAnchor="middle" fontSize="8" fill="#64748b" fontWeight="600">
              {item.industry}
            </text>
            
            {/* 우리 회사 */}
            <rect 
              x={x + barWidth} 
              y={height - padding - companyHeight} 
              width={barWidth * 0.7} 
              height={companyHeight} 
              fill={`url(#barGradient-${color})`}
              stroke={color}
              strokeWidth="2"
              rx="2"
            />
            <text x={x + barWidth + barWidth * 0.35} y={height - padding - companyHeight - 5} textAnchor="middle" fontSize="8" fill={color} fontWeight="700">
              {item.company}
            </text>
            
            {/* 카테고리 라벨 */}
            <text x={x + barWidth} y={height - 25} textAnchor="middle" fontSize="9" fill="#374151" fontWeight="600">
              {item.category}
            </text>
          </g>
        )
      })}
      
      {/* 범례 */}
      <g transform="translate(20, 20)">
        <rect x="0" y="0" width="12" height="12" fill="url(#industryGradient)" rx="2"/>
        <text x="18" y="9" fontSize="10" fill="#64748b" fontWeight="500">업계평균</text>
        <rect x="80" y="0" width="12" height="12" fill={color} rx="2"/>
        <text x="98" y="9" fontSize="10" fill="#1f2937" fontWeight="500">우리회사</text>
      </g>
      
      {/* 제목 */}
      <text x={width/2} y={height - 5} textAnchor="middle" fontSize="12" fill="#1f2937" fontWeight="700">
        ESG 성과 벤치마크 비교
      </text>
    </svg>
  )
}

const DonutChart = ({ data, color }: { data: any[], color: string }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0)
  let currentAngle = 0
  const radius = 85
  const innerRadius = 50
  const centerX = 160
  const centerY = 140

  return (
    <svg width="320" height="280" className="mx-auto">
      <defs>
        {data.map((item, index) => (
          <linearGradient key={index} id={`donutGradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={item.color} stopOpacity="1" />
            <stop offset="100%" stopColor={item.color} stopOpacity="1" />
          </linearGradient>
        ))}
        <filter id="donutShadow">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodOpacity="0.2"/>
        </filter>
      </defs>
      
      <rect width="320" height="280" fill="#f8fafc" rx="12"/>
      
      {/* 배경 원 */}
      <circle cx={centerX} cy={centerY} r={radius + 5} fill="none" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="5,5"/>
      
      {data.map((item, index) => {
        const angle = (item.value / total) * 2 * Math.PI
        const startAngle = currentAngle
        const endAngle = currentAngle + angle
        
        const x1 = centerX + Math.cos(startAngle) * radius
        const y1 = centerY + Math.sin(startAngle) * radius
        const x2 = centerX + Math.cos(endAngle) * radius
        const y2 = centerY + Math.sin(endAngle) * radius
        
        const x3 = centerX + Math.cos(endAngle) * innerRadius
        const y3 = centerY + Math.sin(endAngle) * innerRadius
        const x4 = centerX + Math.cos(startAngle) * innerRadius
        const y4 = centerY + Math.sin(startAngle) * innerRadius
        
        const largeArcFlag = angle > Math.PI ? 1 : 0
        
        const pathData = [
          `M ${x1} ${y1}`,
          `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
          `L ${x3} ${y3}`,
          `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4}`,
          'Z'
        ].join(' ')
        
        // 라벨 위치
        const labelAngle = startAngle + angle / 2
        const labelRadius = radius + 25
        const labelX = centerX + Math.cos(labelAngle) * labelRadius
        const labelY = centerY + Math.sin(labelAngle) * labelRadius
        
        // 연결선 좌표
        const lineStartX = centerX + Math.cos(labelAngle) * (radius + 3)
        const lineStartY = centerY + Math.sin(labelAngle) * (radius + 3)
        const lineEndX = centerX + Math.cos(labelAngle) * (radius + 18)
        const lineEndY = centerY + Math.sin(labelAngle) * (radius + 18)
        
        currentAngle += angle
        
        return (
          <g key={index}>
            {/* 세그먼트 */}
            <path 
              d={pathData} 
              fill={`url(#donutGradient-${index})`} 
              stroke="white" 
              strokeWidth="3"
              filter="url(#donutShadow)"
            />
            
            {/* 연결선 */}
            <line 
              x1={lineStartX} 
              y1={lineStartY} 
              x2={lineEndX} 
              y2={lineEndY} 
              stroke={item.color} 
              strokeWidth="2"
            />
            
            {/* 라벨 배경 */}
            <rect 
              x={labelX - 18} 
              y={labelY - 8} 
              width="36" 
              height="16" 
              fill={item.color} 
              rx="8"
            />
            
            {/* 라벨 텍스트 */}
            <text 
              x={labelX} 
              y={labelY + 3} 
              textAnchor="middle" 
              fontSize="9" 
              fill="white"
              fontWeight="700"
            >
              {item.value}%
            </text>
            
            {/* 카테고리 이름 */}
            <text 
              x={labelX} 
              y={labelY + 20} 
              textAnchor="middle" 
              fontSize="10" 
              fill="#1f2937"
              fontWeight="600"
            >
              {item.name}
            </text>
          </g>
        )
      })}
      
      {/* 중앙 원 */}
      <circle cx={centerX} cy={centerY} r={innerRadius - 2} fill="white" stroke="#e2e8f0" strokeWidth="2"/>
      
      {/* 중앙 텍스트 */}
      <text x={centerX} y={centerY - 8} textAnchor="middle" fontSize="16" fontWeight="bold" fill="#1f2937">
        에너지
      </text>
      <text x={centerX} y={centerY + 8} textAnchor="middle" fontSize="14" fontWeight="600" fill="#64748b">
        사용현황
      </text>
      
      {/* 제목 */}
      <text x={centerX} y={30} textAnchor="middle" fontSize="12" fill="#1f2937" fontWeight="700">
        에너지원별 사용 비율
      </text>
    </svg>
  )
}

const AreaChart = ({ data, color }: { data: any[], color: string }) => {
  const width = 320
  const height = 280
  const padding = 50
  const maxValue = Math.max(...data.flatMap(d => [d.employment, d.education, d.community]))
  
  const categories = [
    { key: 'employment', color: '#10b981', name: '고용창출' },
    { key: 'education', color: '#3b82f6', name: '교육지원' },
    { key: 'community', color: '#ec4899', name: '지역사회' }
  ]
  
  const createPath = (key: string) => {
    const points = data.map((item, index) => ({
      x: padding + (index * (width - 2 * padding)) / (data.length - 1),
      y: height - padding - ((item[key] / maxValue) * (height - 2 * padding)),
      value: item[key]
    }))
    
    const pathData = points.map((point, index) => 
      `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
    ).join(' ')
    
    return { 
      line: pathData,
      points
    }
  }

  return (
    <svg width="320" height="280" className="mx-auto">
      <defs>
        <filter id="lineShadow">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.3"/>
        </filter>
      </defs>
      
      <rect width="320" height="280" fill="#f8fafc" rx="12"/>
      
      {/* Y축 격자 및 값 */}
      {[0, 25, 50, 75, 100].map(percent => {
        const y = height - padding - (percent / 100) * (height - 2 * padding)
        const value = Math.round((maxValue * percent) / 100)
        return (
          <g key={percent}>
            <line x1={padding} y1={y} x2={width-padding} y2={y} stroke="#e2e8f0" strokeWidth="1" strokeDasharray="2,2"/>
            <text x={padding - 8} y={y + 3} textAnchor="end" fontSize="9" fill="#64748b" fontWeight="500">
              {value}
            </text>
          </g>
        )
      })}
      
      {/* 라인들 */}
      {categories.map((category, index) => {
        const pathData = createPath(category.key)
        return (
          <g key={category.key}>
            {/* 라인 */}
            <path 
              d={pathData.line} 
              fill="none" 
              stroke={category.color} 
              strokeWidth="4"
              filter="url(#lineShadow)"
            />
            {/* 데이터 포인트 */}
            {pathData.points.map((point, pointIndex) => (
              <g key={pointIndex}>
                <circle 
                  cx={point.x} 
                  cy={point.y} 
                  r="8" 
                  fill="white" 
                  stroke={category.color} 
                  strokeWidth="3"
                />
                <circle 
                  cx={point.x} 
                  cy={point.y} 
                  r="4" 
                  fill={category.color}
                />
                {/* 값 표시 */}
                <rect 
                  x={point.x - 12} 
                  y={point.y - 20} 
                  width="24" 
                  height="14" 
                  fill={category.color} 
                  rx="2"
                />
                <text 
                  x={point.x} 
                  y={point.y - 12} 
                  textAnchor="middle" 
                  fontSize="8" 
                  fill="white" 
                  fontWeight="700"
                >
                  {point.value}
                </text>
              </g>
            ))}
          </g>
        )
      })}
      
      {/* X축 라벨 */}
      {data.map((item, index) => {
        const x = padding + (index * (width - 2 * padding)) / (data.length - 1)
        return (
          <text key={index} x={x} y={height - 20} textAnchor="middle" fontSize="10" fill="#374151" fontWeight="600">
            {item.year}
          </text>
        )
      })}
      
      {/* 범례 */}
      <g transform="translate(20, 20)">
        {categories.map((cat, index) => (
          <g key={cat.key} transform={`translate(${index * 80}, 0)`}>
            <circle cx="6" cy="6" r="4" fill={cat.color}/>
            <text x="16" y="9" fontSize="10" fill="#1f2937" fontWeight="500">{cat.name}</text>
          </g>
        ))}
      </g>
      
      {/* 제목 */}
      <text x={width/2} y={height - 5} textAnchor="middle" fontSize="12" fill="#1f2937" fontWeight="700">
        사회적 임팩트 지표 (연도별 성과)
      </text>
    </svg>
  )
}

// 차트 렌더링 함수
const renderChart = (chart: any) => {
  switch (chart.type) {
    case 'radar':
      return <RadarChart data={chart.data} color={chart.chartColor} />
    case 'line':
      return <LineChart data={chart.data} color={chart.chartColor} />
    case 'bar':
      return <BarChart data={chart.data} color={chart.chartColor} />
    case 'donut':
      return <DonutChart data={chart.data} color={chart.chartColor} />
    case 'area':
      return <AreaChart data={chart.data} color={chart.chartColor} />
    default:
      return null
  }
}

export default function GraphPage() {
  const [currentSlide, setCurrentSlide] = useState(0)

  // 자동 슬라이딩 효과
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % chartPreviews.length)
    }, 5000) // 5초마다 변경

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative min-h-[70vh] bg-gradient-to-br from-blue-50 via-white to-green-50 overflow-hidden rounded-2xl">
      {/* 배경 장식 요소들 */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-green-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-purple-200 rounded-full opacity-20 animate-bounce"></div>
      </div>
      
      {/* 배경 그래프들 */}
      <div className="absolute top-1/2 right-8 transform -translate-y-1/2">
        <div className="relative w-[350px] h-[280px]">
          {chartPreviews.map((chart, index) => {
            const position = (index - currentSlide + chartPreviews.length) % chartPreviews.length
            const isActive = position === 0
            const isPrev = position === chartPreviews.length - 1
            const isNext = position === 1
            const isFarLeft = position === chartPreviews.length - 2
            const isFarRight = position === 2
            
            let transform = ''
            let opacity = 1
            let zIndex = 0
            
            if (isActive) {
              transform = 'translateX(0%) translateY(0%) scale(1)'
              zIndex = 50
            } else if (isPrev) {
              transform = 'translateX(-80%) translateY(3%) scale(0.85)'
              opacity = 0.7
              zIndex = 30
            } else if (isNext) {
              transform = 'translateX(80%) translateY(3%) scale(0.85)'
              opacity = 0.7
              zIndex = 30
            } else if (isFarLeft) {
              transform = 'translateX(-140%) translateY(6%) scale(0.7)'
              opacity = 0.5
              zIndex = 10
            } else if (isFarRight) {
              transform = 'translateX(140%) translateY(6%) scale(0.7)'
              opacity = 0.5
              zIndex = 10
            } else {
              transform = 'translateX(200%) translateY(10%) scale(0.6)'
              opacity = 0.3
              zIndex = 0
            }
            
            return (
              <div
                key={chart.id}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-out"
                style={{
                  transform: `translate(-50%, -50%) ${transform}`,
                  opacity,
                  zIndex
                }}
              >
                <div className={`bg-white rounded-xl shadow-2xl p-3 border-2 ring-1 ring-gray-200 w-[280px] h-[240px] flex items-center justify-center transition-all duration-700 ${
                  isActive 
                    ? 'border-blue-400 shadow-blue-200/50' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}>
                  <div className="scale-75">
                    {renderChart(chart)}
                  </div>
                </div>
                
                {/* 차트 정보 표시 (활성 차트만) */}
                {isActive && (
                  <div className="absolute -bottom-12 left-0 right-0 text-center transition-all duration-500">
                    <h3 className="text-sm font-semibold text-gray-800 mb-1">{chart.title}</h3>
                    <p className="text-xs text-gray-600">{chart.description}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
      
      {/* 전면 콘텐츠 */}
      <div className="relative z-10 p-8 md:p-12 h-full flex items-center">
        <div className="max-w-xl">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-light text-gray-800 relative">
              ESG 보고서 대시보드 솔루션
              <div className="absolute -bottom-2 left-0 w-1/4 h-1 bg-gradient-to-r from-blue-500 to-green-500 rounded-full"></div>
            </h2>
            
            <p className="text-lg text-gray-700 leading-relaxed">
              ACTFINDER가 ESG 보고서 데이터를 분석하여<br />
              직관적인 대시보드로 시각화해 드립니다
            </p>
            
            <div className="grid grid-cols-1 gap-4 pt-4 max-w-lg">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-white/60">
                <h4 className="font-medium text-gray-800 mb-1">보고서 분석</h4>
                <p className="text-sm text-gray-600">ESG 데이터 자동 추출 및 분류</p>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-white/60">
                <h4 className="font-medium text-gray-800 mb-1">시각화 대시보드</h4>
                <p className="text-sm text-gray-600">차트와 그래프로 쉬운 이해</p>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-white/60">
                <h4 className="font-medium text-gray-800 mb-1">인사이트 제공</h4>
                <p className="text-sm text-gray-600">업계 벤치마크 및 개선점 도출</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      

    </div>
  )
}
