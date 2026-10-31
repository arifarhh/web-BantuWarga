
import {
  ArrowRight,
  FilePlus2,
  MessageSquareWarning,
  ShieldCheck,
} from 'lucide-react'

export default function CTASection() {
  return (
    <section
      id="usul-warga"
      className="scroll-mt-24 bg-white px-5 py-20 md:px-8 md:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl bg-[var(--dark-teal)] px-6 py-12 md:px-12 md:py-16">
          {/* Decorative Elements */}
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full border border-white/10" />
          <div className="absolute -right-8 -top-12 h-52 w-52 rounded-full border border-white/10" />
          <div className="absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-[#2A835F]/20 blur-3xl" />

          <div className="relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-[#D7EBE0]">
                <ShieldCheck size={16} />
                Bersama mengawasi bantuan sosial
              </div>

              <h2 className="max-w-xl text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
                Perubahan dimulai dari kepedulian warga.
              </h2>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80">
                BantuWarga membuka ruang bagi masyarakat untuk ikut
                mengawasi penyaluran bantuan sosial secara transparan,
                bertanggung jawab, dan tepat sasaran.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Usul Warga */}
              <a
                href="#usul-warga"
                className="group rounded-2xl border border-white/15 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8F3EA] text-[#12544F]">
                  <FilePlus2 size={24} />
                </div>

                <h3 className="text-lg font-bold text-[#092328]">
                  Usul Warga
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-[#536875]">
                  Ajukan diri atau warga lain untuk mendapatkan bantuan.
                </p>

                <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#12544F] transition group-hover:gap-3">
                  Ajukan usulan
                  <ArrowRight size={16} />
                </span>
              </a>

              {/* Sanggah Warga */}
              <a
                href="#sanggah-warga"
                className="group rounded-2xl border border-white/20 bg-[#173C51] p-6 transition duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-[#24526A]"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 text-[#D7EBE0]">
                  <MessageSquareWarning size={24} />
                </div>

                <h3 className="text-lg font-bold text-white">
                  Sanggah Warga
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-white/85">
                  Sampaikan keberatan terhadap data penerima yang perlu ditinjau.
                </p>

                <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#D7EBE0] transition group-hover:gap-3">
                  Sampaikan sanggahan
                  <ArrowRight size={16} />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}