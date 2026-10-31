
import { Wallet, Users, Clock3, TrendingUp } from 'lucide-react'

const statistics = [
  {
    label: 'Total anggaran 2025',
    value: 'Rp 48,6 M',
    note: '81% terealisasi',
    icon: Wallet,
    iconStyle: 'bg-[#E8F3EA] text-[#5F9270]',
  },
  {
    label: 'Penerima manfaat',
    value: '18.642 KK',
    note: '+6,2% tahun ini',
    icon: Users,
    iconStyle: 'bg-[#E8F1F6] text-[#648DA7]',
  },
  {
    label: 'Rata-rata respons',
    value: '2,4 Hari',
    note: '1,2 hari lebih cepat',
    icon: Clock3,
    iconStyle: 'bg-[#FBF1E2] text-[#D49A48]',
  },
]

export default function StatisticsSection() {
  return (
    <section className="relative z-10 -mt-1 pb-12">
      <div className="container">
        <div className="grid overflow-hidden rounded-2xl border border-[var(--line)] bg-white shadow-[var(--shadow)] md:grid-cols-3">
          {statistics.map((item, index) => {
            const Icon = item.icon

            return (
              <div
                key={item.label}
                className={`flex min-w-0 items-center gap-3 px-5 py-5 sm:px-6 ${
                  index !== 0 ? 'border-t border-[var(--line)] md:border-l md:border-t-0' : ''
                }`}
              >
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${item.iconStyle}`}
                >
                  <Icon size={20} strokeWidth={1.8} />
                </span>

                <div className="min-w-0 flex-1">
                  <p className="text-[10px] text-[var(--muted)]">
                    {item.label}
                  </p>
                  <p className="mt-1 text-lg font-extrabold tracking-tight text-[var(--navy)]">
                    {item.value}
                  </p>
                </div>

                <span className="hidden shrink-0 rounded-md bg-[var(--green-light)] px-2 py-1 text-[9px] font-bold text-[var(--green)] sm:inline-flex">
                  <TrendingUp size={11} className="mr-1" />
                  {item.note}
                </span>
              </div>
            )
          })}
        </div>

        <p className="mt-3 text-right text-[9px] text-[var(--muted)]">
          * Angka merupakan data ilustrasi dari prototype desain, bukan data
          resmi penyaluran bantuan.
        </p>
      </div>
    </section>
  )
}