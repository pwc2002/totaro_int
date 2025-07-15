'use client'

import { useState } from "react"
import { Navbar } from "@/components/nav/navbar"
import { LoginModal } from "@/components/login-modal"
import EsgRadar from '@/components/EsgRadar'
import BenchmarkBar from '@/components/BenchmarkBar'
import RoadmapTimeline from '@/components/RoadmapTimeline'
import { EsgScore, Benchmark, RoadmapItem } from '@/types/esg'

// 글로우프로덕션 실제 ESG 자가진단 결과 데이터
const esgScores: EsgScore[] = [
  { subject: 'E', value: 85.5, maxValue: 100 }, // 환경: 1등급 (우수)
  { subject: 'S', value: 88.0, maxValue: 100 }, // 사회: 1등급 (우수)  
  { subject: 'G', value: 82.5, maxValue: 100 }  // 지배구조: 1등급 (우수)
]

const benchmarkData: Benchmark[] = [
  { category: '환경성과 관리', industry: 65, ours: 85.5, maxValue: 100 },
  { category: '온실가스 배출 관리', industry: 62, ours: 84, maxValue: 100 },
  { category: '에너지 사용량 관리', industry: 68, ours: 87, maxValue: 100 },
  { category: '폐기물 관리', industry: 58, ours: 83, maxValue: 100 },
  { category: '사회적 책임 정책', industry: 74, ours: 89, maxValue: 100 },
  { category: '근로자 권익보호', industry: 78, ours: 88, maxValue: 100 },
  { category: '안전 보건 관리', industry: 72, ours: 87, maxValue: 100 },
  { category: '윤리경영 정책', industry: 69, ours: 84, maxValue: 100 },
  { category: '준법경영시스템', industry: 71, ours: 81, maxValue: 100 }
]

const roadmapData: RoadmapItem[] = [
  {
    id: '1',
    title: 'RE100 친환경 에너지 전환',
    description: '2030년까지 100% 재생에너지 사용 목표 달성을 위한 태양광 발전 시설 확대',
    date: '2025-08-01',
    status: 'upcoming',
    progress: 0
  },
  {
    id: '2', 
    title: '탄소중립 인증 획득',
    description: '국제 탄소중립 인증(SBTi) 획득 및 Scope 3 배출량 관리 체계 고도화',
    date: '2025-09-01',
    status: 'upcoming',
    progress: 0
  },
  {
    id: '3',
    title: 'ESG 공급망 관리 플랫폼 구축',
    description: '협력업체 ESG 성과 모니터링 및 지원 시스템 구축으로 밸류체인 전반 ESG 확산',
    date: '2025-10-01', 
    status: 'upcoming',
    progress: 0
  },
  {
    id: '4',
    title: '사회적 가치 측정 체계 고도화',
    description: 'SROI(사회적투자수익률) 측정 체계 도입 및 사회적 임팩트 정량화',
    date: '2025-11-01',
    status: 'upcoming', 
    progress: 0
  },
  {
    id: '5',
    title: 'DEI(다양성·형평성·포용성) 프로그램 확대',
    description: '글로벌 수준의 다양성 경영 체계 구축 및 포용적 조직문화 확산',
    date: '2025-11-15',
    status: 'upcoming',
    progress: 0
  },
  {
    id: '6',
    title: 'AI 기반 안전관리 시스템 도입',
    description: '인공지능을 활용한 예측적 안전관리 및 무재해 사업장 인증 유지',
    date: '2025-12-01',
    status: 'upcoming',
    progress: 0
  },
  {
    id: '7',
    title: 'ESG 데이터 디지털 플랫폼 구축',
    description: '실시간 ESG 성과 모니터링 및 자동화된 보고서 생성 시스템 구축',
    date: '2025-10-15',
    status: 'upcoming',
    progress: 0
  },
  {
    id: '8',
    title: '글로벌 ESG 공시 표준 대응',
    description: 'ISSB, TCFD, EU CSRD 등 글로벌 공시 표준에 대응하는 통합보고서 발간',
    date: '2025-12-01',
    status: 'upcoming',
    progress: 0
  },
  {
    id: '9',
    title: 'ESG 혁신 R&D 센터 설립',
    description: 'ESG 관련 기술혁신 및 지속가능한 제품 개발을 위한 전담 연구조직 신설',
    date: '2026-01-01',
    status: 'upcoming',
    progress: 0
  },
  {
    id: '10',
    title: 'ESG 리더십 글로벌 인증',
    description: 'Dow Jones Sustainability Index 편입 및 CDP A등급 달성',
    date: '2026-06-01',
    status: 'upcoming',
    progress: 0
  }
]

export default function Page() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <Navbar 
        onLoginClick={() => setIsLoginModalOpen(true)} 
        currentPage="esg-dashboard" 
        showBorder={true}
      />
      
      {/* Main Content */}
      <div className="min-h-screen bg-white p-4 md:p-12">
        <div className="max-w-6xl mx-auto space-y-12">
          
          {/* ACTFINDER 서비스 설명 */}
          <div className="bg-white rounded-lg p-8 md:p-12">
            <div className="text-center space-y-6">
              <h2 className="text-2xl md:text-3xl font-medium text-gray-800">
                ESG 보고서 대시보드 솔루션
              </h2>
              
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                ACTFINDER가 ESG 보고서 데이터를 분석하여<br />
                직관적인 대시보드로 시각화해 드립니다
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                <div className="bg-white rounded-lg p-6">
                  <h4 className="font-medium text-gray-800 mb-2">보고서 분석</h4>
                  <p className="text-sm text-gray-600">ESG 데이터 자동 추출 및 분류</p>
                </div>
                <div className="bg-white rounded-lg p-6">
                  <h4 className="font-medium text-gray-800 mb-2">시각화 대시보드</h4>
                  <p className="text-sm text-gray-600">차트와 그래프로 쉬운 이해</p>
                </div>
                <div className="bg-white rounded-lg p-6">
                  <h4 className="font-medium text-gray-800 mb-2">인사이트 제공</h4>
                  <p className="text-sm text-gray-600">업계 벤치마크 및 개선점 도출</p>
                </div>
              </div>
            </div>
          </div>

          {/* ESG 금융 혜택 정보 */}
                      <div className="space-y-6 bg-white p-8 rounded-lg">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-medium text-gray-800">ESG 우수기업 금융 혜택</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                ESG 1등급 우수기업으로서 다양한 금융 혜택을 받을 수 있습니다
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg">
                <div className="text-gray-800 text-xl font-medium mb-2">최대 0.5%p</div>
                <h4 className="font-medium text-gray-800 mb-2">대출금리 우대</h4>
                <p className="text-sm text-gray-600">ESG 등급별 차별화된 금리 혜택</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg">
                <div className="text-gray-800 text-xl font-medium mb-2">100억원</div>
                <h4 className="font-medium text-gray-800 mb-2">ESG 전용 대출</h4>
                <p className="text-sm text-gray-600">중소벤처기업 ESG 경영 지원 대출</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg">
                <div className="text-gray-800 text-xl font-medium mb-2">우선 지원</div>
                <h4 className="font-medium text-gray-800 mb-2">정책금융 혜택</h4>
                <p className="text-sm text-gray-600">정책자금 신청 시 가산점 부여</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg">
                <div className="text-gray-800 text-xl font-medium mb-2">신용등급</div>
                <h4 className="font-medium text-gray-800 mb-2">신용평가 우대</h4>
                <p className="text-sm text-gray-600">ESG 성과를 반영한 신용등급 산정</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg">
                <div className="text-gray-800 text-xl font-medium mb-2">보증료 할인</div>
                <h4 className="font-medium text-gray-800 mb-2">신용보증 혜택</h4>
                <p className="text-sm text-gray-600">신용보증기금 보증료 할인</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg">
                <div className="text-gray-800 text-xl font-medium mb-2">투자 유치</div>
                <h4 className="font-medium text-gray-800 mb-2">ESG 투자 기회</h4>
                <p className="text-sm text-gray-600">ESG 투자펀드 연계 지원</p>
              </div>
            </div>
            
            <div className="text-center pt-4">
              <p className="text-sm text-gray-500">
                * 구체적인 혜택 내용은 각 금융기관 및 정책기관의 운영방침에 따라 달라질 수 있습니다.
              </p>
            </div>
          </div>

          {/* 헤더 & 종합 결과 통합 */}
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-light text-gray-900">
                ESG 자가진단 보고서
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                귀사의 ESG 현황과 개선 계획을 한눈에 확인하세요
              </p>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-2xl font-medium text-gray-800">종합 진단 결과</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-medium text-gray-800 mb-2">85.3</div>
                  <div className="text-gray-600">종합점수</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-medium text-gray-800 mb-2">우수</div>
                  <div className="text-gray-600">종합등급</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-medium text-gray-800 mb-2">상위 8.5%</div>
                  <div className="text-gray-600">누적분포</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-medium text-gray-800 mb-2">1등급</div>
                  <div className="text-gray-600">ESG 등급</div>
                </div>
              </div>
            </div>
          </div>

          {/* 예시 ESG 대시보드 */}
          <div className="space-y-10">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-light text-gray-800">ESG 대시보드</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                ESG 성과 데이터를 시각화한 종합 대시보드
              </p>
            </div>

            {/* ESG 점수 분석 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <EsgRadar data={esgScores} />
              <BenchmarkBar data={benchmarkData} />
            </div>

            {/* 영역별 상세 결과 */}
            <div className="space-y-10">
              <h3 className="text-2xl font-medium text-gray-800 text-center">영역별 상세 결과</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-6 text-center space-y-4 bg-white rounded-lg">
                  <h4 className="text-xl font-medium text-gray-800">환경(E) 영역</h4>
                  <div className="text-3xl font-medium text-gray-800">85.5</div>
                  <div className="text-gray-600">1등급 (우수)</div>
                  <div className="text-sm text-gray-500">상위 12.3%</div>
                  <div className="space-y-1 text-sm text-gray-600 pt-4 text-left">
                    <p>• 환경목표 체계적 수립</p>
                    <p>• 온실가스 관리 시스템 구축</p>
                    <p>• 폐기물 관리 정책 완비</p>
                  </div>
                </div>

                <div className="p-6 text-center space-y-4 bg-white rounded-lg">
                  <h4 className="text-xl font-medium text-gray-800">사회(S) 영역</h4>
                  <div className="text-3xl font-medium text-gray-800">88.0</div>
                  <div className="text-gray-600">1등급 (우수)</div>
                  <div className="text-sm text-gray-500">상위 9.7%</div>
                  <div className="space-y-1 text-sm text-gray-600 pt-4 text-left">
                    <p>• 표준근로계약서 100% 적용</p>
                    <p>• 임직원 역량개발 체계 완비</p>
                    <p>• 차별금지 정책 수립</p>
                  </div>
                </div>

                <div className="p-6 text-center space-y-4 bg-white rounded-lg">
                  <h4 className="text-xl font-medium text-gray-800">지배구조(G) 영역</h4>
                  <div className="text-3xl font-medium text-gray-800">82.5</div>
                  <div className="text-gray-600">1등급 (우수)</div>
                  <div className="text-sm text-gray-500">상위 14.8%</div>
                  <div className="space-y-1 text-sm text-gray-600 pt-4 text-left">
                    <p>• 윤리경영 정책 완비</p>
                    <p>• 준법경영시스템 구축</p>
                    <p>• 경영진 ESG 역량 우수</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ESG 개선 로드맵 */}
            <div className="space-y-6">
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-medium text-gray-800">ESG 개선 로드맵</h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  ESG 성과 향상을 위한 실행계획
                </p>
              </div>
              <RoadmapTimeline data={roadmapData} />
            </div>
          </div>

          {/* 푸터 */}
          <div className="text-center space-y-3 pt-12 pb-8 border-t border-gray-200">
            <p className="text-gray-600">
              본 보고서는 중소벤처기업진흥공단 ESG 자가진단 플랫폼을 통해 생성되었습니다.
            </p>
            <p className="text-sm text-gray-600">
              ESG 1등급 우수기업 인증
            </p>
            <p className="text-sm text-gray-500">
              문의: 중소벤처기업진흥공단 제조혁신처 (TEL. 055-751-9526)
            </p>
            <p className="text-sm text-gray-500">
              http://esg.kosmes.or.kr
            </p>
          </div>
        </div>
      </div>
             
       {/* Login Modal */}
       <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </div>
  )
}
