
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
  MapPin,
  Wallet,
  Users,
  ChartNoAxesCombined,
} from 'lucide-react'
import {
  CircleMarker,
  MapContainer,
  TileLayer,
  Popup,
} from 'react-leaflet'

import 'leaflet/dist/leaflet.css'

const budgetData = [
  { month: 'Jan', anggaran: 420, realisasi: 320 },
  { month: 'Feb', anggaran: 450, realisasi: 370 },
  { month: 'Mar', anggaran: 480, realisasi: 390 },
  { month: 'Apr', anggaran: 460, realisasi: 410 },
  { month: 'Mei', anggaran: 500, realisasi: 430 },
  { month: 'Jun', anggaran: 520, realisasi: 460 },
]

const programData = [
  {
    name: 'Program Keluarga Harapan',
    amount: 'Rp 18,2 M',
    percentage: 75,
  },
  {
    name: 'Bantuan Pangan',
    amount: 'Rp 12,4 M',
    percentage: 60,
  },
  {
    name: 'Bantuan Langsung Tunai',
    amount: 'Rp 9,8 M',
    percentage: 48,
  },
]

const mapPoints = [
  {
    name: 'Wilayah A',
    position: [-7.9666, 112.6326] as [number, number],
    recipients: 125,
  },
  {
    name: 'Wilayah B',
    position: [-7.9566, 112.6426] as [number, number],
    recipients: 86,
  },
  {
    name: 'Wilayah C',
    position: [-7.9766, 112.6226] as [number, number],
    recipients: 104,
  },
  {
    name: 'Wilayah D',
    position: [-7.9466, 112.6226] as [number, number],
    recipients: 72,
  },
]

export default function TransparencySection() {
  return (
    <section
      id="transparansi"
      className="scroll-mt-24 bg-[#F3F7F5] py-20 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* Section Heading */}
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#E3EFE7] px-4 py-2 text-sm font-semibold text-[var(--green-dark)]">
              <ChartNoAxesCombined size={16} />
              Transparansi Publik
            </div>

            <h2 className="text-3xl font-bold leading-tight text-[var(--navy-dark)] md:text-4xl">
              Pantau penyaluran bantuan secara terbuka.
            </h2>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--text-muted)]">
              Lihat ringkasan anggaran, realisasi program, dan persebaran
              penerima bantuan dalam satu tampilan.
            </p>
          </div>

          <a
            href="#data-penerima"
            className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-[var(--green-dark)] transition hover:gap-3"
          >
            Lihat data penerima
            <ArrowUpRight size={17} />
          </a>
        </div>

        {/* Summary Cards */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-[#E3EAE5] bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF3EC] text-[var(--green-dark)]">
                <Wallet size={21} />
              </div>
              <span className="text-xs font-medium text-[var(--text-muted)]">
                Data ilustrasi
              </span>
            </div>
            <p className="text-sm text-[var(--text-muted)]">
              Total anggaran
            </p>
            <h3 className="mt-1 text-2xl font-bold text-[var(--navy-dark)]">
              Rp 48,6 M
            </h3>
            <p className="mt-2 text-xs text-[var(--text-muted)]">
              Anggaran program bantuan
            </p>
          </div>

          <div className="rounded-2xl border border-[#E3EAE5] bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF3EC] text-[var(--green-dark)]">
                <Users size={21} />
              </div>
              <span className="text-xs font-medium text-[var(--text-muted)]">
                Data ilustrasi
              </span>
            </div>
            <p className="text-sm text-[var(--text-muted)]">
              Penerima bantuan
            </p>
            <h3 className="mt-1 text-2xl font-bold text-[var(--navy-dark)]">
              18.642 KK
            </h3>
            <p className="mt-2 text-xs text-[var(--text-muted)]">
              Total keluarga penerima
            </p>
          </div>

          <div className="rounded-2xl border border-[#E3EAE5] bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF3EC] text-[var(--green-dark)]">
                <ChartNoAxesCombined size={21} />
              </div>
              <span className="text-xs font-medium text-[var(--text-muted)]">
                Data ilustrasi
              </span>
            </div>
            <p className="text-sm text-[var(--text-muted)]">
              Realisasi anggaran
            </p>
            <h3 className="mt-1 text-2xl font-bold text-[var(--navy-dark)]">
              78,4%
            </h3>
            <p className="mt-2 text-xs text-[var(--text-muted)]">
              Persentase penyerapan anggaran
            </p>
          </div>
        </div>

        {/* Map and Chart */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* Map */}
          <div className="overflow-hidden rounded-2xl border border-[#E3EAE5] bg-white lg:col-span-3">
            <div className="flex flex-wrap items-center justify-between gap-3 p-5">
              <div>
                <h3 className="font-bold text-[var(--navy-dark)]">
                  Persebaran Penerima Bantuan
                </h3>
                <p className="mt-1 text-sm text-[var(--text-muted)]">
                  Contoh titik penerima berdasarkan wilayah
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EAF3EC] px-3 py-1.5 text-xs font-semibold text-[var(--green-dark)]">
                <MapPin size={13} />
                Data ilustrasi
              </span>
            </div>

            <div className="h-[340px] w-full">
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
                    radius={10}
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
                      {point.recipients} keluarga penerima (ilustrasi)
                    </Popup>
                  </CircleMarker>
                ))}
              </MapContainer>
            </div>

            <div className="border-t border-[#E8EEEA] px-5 py-3">
              <p className="text-xs leading-relaxed text-[var(--text-muted)]">
                Lokasi dan jumlah penerima pada peta merupakan data contoh,
                bukan persebaran penerima bantuan sebenarnya.
              </p>
            </div>
          </div>

          {/* Budget Chart */}
          <div className="rounded-2xl border border-[#E3EAE5] bg-white p-5 lg:col-span-2">
            <div className="mb-6">
              <h3 className="font-bold text-[var(--navy-dark)]">
                Anggaran dan Realisasi
              </h3>
              <p className="mt-1 text-sm text-[var(--text-muted)]">
                Perbandingan anggaran dan realisasi per bulan
              </p>
            </div>

            <div className="h-[260px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={budgetData}
                  margin={{ top: 8, right: 4, left: -20, bottom: 0 }}
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
                    tickFormatter={(value) => `${value}`}
                  />
                  <Tooltip
                    formatter={(value) => [`Rp ${value} juta`]}
                    contentStyle={{
                      borderRadius: '12px',
                      border: '1px solid #E3EAE5',
                      fontSize: '12px',
                    }}
                  />
                  <Bar
                    dataKey="anggaran"
                    name="Anggaran"
                    fill="#D7E8DC"
                    radius={[5, 5, 0, 0]}
                  />
                  <Bar
                    dataKey="realisasi"
                    name="Realisasi"
                    fill="#2A835F"
                    radius={[5, 5, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 flex flex-wrap gap-5">
              <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                <span className="h-2.5 w-2.5 rounded-sm bg-[#D7E8DC]" />
                Anggaran
              </div>
              <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                <span className="h-2.5 w-2.5 rounded-sm bg-[#2A835F]" />
                Realisasi
              </div>
            </div>

            <p className="mt-5 border-t border-[#E8EEEA] pt-4 text-xs leading-relaxed text-[var(--text-muted)]">
              Nilai grafik merupakan data simulasi dalam satuan juta rupiah.
            </p>
          </div>
        </div>

        {/* Program Breakdown */}
        <div className="mt-6 rounded-2xl border border-[#E3EAE5] bg-white p-5 md:p-6">
          <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <div>
              <h3 className="font-bold text-[var(--navy-dark)]">
                Rincian Realisasi Program
              </h3>
              <p className="mt-1 text-sm text-[var(--text-muted)]">
                Contoh progres penyaluran anggaran setiap program
              </p>
            </div>
            <span className="w-fit rounded-full bg-[#F1F5F2] px-3 py-1.5 text-xs font-medium text-[var(--text-muted)]">
              Data ilustrasi
            </span>
          </div>

          <div className="space-y-6">
            {programData.map((program) => (
              <div key={program.name}>
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-[var(--navy-dark)]">
                    {program.name}
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-[var(--navy-dark)]">
                      {program.amount}
                    </span>
                    <span className="text-xs text-[var(--text-muted)]">
                      {program.percentage}%
                    </span>
                  </div>
                </div>

                <div className="h-2.5 overflow-hidden rounded-full bg-[#EDF2EE]">
                  <div
                    className="h-full rounded-full bg-[var(--green)] transition-all"
                    style={{ width: `${program.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-5 text-center text-xs text-[var(--text-muted)]">
          Catatan: Seluruh angka, grafik, dan lokasi pada bagian ini masih
          merupakan data ilustrasi untuk keperluan pengembangan antarmuka.
        </p>
      </div>
    </section>
  )
}