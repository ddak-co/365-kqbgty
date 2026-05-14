'use client'

import { useState } from 'react'
import Card from '@/components/ui/card'
import Button from '@/components/ui/button'
import DashboardPreview from '@/components/dashboard/DashboardPreview'

export default function Home() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'features'>('dashboard')

  return (
    <div className="p-6 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">차량관리 365</h1>
        <p className="text-gray-600">차량 유지보수 및 비용을 효율적으로 관리하세요</p>
      </header>

      <div className="flex gap-4 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`px-4 py-2 font-medium transition ${
            activeTab === 'dashboard'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          대시보드
        </button>
        <button
          onClick={() => setActiveTab('features')}
          className={`px-4 py-2 font-medium transition ${
            activeTab === 'features'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          기능 미리보기
        </button>
      </div>

      {activeTab === 'dashboard' && <DashboardPreview />}

      {activeTab === 'features' && (
        <div className="grid gap-6 md:grid-cols-2">
          <Card title="차량 정보 관리" description="차량 등록 및 상세 정보 편집">
            <div className="space-y-3">
              <p className="text-sm text-gray-600">차량번호, 차종, 구매일 등을 입력해서 차량 목록에서 확인하세요</p>
              <Button href="/vehicles">차량 목록으로</Button>
            </div>
          </Card>

          <Card title="유지보수 일정" description="점검 및 정비 예정일 관리">
            <div className="space-y-3">
              <p className="text-sm text-gray-600">캘린더에서 예정된 점검/정비를 확인하고 알림을 받으세요</p>
              <Button href="/maintenance">일정 확인</Button>
            </div>
          </Card>

          <Card title="비용 관리" description="휘발유, 수리비 등 지출 기록">
            <div className="space-y-3">
              <p className="text-sm text-gray-600">월별 휘발유/경유 사용량과 금액을 입력하고 비용 그래프를 확인하세요</p>
              <Button href="/costs">비용 등록</Button>
            </div>
          </Card>

          <Card title="만료일 알림" description="검사, 보험 자동 계산">
            <div className="space-y-3">
              <p className="text-sm text-gray-600">검사 만료일, 보험 갱신일을 자동 계산해서 카운트다운으로 확인하세요</p>
              <Button href="/expirations">만료일 관리</Button>
            </div>
          </Card>

          <Card title="지출 통계" description="사진 첨부 및 통계 분석">
            <div className="space-y-3">
              <p className="text-sm text-gray-600">수리비, 부품비 등을 사진과 함께 기록하고 통계로 분석하세요</p>
              <Button href="/statistics">통계 보기</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
