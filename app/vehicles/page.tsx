'use client'

import { useState } from 'react'
import Card from '@/components/ui/card'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'

interface Vehicle {
  id: number
  number: string
  model: string
  purchaseDate: string
  mileage: number
  color: string
  engineNumber: string
}

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      id: 1,
      number: '11가1234',
      model: '현대 싼타페',
      purchaseDate: '2020-05-15',
      mileage: 45230,
      color: '검정색',
      engineNumber: 'ENG001',
    },
  ])

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    number: '',
    model: '',
    purchaseDate: '',
    mileage: '',
    color: '',
    engineNumber: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newVehicle: Vehicle = {
      id: vehicles.length + 1,
      number: formData.number,
      model: formData.model,
      purchaseDate: formData.purchaseDate,
      mileage: parseInt(formData.mileage) || 0,
      color: formData.color,
      engineNumber: formData.engineNumber,
    }
    setVehicles([...vehicles, newVehicle])
    setFormData({ number: '', model: '', purchaseDate: '', mileage: '', color: '', engineNumber: '' })
    setShowForm(false)
  }

  return (
    <div className="p-6 md:p-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">차량 목록</h1>
          <p className="text-gray-600 mt-1">보유 중인 모든 차량을 확인하고 관리하세요</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} size="lg">
          {showForm ? '취소' : '차량 추가'}
        </Button>
      </div>

      {showForm && (
        <Card title="새 차량 등록" className="mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="차량번호"
                name="number"
                value={formData.number}
                onChange={handleInputChange}
                placeholder="예: 11가1234"
                required
              />
              <Input
                label="차종"
                name="model"
                value={formData.model}
                onChange={handleInputChange}
                placeholder="예: 현대 싼타페"
                required
              />
              <Input
                label="구매일"
                name="purchaseDate"
                type="date"
                value={formData.purchaseDate}
                onChange={handleInputChange}
                required
              />
              <Input
                label="초기주행거리 (km)"
                name="mileage"
                type="number"
                value={formData.mileage}
                onChange={handleInputChange}
                placeholder="0"
                required
              />
              <Input
                label="색상"
                name="color"
                value={formData.color}
                onChange={handleInputChange}
                placeholder="예: 검정색"
              />
              <Input
                label="엔진번호"
                name="engineNumber"
                value={formData.engineNumber}
                onChange={handleInputChange}
              />
            </div>
            <Button type="submit" size="md">등록하기</Button>
          </form>
        </Card>
      )}

      <div className="grid gap-4">
        {vehicles.map((vehicle) => (
          <Card
            key={vehicle.id}
            title={vehicle.model}
            description={vehicle.number}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-600">구매일</p>
                <p className="font-medium text-gray-900">{vehicle.purchaseDate}</p>
              </div>
              <div>
                <p className="text-gray-600">현재주행거리</p>
                <p className="font-medium text-gray-900">{vehicle.mileage.toLocaleString()} km</p>
              </div>
              <div>
                <p className="text-gray-600">색상</p>
                <p className="font-medium text-gray-900">{vehicle.color}</p>
              </div>
              <div>
                <p className="text-gray-600">엔진번호</p>
                <p className="font-medium text-gray-900">{vehicle.engineNumber}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
