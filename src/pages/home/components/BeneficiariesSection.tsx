
import {
  ArrowUpRight,
  Users,
  MapPin,
  TrendingUp,
} from 'lucide-react'
import { Link } from 'react-router-dom'

const regionalData = [
  {
    region: 'Lowokwaru',
    recipients: 125,
    percentage: 100,
  },
  {
    region: 'Blimbing',
    recipients: 104,
    percentage: 83,
  },
  {
    region: 'Klojen',
    recipients: 86,
    percentage: 69,
  },
  {
    region: 'Sukun',
    recipients: 72,
    percentage: 58,
  },
]

export default function BeneficiariesSection() {
  return (
    <section
      id="data-penerima"
      className="scroll-mt-24 overflow-hidden bg-white py-20 sm:py-24"
    >
      <div className="container">
        {/* Section heading */}
        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-[620px]">
            <p className="mb-4 text-xs font-bold tracking-wide text-[var(--teal)]">
              Informasi Penerima
            </p>

            <h2 className="text-3xl font-extrabold leading-tight tracking-[-0.04em] text-[var(--navy)] sm:text-4xl">
              Persebaran bantuan sosial
              <span className="text-[var(--green)]"> di berbagai wilayah.</span>
            </h2>

            <p className="mt-4 max-w-[510px] text-sm leading-7 text-[var(--text)]">
              Lihat ringkasan jumlah penerima bantuan sosial berdasarkan
              wilayah kecamatan di Kota Malang.
            </p>
          </div>

          <a
            href="#transparansi"
            className="inline-flex w-fit items-center gap-2 text-sm font-bold text-[var(--teal)] transition-all duration-300 hover:gap-3 hover:text-[var(--green)]"
          >
            Lihat dashboard transparansi
            <ArrowUpRight size={17} />
          </a>
        </div>

        {/* Regional overview */}
        <div className="grid gap-5 lg:grid-cols-5">
          {/* Total recipients card */}
          <div className="beneficiary-total relative flex min-h-[300px] flex-col justify-between overflow-hidden rounded-2xl bg-[var(--dark-teal)] p-6 text-white sm:p-8 lg:col-span-2">
            {/* Background decoration */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full border border-white/10" />
            <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full border border-white/10" />
            <div className="pointer-events-none absolute -bottom-20 -left-12 h-48 w-48 rounded-full bg-[var(--green)]/20 blur-2xl" />

            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-[var(--light-green)]">
                <Users size={23} strokeWidth={1.8} />
              </div>

              <p className="mt-7 text-sm font-medium text-white/70">
                Total penerima bantuan
              </p>

              <div className="mt-2 flex items-baseline gap-2">
                <h3 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                  387
                </h3>
                <span className="text-base font-semibold text-white/70">
                  KK
                </span>
              </div>

              <p className="mt-3 max-w-[230px] text-xs leading-6 text-white/65">
                Jumlah keluarga pada wilayah yang ditampilkan.
              </p>
            </div>

            <div className="relative mt-8 flex items-center justify-between border-t border-white/15 pt-5">
              <div className="flex items-center gap-2 text-xs text-white/75">
                <MapPin size={15} className="text-[var(--light-green)]" />
                Kota Malang
              </div>
            </div>
          </div>

          {/* Regional distribution */}
          <div className="beneficiary-regions rounded-2xl border border-[var(--line)] bg-white p-5 shadow-[0_10px_30px_rgba(23,60,81,0.04)] sm:p-7 lg:col-span-3">
            <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h3 className="text-base font-bold text-[var(--navy)] sm:text-lg">
                  Jumlah Penerima per Kecamatan
                </h3>

                <p className="mt-1 text-xs leading-5 text-[var(--muted)]">
                  Distribusi penerima berdasarkan wilayah.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-medium text-[var(--teal)]">
                <TrendingUp size={15} />
                4 Wilayah
              </div>
            </div>

            <div className="space-y-7">
              {regionalData.map((item, index) => (
                <div
                  key={item.region}
                  className={`beneficiary-row beneficiary-row-${index + 1}`}
                >
                  <div className="mb-2.5 flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--green-light)] text-xs font-bold text-[var(--teal)]">
                        0{index + 1}
                      </span>

                      <p className="truncate text-sm font-semibold text-[var(--navy)]">
                        {item.region}
                      </p>
                    </div>

                    <p className="shrink-0 text-sm font-extrabold text-[var(--navy)]">
                      {item.recipients}
                      <span className="ml-1 text-xs font-medium text-[var(--muted)]">
                        KK
                      </span>
                    </p>
                  </div>

                  <div className="ml-11 h-2.5 overflow-hidden rounded-full bg-[#EDF2EE]">
                    <div
                      className="beneficiary-progress h-full rounded-full"
                      style={{
                        width: `${item.percentage}%`,
                        background:
                          index === 0 ? 'var(--green)' : '#8BBB92',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-[var(--line)] pt-5">
              <p className="text-[11px] text-[var(--muted)]">
                Satuan jumlah penerima
              </p>

              <p className="text-xs font-semibold text-[var(--teal)]">
                Kepala Keluarga (KK)
              </p>
            </div>
          </div>
        </div>

        {/* Sanggah CTA */}
        <div className="beneficiary-cta mt-6 flex flex-col justify-between gap-5 rounded-2xl bg-[#F1F6F2] p-6 sm:flex-row sm:items-center sm:p-8">
          <div className="max-w-[560px]">
            <p className="text-xs font-bold text-[var(--teal)]">
              Partisipasi Masyarakat
            </p>

            <h3 className="mt-2 text-lg font-extrabold text-[var(--navy)] sm:text-xl">
              Menemukan informasi yang tidak sesuai?
            </h3>

            <p className="mt-2 text-sm leading-6 text-[var(--text)]">
              Sampaikan sanggahan apabila menemukan ketidaksesuaian
              informasi penerima bantuan agar dapat ditindaklanjuti
              melalui proses verifikasi.
            </p>
          </div>

          <Link
            to="/dispute"
            className="inline-flex min-h-12 w-fit shrink-0 items-center justify-center gap-2 rounded-lg bg-[var(--light-green)] px-5 py-3 text-sm font-bold text-[var(--dark-teal)] transition-all duration-300 hover:-translate-y-1 hover:bg-[var(--green)] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--teal)] focus-visible:ring-offset-2"
          >
            Sampaikan Sanggahan
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  )
}
