
import { ShieldCheck, Phone, ArrowUpRight } from 'lucide-react'

const serviceLinks = [
  { label: 'Usul Warga', href: '#usul-warga' },
  { label: 'Sanggah Warga', href: '#sanggah-warga' },
  { label: 'Lacak Tiket', href: '#lacak-tiket' },
]

const informationLinks = [
  { label: 'Open Data', href: '#transparansi' },
  { label: 'Data Penerima', href: '#data-penerima' },
  { label: 'Cara Kerja', href: '#cara-kerja' },
]

export default function Footer() {
  return (
    <footer className="border-t border-[var(--line)] bg-[#F3F7F5]">
      <div className="container py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <a href="#beranda" className="inline-flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--dark-teal)] text-white">
                <ShieldCheck size={22} />
              </div>
              <div>
                <p className="text-sm font-extrabold text-[var(--navy)]">
                  BantuWarga
                </p>
                <p className="text-[9px] tracking-wider text-[var(--muted)]">
                  PORTAL TRANSPARANSI BANSOS
                </p>
              </div>
            </a>

            <p className="mt-5 max-w-xs text-xs leading-6 text-[var(--text)]">
              Kolaborasi pemerintah dan masyarakat untuk bantuan sosial yang
              lebih adil dan tepat sasaran.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-xs font-extrabold text-[var(--navy)]">
              Layanan
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-xs text-[var(--text)] transition hover:text-[var(--green)]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="mb-4 text-xs font-extrabold text-[var(--navy)]">
              Informasi
            </h3>
            <ul className="space-y-3">
              {informationLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-xs text-[var(--text)] transition hover:text-[var(--green)]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-xs font-extrabold text-[var(--navy)]">
              Butuh bantuan?
            </h3>
            <p className="text-xs text-[var(--text)]">
              Hubungi layanan warga
            </p>

            <a
              href="tel:112"
              className="mt-3 inline-flex items-center gap-2 text-xl font-extrabold text-[var(--navy)]"
            >
              <Phone size={17} />
              112
              <span className="rounded-full bg-[var(--green-light)] px-2 py-1 text-[9px] font-semibold text-[var(--green)]">
                Darurat saja
              </span>
            </a>

            <p className="mt-2 text-[10px] leading-5 text-[var(--muted)]">
              Untuk keadaan darurat. Informasi kontak layanan pengaduan
              BantuWarga akan disesuaikan dengan instansi terkait.
            </p>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="mt-10 flex flex-col gap-4 border-t border-[var(--line)] pt-6 text-[10px] text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} BantuWarga. Portal Transparansi
            Bantuan Sosial.
          </p>

          <div className="flex flex-wrap items-center gap-5">
            <a href="#kebijakan-privasi" className="hover:text-[var(--green)]">
              Kebijakan Privasi
            </a>
            <a href="#syarat-layanan" className="hover:text-[var(--green)]">
              Syarat Layanan
            </a>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--green)]" />
              Sistem informasi publik
              <ArrowUpRight size={11} />
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}