
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import {
  ArrowUpRight,
  Wallet,
  Users,
  ChartNoAxesCombined,
  MapPin,
} from 'lucide-react'

import {
  CircleMarker,
  MapContainer,
  TileLayer,
  Popup,
} from 'react-leaflet'

import 'leaflet/dist/leaflet.css'

const summary = [
  {
    label: 'Total anggaran bantuan',
    value: 'Rp 48,6 M',
    icon: Wallet,
    iconStyle: 'bg-[#E8F3EA] text-[#4F8B68]',
  },
  {
    label: 'Penerima manfaat',
    value: '18.642 KK',
    icon: Users,
    iconStyle: 'bg-[#E8F1F6] text-[#5C829D]',
  },
  {
    label: 'Realisasi anggaran',
    value: '78,4%',
    icon: ChartNoAxesCombined,
    iconStyle: 'bg-[#FBF1E2] text-[#C28B3F]',
  },
]

const budgetData = [
  { month: 'Jan', anggaran: 420, realisasi: 320 },
  { month: 'Feb', anggaran: 450, realisasi: 370 },
  { month: 'Mar', anggaran: 480, realisasi: 390 },
  { month: 'Apr', anggaran: 460, realisasi: 410 },
  { month: 'Mei', anggaran: 500, realisasi: 430 },
  { month: 'Jun', anggaran: 520, realisasi: 460 },
]

const programs = [
  {
    name: 'Program Keluarga Harapan',
    percentage: 75,
  },
  {
    name: 'Bantuan Pangan',
    percentage: 60,
  },
  {
    name: 'Bantuan Langsung Tunai',
    percentage: 48,
  },
]

const mapPoints = [
  {
    name: 'Area 1',
    position: [-7.9666, 112.6326] as [number, number],
    recipients: 125,
  },
  {
    name: 'Area 2',
    position: [-7.9566, 112.6426] as [number, number],
    recipients: 86,
  },
  {
    name: 'Area 3',
    position: [-7.9766, 112.6226] as [number, number],
    recipients: 104,
  },
  {
    name: 'Area 4',
    position: [-7.9466, 112.6226] as [number, number],
    recipients: 72,
  },
]

export default function TransparencySection() {
  return (
    <section
      id="transparansi"
      className="scroll-mt-24 overflow-hidden bg-[#F3F7F5] py-20 sm:py-24"
    >
      <div className="container">
        {/* Section heading */}
        <div className="mb-10 flex flex-col justify-between gap-5 sm:mb-12 md:flex-row md:items-end">
          <div className="max-w-[620px]">
            <p className="mb-4 text-xs font-bold tracking-wide text-[var(--teal)]">
              Transparansi Publik
            </p>

            <h2 className="text-3xl font-extrabold leading-tight tracking-[-0.04em] text-[var(--navy)] sm:text-4xl">
              Informasi bantuan sosial{' '}
              <span className="text-[var(--green)]">
                lebih terbuka.
              </span>
            </h2>

            <p className="mt-4 max-w-[510px] text-sm leading-7 text-[var(--text)]">
              Pantau ringkasan anggaran, perkembangan realisasi program,
              dan persebaran penerima bantuan berdasarkan wilayah.
            </p>
          </div>

          <a
            href="#data-penerima"
            className="inline-flex w-fit items-center gap-2 text-sm font-bold text-[var(--teal)] transition-all duration-300 hover:gap-3 hover:text-[var(--green)]"
          >
            Lihat informasi penerima
            <ArrowUpRight size={17} />
          </a>
        </div>

        {/* Summary cards */}
        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          {summary.map((item, index) => {
            const Icon = item.icon

            return (
              <div
                key={item.label}
                className={`transparency-card transparency-card-${index + 1} flex items-center gap-4 rounded-2xl border border-[var(--line)] bg-white p-5 shadow-[0_8px_25px_rgba(23,60,81,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(23,60,81,0.09)] sm:p-6`}
              >
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${item.iconStyle}`}
                >
                  <Icon size={21} strokeWidth={1.8} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-[var(--muted)]">
                    {item.label}
                  </p>

                  <p className="mt-1 text-xl font-extrabold tracking-tight text-[var(--navy)] sm:text-2xl">
                    {item.value}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Map and budget chart */}
        <div className="grid gap-5 lg:grid-cols-5">
          {/* Distribution map */}
          <div className="transparency-panel overflow-hidden rounded-2xl border border-[var(--line)] bg-white lg:col-span-3">
            <div className="flex flex-wrap items-center justify-between gap-3 p-5 sm:p-6">
              <div>
                <h3 className="font-bold text-[var(--navy)]">
                  Persebaran Penerima Bantuan
                </h3>

                <p className="mt-1 text-xs leading-5 text-[var(--muted)]">
                  Peta persebaran berdasarkan wilayah Kota Malang
                </p>
              </div>

              <span className="inline-flex items-center gap-2 rounded-lg bg-[var(--green-light)] px-3 py-2 text-xs font-semibold text-[var(--teal)]">
                <MapPin size={14} />
                Kota Malang
              </span>
            </div>

            <div className="relative h-[300px] w-full sm:h-[350px]">
              <MapContainer
                center={[-7.9666, 112.6326]}
                zoom={13}
                scrollWheelZoom={false}
                className="h-full w-full"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {mapPoints.map((point) => (
                  <CircleMarker
                    key={point.name}
                    center={point.position}
                    radius={9}
                    pathOptions={{
                      color: '#FFFFFF',
                      weight: 2,
                      fillColor: '#2A835F',
                      fillOpacity: 0.9,
                    }}
                  >
                    <Popup>
                      <strong>{point.name}</strong>
                      <br />
                      {point.recipients} keluarga
                    </Popup>
                  </CircleMarker>
                ))}
              </MapContainer>
            </div>
          </div>

          {/* Budget chart */}
          <div className="transparency-panel rounded-2xl border border-[var(--line)] bg-white p-5 sm:p-6 lg:col-span-2">
            <div className="mb-6">
              <h3 className="font-bold text-[var(--navy)]">
                Anggaran dan Realisasi
              </h3>

              <p className="mt-1 text-xs leading-5 text-[var(--muted)]">
                Perbandingan anggaran dan realisasi per bulan.
              </p>
            </div>

            <div className="h-[260px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={budgetData}
                  margin={{
                    top: 8,
                    right: 4,
                    left: -20,
                    bottom: 0,
                  }}
                  barGap={5}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#E8EEEA"
                  />

                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#84949E', fontSize: 11 }}
                  />

                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#84949E', fontSize: 11 }}
                  />

                  <Tooltip
                    formatter={(value) => [`Rp ${value} juta`]}
                    contentStyle={{
                      borderRadius: '12px',
                      border: '1px solid #E3E9EB',
                      fontSize: '12px',
                    }}
                  />

                  <Bar
                    dataKey="anggaran"
                    name="Anggaran"
                    fill="#D7E8DC"
                    radius={[5, 5, 0, 0]}
                    animationDuration={1200}
                    animationBegin={200}
                  />

                  <Bar
                    dataKey="realisasi"
                    name="Realisasi"
                    fill="#2A835F"
                    radius={[5, 5, 0, 0]}
                    animationDuration={1200}
                    animationBegin={450}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-5 flex flex-wrap gap-5 border-t border-[var(--line)] pt-4">
              <div className="flex items-center gap-2 text-xs text-[var(--text)]">
                <span className="h-2.5 w-2.5 rounded-sm bg-[#D7E8DC]" />
                Anggaran
              </div>

              <div className="flex items-center gap-2 text-xs text-[var(--text)]">
                <span className="h-2.5 w-2.5 rounded-sm bg-[#2A835F]" />
                Realisasi
              </div>
            </div>
          </div>
        </div>

        {/* Program realization */}
        <div className="transparency-panel mt-5 rounded-2xl border border-[var(--line)] bg-white p-5 sm:p-7">
          <div className="mb-7 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <div>
              <h3 className="font-bold text-[var(--navy)]">
                Realisasi Program Bantuan
              </h3>

              <p className="mt-1 text-xs leading-5 text-[var(--muted)]">
                Perkembangan realisasi anggaran setiap program.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {programs.map((program, index) => (
              <div
                key={program.name}
                className={`program-progress program-progress-${index + 1}`}
              >
                <div className="mb-2 flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold text-[var(--navy)] sm:text-sm">
                    {program.name}
                  </p>

                  <span className="shrink-0 text-xs font-bold text-[var(--teal)]">
                    {program.percentage}%
                  </span>
                </div>

                <div
                  className="h-2.5 overflow-hidden rounded-full bg-[#EDF2EE]"
                  role="progressbar"
                  aria-label={`Realisasi ${program.name}`}
                  aria-valuenow={program.percentage}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="program-progress-bar h-full rounded-full bg-[var(--green)]"
                    style={{ width: `${program.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}