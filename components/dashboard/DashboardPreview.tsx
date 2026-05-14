'use client'

import { useState } from 'react'
import Card from '@/components/ui/card'
import Badge from '@/components/ui/badge'

const DashboardPreview = () => {
  const [vehicles] = useState([
    {
      id: 1,
      number: '11가1234',
      model: '현대 싼타페',
      mileage: 45230,
      color: '검정색',
    },
    {
      id: 2,
      number: '22나5678',
      model: 'KIA K5',
      mileage: 28150,
      color: '흰색',
    },
  ])

  const [expirations] = useState([
    { id: 1, type: '자동차 검사', daysLeft: 45, status: 'warning' },
    { id: 2, type: '보험 갱신', daysLeft: 12, status: 'critical' },
    { id: 3, type: '정기점검', daysLeft: 8, status: 'critical' },
  ])

  return (
    <div className="grid gap-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">긴급 알림</h2>
        <div className="grid gap-3">
          {expirations.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-lg border-l-4 ${item.status === 'critical' ? 'bg-red-50 border-red-400' : 'bg-yellow-50 border-yellow-400'}`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">{item.type}</span>
                <Badge variant={item.status === 'critical' ? 'destructive' : 'warning'}>
                  {item.daysLeft}일 남음
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">보유 중인 차량</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {vehicles.map((vehicle) => (
            <Card
              key={vehicle.id}
              title={vehicle.model}
              description={`${vehicle.number} (${vehicle.color})`}
            >
              <div className="space-y-2 text-sm text-gray-600">
                <p>현재 주행거리: {vehicle.mileage.toLocaleString()} km</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">이달의 비용</h2>
        <Card title="₩ 285,000" description="3월 총 지출">
          <div className="space-y-2 text-sm text-gray-600">
            <p>휘발유: ₩180,000</p>
            <p>정기점검: ₩85,000</p>
            <p>기타: ₩20,000</p>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default DashboardPreview