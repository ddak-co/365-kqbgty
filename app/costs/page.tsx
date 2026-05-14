'use client'

import { useState } from 'react'
import Card from '@/components/ui/card'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import Badge from '@/components/ui/badge'

interface Cost {
  id: number
  type: string
  amount: number
  date: string
  mileage: number
  memo: string
}

export default function CostsPage() {
  const [costs, setCosts] = useState<Cost[]>([
    { id: 1, type: '휘발유', amount: 60000, date: '2024-03-15', mileage: 45230, memo: '일반주유' },
    { id: 2, type: '정기점검', amount: 85000, date: '2024-03-10', mileage: 45100, memo: '30,000km 점검' },
  ])

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    type: '휘발유',
    amount: '',
    date: '',
    mileage: '',
    memo: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newCost: Cost = {
      id: costs.length + 1,
      type: formData.type,
      amount: parseInt(formData.amount) || 0,
      date: formData.date,
      mileage: parseInt(formData.mileage) || 0,
      memo: formData.memo,
    }
    setCosts([...costs, newCost])
    setFormData({ type: '휘발유', amount: '', date: '', mileage: '', memo: '' })
    setShowForm(false)
  }

  const totalCost = costs.reduce((sum, cost) => sum + cost.amount, 0)
  const costByType = costs.reduce(
    (acc, cost) => {
      acc[cost.type] = (acc[cost.type] || 0) + cost.amount
      return acc
    },
    {} as Record<string, number>
  )

  return (
    <div className="p-6 md:p-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">비용 관리</h1>
          <p className="text-gray-600 mt-1">휘발유, 수리비 등 모든 지출을 기록하세요</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} size="lg">
          {showForm ? '취소' : '비용 등록'}
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card title={`₩ ${totalCost.toLocaleString()}`} description="총 지출">
          <p className="text-sm text-gray-600">{costs.length}건의 기록</p>
        </Card>
        {Object.entries(costByType).map(([type, amount]) => (
          <Card key={type} title={`₩ ${amount.toLocaleString()}`} description={type}>
            <p className="text-sm text-gray-600">{costs.filter((c) => c.type === type).length}건</p>
          </Card>
        ))}
      </div>

      {showForm && (
        <Card title="새 비용 등록" className="mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">비용 유형</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>휘발유</option>
                  <option>경유</option>
                  <option>정기점검</option>
                  <option>수리비</option>
                  <option>부품비</option>
                  <option>기타</option>
                </select>
              </div>
              <Input
                label="금액 (₩)"
                name="amount"
                type="number"
                value={formData.amount}
                onChange={handleInputChange}
                placeholder="0"
                required
              />
              <Input
                label="날짜"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
              <Input
                label="주행거리 (km)"
                name="mileage"
                type="number"
                value={formData.mileage}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">메모</label>
              <textarea
                name="memo"
                value={formData.memo}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="비용 관련 메모를 작성하세요"
              />
            </div>
            <Button type="submit" size="md">등록하기</Button>
          </form>
        </Card>
      )}

      <div className="space-y-3">
        {costs.map((cost) => (
          <Card key={cost.id} title={`₩ ${cost.amount.toLocaleString()}`} description={cost.date}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-1">
                <Badge>{cost.type}</Badge>
                <p className="text-sm text-gray-600 mt-2">{cost.mileage.toLocaleString()} km · {cost.memo}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}