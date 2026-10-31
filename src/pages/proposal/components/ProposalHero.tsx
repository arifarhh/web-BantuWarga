
import { FilePlus2, ShieldCheck, Users } from 'lucide-react'

export default function ProposalHero() {
  return (
    <section className="bg-[var(--green-light)] py-12 md:py-16">
      <div className="container">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[var(--teal)]">
            <FilePlus2 size={16} />
            LAYANAN USUL WARGA
          </div>

          <h1 className="text-3xl font-bold leading-tight text-[var(--navy)] md:text-5xl">
            Bantu warga yang membutuhkan melalui usulan yang tepat.
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[var(--text)] md:text-lg">
            Sampaikan usulan calon penerima bantuan sosial berdasarkan
            kondisi nyata di lingkungan sekitar. Setiap usulan akan melalui
            proses verifikasi sebelum ditetapkan.
          </p>

          <div className="mt-9 grid gap-4 text-left sm:grid-cols-2">
            <div className="flex items-start gap-4 rounded-xl bg-white p-5 shadow-sm">
              <div className="rounded-lg bg-[var(--green-light)] p-3 text-[var(--teal)]">
                <Users size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-[var(--navy)]">
                  Usulkan siapa saja
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-[var(--text)]">
                  Ajukan diri sendiri atau warga lain yang membutuhkan
                  bantuan sosial.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-xl bg-white p-5 shadow-sm">
              <div className="rounded-lg bg-[var(--green-light)] p-3 text-[var(--teal)]">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-[var(--navy)]">
                  Proses yang transparan
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-[var(--text)]">
                  Usulan akan ditinjau melalui tahapan verifikasi yang
                  dapat dipantau.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}