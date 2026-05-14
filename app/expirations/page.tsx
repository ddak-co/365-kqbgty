'use client'

import { useState } from 'react'
import Card from '@/components/ui/card'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import Badge from '@/components/ui/badge'

interface Expiration {
  id: number
  type: string
  expiryDate: string
  renewalDate: string
  status: 'safe' | 'warning' | 'critical'
}

const calculateDaysLeft = (date: string): number => {
  const today = new Date()
  const expiry = new Date(date)
  const diff = expiry.getTime() - today.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

const getStatus = (daysLeft: number): 'safe' | 'warning' | 'critical' => {
  if (daysLeft < 0) return 'critical'
  if (daysLeft < 30) return 'warning'
  return 'safe'
}

export default function ExpirationsPage() {
  const [expirations, setExpirations] = useState<Expiration[]>([
    { id: 1, type: '자동차 검사', expiryDate: '2024-04-20', renewalDate: '2024-04-15', status: 'warning' },
    { id: 2, type: '보험 갱신', expiryDate: '2024-03-20', renewalDate: '2024-03-20', status: 'critical' },
    { id: 3, type: '정기점검', expiryDate: '2024-08-15', renewalDate: '2024-08-15', status: 'safe' },
  ])

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    type: '자동차 검사',
    expiryDate: '',
    renewalDate: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const daysLeft = calculateDaysLeft(formData.expiryDate)
    const newExpiration: Expiration = {
      id: expirations.length + 1,
      type: formData.type,
      expiryDate: formData.expiryDate,
      renewalDate: formData.renewalDate,
      status: getStatus(daysLeft),
    }
    setExpirations([...expirations, newExpiration])
    setFormData({ type: '자동차 검사', expiryDate: '', renewalDate: '' })
    setShowForm(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical':
        return 'destructive'
      case 'warning':
        return 'warning'
      default:
        return 'success'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'critical':
        return '긴급'
      case 'warning':
        return '주의'
      default:
        return '안전'
    }
  }

  return (
    <div className="p-6 md:p-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">만료일 알림</h1>
          <p className="text-gray-600 mt-1">검사, 보험 만료일을 관리하고 자동 계산하세요</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} size="lg">
          {showForm ? '취소' : '항목 추가'}
        </Button>
      </div>

      {showForm && (
        <Card title="새 만료일 항목" className="mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">종류</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>자동차 검사</option>
                  <option>보험 갱신</option>
                  <option>정기점검</option>
                  <option>기타</option>
                </select>
              </div>
              <Input
                label="만료일"
                name="expiryDate"
                type="date"
                value={formData.expiryDate}
                onChange={handleInputChange}
                required
              />
              <Input
                label="갱신 예정일"
                name="renewalDate"
                type="date"
                value={formData.renewalDate}
                onChange={handleInputChange}
              />
            </div>
            <Button type="submit" size="md">등록하기</Button>
          </form>
        </Card>
      )}

      <div className="space-y-3">
        {expirations.map((expiration) => {
          const daysLeft = calculateDaysLeft(expiration.expiryDate)
          return (
            <Card key={expiration.id} title={expiration.type} description={expiration.expiryDate}>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">갱신 예정일: {expiration.renewalDate}</p>
                </div>
                <Badge variant={getStatusColor(expiration.status)}>
                  {daysLeft}일 남음 ({getStatusLabel(expiration.status)})
                </Badge>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}