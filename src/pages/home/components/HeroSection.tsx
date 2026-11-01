import { ArrowRight, FileText, Search } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function HeroSection() {
  return (
    <section
      id="beranda"
      className="relative overflow-hidden bg-[#F4F8F5] pb-20 pt-12 sm:pb-24 sm:pt-16 lg:pb-28 lg:pt-20"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#DCEDE1]/50 blur-3xl sm:h-96 sm:w-96" />
      <div className="pointer-events-none absolute -bottom-20 -left-32 h-64 w-64 rounded-full bg-[#E8F3EA]/60 blur-3xl sm:h-80 sm:w-80" />

      <div className="container relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Hero content */}
          <div className="mx-auto w-full max-w-[570px] lg:mx-0">
            <p className="mb-4 text-xs font-bold tracking-wide text-[var(--teal)] sm:text-sm">
              Bersama Wujudkan Bantuan yang Tepat
            </p>

            <h1 className="text-[clamp(2.35rem,5vw,4.15rem)] font-extrabold leading-[1.1] tracking-[-0.045em] text-[var(--navy)]">
              Informasi bantuan sosial yang{' '}
              <span className="text-[var(--green)]">
                lebih terbuka.
              </span>
            </h1>

            <p className="mt-5 max-w-[480px] text-sm leading-7 text-[var(--text)] sm:mt-6 sm:text-[15px]">
              BantuWarga memudahkan masyarakat menyampaikan usulan data,
              melaporkan ketidaksesuaian, dan memantau tindak lanjut layanan
              bantuan sosial melalui satu portal.
            </p>

            {/* Action buttons */}
            <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row">
              <Link
                to="/proposal"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[var(--light-green)] px-6 py-3.5 text-sm font-bold text-[var(--dark-teal)] transition hover:bg-[var(--green)] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--teal)] focus-visible:ring-offset-2"
              >
                Ajukan Usulan
                <ArrowRight size={17} />
              </Link>

              <a
                href="#layanan"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-[var(--line)] bg-white px-6 py-3.5 text-sm font-bold text-[var(--navy)] transition hover:border-[var(--light-green)] hover:bg-[var(--green-light)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--teal)] focus-visible:ring-offset-2"
              >
                Lihat Layanan
              </a>
            </div>

            {/* Disclaimer */}
            <p className="mt-5 max-w-[470px] text-xs leading-6 text-[var(--muted)]">
              BantuWarga memfasilitasi penyampaian informasi dan pemantauan
              layanan. Penetapan penerima bantuan tetap menjadi kewenangan
              instansi pemerintah yang berwenang.
            </p>
          </div>

          {/* Hero visual */}
          <div className="mx-auto w-full max-w-[550px] lg:ml-auto">
            <div className="relative">
              {/* Image */}
              <div className="relative aspect-[1.12/1] overflow-hidden rounded-2xl bg-[#DCE8DF] shadow-[0_20px_55px_rgba(23,60,81,0.12)]">
                <img
                  src="https://images.unsplash.com/photo-1671080749889-19f8a69deb2b?auto=format&fit=crop&w=1200&q=85"
                  alt="Lingkungan permukiman warga"
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#092328]/75 via-transparent to-transparent" />

                {/* Image caption */}
                <div className="absolute bottom-0 left-0 right-0 p-5 pb-20 sm:p-7 sm:pb-24">
                  <p className="text-xs font-semibold text-white/85 sm:text-sm">
                    Bersama membangun layanan publik
                  </p>

                  <h2 className="mt-2 max-w-md text-xl font-bold leading-snug text-white sm:text-2xl md:text-3xl">
                    Partisipasi warga untuk informasi yang lebih transparan.
                  </h2>
                </div>
              </div>

              {/* Search icon */}
              <div className="absolute -right-2 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-xl border border-white bg-white text-[var(--teal)] shadow-md sm:-right-4 sm:top-8 sm:h-12 sm:w-12">
                <Search size={20} />
              </div>

              {/* Floating service card */}
              <div className="absolute -bottom-5 left-3 z-20 flex max-w-[calc(100%-24px)] items-center gap-3 rounded-xl border border-[var(--line)] bg-white p-3 shadow-[0_12px_30px_rgba(23,60,81,0.15)] sm:-bottom-6 sm:-left-7 sm:max-w-none sm:gap-4 sm:p-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--green-light)] text-[var(--teal)] sm:h-12 sm:w-12">
                  <FileText size={21} />
                </span>

                <div>
                  <p className="text-sm font-bold text-[var(--navy)] sm:text-base">
                    Layanan masyarakat
                  </p>
                  <p className="mt-0.5 text-[11px] leading-5 text-[var(--muted)] sm:text-xs">
                    Usulan dan laporan warga
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}