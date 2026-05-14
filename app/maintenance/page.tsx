'use client'

import { useState } from 'react'
import Card from '@/components/ui/card'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import Badge from '@/components/ui/badge'

interface Maintenance {
  id: number
  name: string
  scheduledDate: string
  cycle: number
  status: 'completed' | 'pending' | 'overdue'
  memo: string
}

export default function MaintenancePage() {
  const [maintenances, setMaintenances] = useState<Maintenance[]>([
    { id: 1, name: '정기 오일 교체', scheduledDate: '2024-04-15', cycle: 6, status: 'pending', memo: '10,000km 또는 6개월마다' },
    { id: 2, name: '타이어 점검', scheduledDate: '2024-03-25', cycle: 12, status: 'overdue', memo: '마모도 확인' },
    { id: 3, name: '에어컨 필터 교체', scheduledDate: '2024-05-10', cycle: 12, status: 'pending', memo: '' },
  ])

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    scheduledDate: '',
    cycle: '',
    status: 'pending' as const,
    memo: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newMaintenance: Maintenance = {
      id: maintenances.length + 1,
      name: formData.name,
      scheduledDate: formData.scheduledDate,
      cycle: parseInt(formData.cycle) || 0,
      status: formData.status,
      memo: formData.memo,
    }
    setMaintenances([...maintenances, newMaintenance])
    setFormData({ name: '', scheduledDate: '', cycle: '', status: 'pending', memo: '' })
    setShowForm(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success'
      case 'pending':
        return 'default'
      case 'overdue':
        return 'destructive'
      default:
        return 'default'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return '완료'
      case 'pending':
        return '예정'
      case 'overdue':
        return '지연'
      default:
        return status
    }
  }

  return (
    <div className="p-6 md:p-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">유지보수 일정</h1>
          <p className="text-gray-600 mt-1">정기 점검 및 정비 항목을 관리하세요</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} size="lg">
          {showForm ? '취소' : '일정 추가'}
        </Button>
      </div>

      {showForm && (
        <Card title="새 유지보수 일정" className="mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="항목명"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="예: 정기 오일 교체"
                required
              />
              <Input
                label="예정일"
                name="scheduledDate"
                type="date"
                value={formData.scheduledDate}
                onChange={handleInputChange}
                required
              />
              <Input
                label="주기 (월)"
                name="cycle"
                type="number"
                value={formData.cycle}
                onChange={handleInputChange}
                placeholder="6"
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">상태</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="pending">예정</option>
                  <option value="completed">완료</option>
                  <option value="overdue">지연</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">메모</label>
              <textarea
                name="memo"
                value={formData.memo}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="유지보수 관련 메모를 작성하세요"
              />
            </div>
            <Button type="submit" size="md">등록하기</Button>
          </form>
        </Card>
      )}

      <div className="space-y-3">
        {maintenances.map((maintenance) => (
          <Card key={maintenance.id} title={maintenance.name} description={maintenance.scheduledDate}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-1">
                <p className="text-sm text-gray-600">{maintenance.cycle}개월 주기 · {maintenance.memo}</p>
              </div>
              <Badge variant={getStatusColor(maintenance.status)}>
                {getStatusLabel(maintenance.status)}
              </Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
