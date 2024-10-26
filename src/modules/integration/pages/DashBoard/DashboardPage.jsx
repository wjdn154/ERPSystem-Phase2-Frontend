import React from 'react'
import { BarChart, Users, Package, Truck, Leaf, Settings } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { menuItems } from '../../../../config/menuItems';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import GroupsIcon from '@mui/icons-material/Groups';


const salesData = [
    { name: '1월', 매출: 4000, 비용: 2400 },
    { name: '2월', 매출: 3000, 비용: 1398 },
    { name: '3월', 매출: 2000, 비용: 9800 },
    { name: '4월', 매출: 2780, 비용: 3908 },
    { name: '5월', 매출: 1890, 비용: 4800 },
    { name: '6월', 매출: 2390, 비용: 3800 },
]

const productionData = [
    { name: 'A제품', value: 400 },
    { name: 'B제품', value: 300 },
    { name: 'C제품', value: 300 },
    { name: 'D제품', value: 200 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export default function DashboardPage() {
    return (
        <main className="flex-1 overflow-y-auto p-4">
            <div className="max-w-8xl my-10 mx-20">
                {/* Dashboard widgets */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <DashboardWidget icon={AttachMoneyIcon} title="총 매출" value="₩34,192,000" color="bg-blue-500" />
                    <DashboardWidget icon={GroupsIcon} title="총 직원 수" value="1,257명" color="bg-green-500" />
                    <DashboardWidget icon={LocalShippingIcon} title="재고 현황" value="15,234개" color="bg-yellow-500" />
                    <DashboardWidget icon={PrecisionManufacturingIcon} title="생산량" value="5,678개" color="bg-purple-500" />
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
                    <ChartCard title="매출 및 비용 추이">
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={salesData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" tickFormatter={(value = '') => value || ''} />
                                <YAxis tickFormatter={(value = 0) => value || 0} />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="매출" stroke="#3B82F6" strokeWidth={2} dot={{ r: 4 }} />
                                <Line type="monotone" dataKey="비용" stroke="#10B981" strokeWidth={2} dot={{ r: 4 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </ChartCard>
                    <ChartCard title="친환경 인증 현황">
                        <div className="flex items-center justify-center h-[300px]">
                            <div className="relative w-64 h-64">
                                <svg className="w-full h-full" viewBox="0 0 100 100">
                                    <circle
                                        className="text-gray-200 stroke-current"
                                        strokeWidth="10"
                                        cx="50"
                                        cy="50"
                                        r="40"
                                        fill="transparent"
                                    ></circle>
                                    <circle
                                        className="text-green-500 progress-ring__circle stroke-current"
                                        strokeWidth="10"
                                        strokeLinecap="round"
                                        cx="50"
                                        cy="50"
                                        r="40"
                                        fill="transparent"
                                        strokeDasharray="251.2"
                                        strokeDashoffset="25"
                                        transform="rotate(-90 50 50)"
                                    ></circle>
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-4xl font-bold text-green-500">92%</span>
                                    <span className="text-sm text-gray-500 mt-2">친환경 인증 점수</span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-gray-500">에너지 효율</span>
                                <span className="text-sm font-medium text-green-500">95%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '95%' }}></div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-gray-500">재활용 비율</span>
                                <span className="text-sm font-medium text-green-500">88%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '88%' }}></div>
                            </div>
                        </div>
                    </ChartCard>
                </div>

                {/* Additional dashboard content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <Card title="최근 활동">
                        <ActivityTimeline />
                    </Card>
                    <Card title="생산 현황">
                        <ProductionStatus />
                    </Card>
                </div>
            </div>
        </main>
    )
}

function DashboardWidget({ icon: Icon, title, value, color }) {
    return (
        <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
                <div className="flex items-center">
                    <div className={`flex-shrink-0 ${color} rounded-md p-3`}>
                        <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                        <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
                            <dd className="text-lg font-bold text-gray-900">{value}</dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    )
}

function ChartCard({ title, children }) {
    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">{title}</h3>
            {children}
        </div>
    )
}

function Card({ title, children }) {
    return (
        <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">{title}</h3>
                {children}
            </div>
        </div>
    )
}

function ActivityTimeline() {
    const activities = [
        { id: 1, content: '신규 직원 5명 채용', department: '인사', date: '3시간 전' },
        { id: 2, content: '6월 매출 보고서 승인', department: '재무', date: '1일 전' },
        { id: 3, content: '친환경 인증 갱신 완료', department: '인증', date: '2일 전' },
        { id: 4, content: '신규 공급업체 계약 체결', department: '물류', date: '1주일 전' },
    ]

    return (
        <div className="flow-root">
            <ul className="-mb-8">
                {activities.map((item, itemIdx) => (
                    <li key={item.id}>
                        <div className="relative pb-8">
                            {itemIdx !== activities.length - 1 ? (
                                <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                            ) : null}
                            <div className="relative flex space-x-3">
                                <div>
                  <span
                      className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                          item.department === '인사'
                              ? 'bg-blue-500'
                              : item.department === '재무'
                                  ? 'bg-green-500'
                                  : item.department === '인증'
                                      ? 'bg-yellow-500'
                                      : 'bg-purple-500'
                      }`}
                  >
                    <ActivityIcon department={item.department} style={{ width: '15px'}} className="text-white" />
                  </span>
                                </div>
                                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                    <div>
                                        <p className="text-sm text-gray-500">{item.content}</p>
                                    </div>
                                    <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                        <time dateTime={item.date}>{item.date}</time>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

function ActivityIcon({ department, ...props }) {
    switch (department) {
        case '인사':
            return <GroupsIcon {...props} />
        case '재무':
            return <AttachMoneyIcon {...props} />
        case '인증':
            return <Leaf {...props} />
        case '물류':
            return <LocalShippingIcon {...props} />
        default:
            return <Package {...props} />
    }
}

function ProductionStatus() {
    const statuses = [
        { name: '생산 중', percentage: 65, color: 'bg-blue-500' },
        { name: '생산 완료', percentage: 30, color: 'bg-green-500' },
        { name: '생산 지연', percentage: 5, color: 'bg-red-500' },
    ]

    return (
        <div className="space-y-4">
            {statuses.map((status) => (
                <div key={status.name}>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-500">{status.name}</span>
                        <span className="text-sm font-medium text-gray-900">{status.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className={`${status.color} h-2.5 rounded-full`} style={{ width: `${status.percentage}%` }}></div>
                    </div>
                </div>
            ))}
        </div>
    )
}