
import { Wallet, Users, Clock3 } from 'lucide-react'

const statistics = [
  {
    label: 'Total anggaran bantuan',
    value: 'Rp 48,6 M',
    note: 'Anggaran bantuan tahun 2025',
    icon: Wallet,
    iconStyle: 'bg-[#E8F3EA] text-[#4F8B68]',
  },
  {
    label: 'Penerima manfaat',
    value: '18.642 KK',
    note: 'Jumlah keluarga penerima',
    icon: Users,
    iconStyle: 'bg-[#E8F1F6] text-[#5C829D]',
  },
  {
    label: 'Rata-rata waktu respons',
    value: '2,4 Hari',
    note: 'Rata-rata penanganan laporan',
    icon: Clock3,
    iconStyle: 'bg-[#FBF1E2] text-[#C28B3F]',
  },
]

export default function StatisticsSection() {
  return (
    <section className="relative z-20 -mt-10 pb-14 sm:-mt-12 sm:pb-16">
      <div className="container">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
          {statistics.map((item, index) => {
            const Icon = item.icon

            return (
              <div
                key={item.label}
                className={`stat-card stat-card-${index + 1} group flex min-w-0 items-center gap-4 rounded-2xl border border-[var(--line)] bg-white px-5 py-5 shadow-[0_12px_35px_rgba(23,60,81,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(23,60,81,0.12)] sm:px-6 sm:py-6 ${
                  index === 2 ? 'sm:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${item.iconStyle}`}
                >
                  <Icon size={21} strokeWidth={1.8} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-medium leading-5 text-[var(--muted)]">
                    {item.label}
                  </p>

                  <p className="mt-1 text-xl font-extrabold tracking-tight text-[var(--navy)] sm:text-2xl">
                    {item.value}
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-[var(--text)]">
                    {item.note}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
