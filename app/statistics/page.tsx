'use client'

export default function StatisticsPage() {
  return (
    <div className="p-6 md:p-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">통계</h1>
          <p className="text-gray-600 mt-1">지출 통계를 분석하세요</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <p className="text-gray-600">통계 기능은 준비 중입니다.</p>
      </div>
    </div>
  )
}