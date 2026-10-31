
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Eye,
  FileSearch,
  ShieldCheck,
} from 'lucide-react'

const beneficiaries = [
  {
    id: 'BW-001',
    name: 'S**** A*******',
    nik: '3573********0001',
    region: 'Kecamatan Lowokwaru',
    program: 'Program Keluarga Harapan',
    status: 'Terverifikasi',
  },
  {
    id: 'BW-002',
    name: 'M**** R******',
    nik: '3573********0002',
    region: 'Kecamatan Klojen',
    program: 'Bantuan Pangan',
    status: 'Terverifikasi',
  },
  {
    id: 'BW-003',
    name: 'S**** W*****',
    nik: '3573********0003',
    region: 'Kecamatan Blimbing',
    program: 'Bantuan Pangan',
    status: 'Dalam Peninjauan',
  },
  {
    id: 'BW-004',
    name: 'A**** P******',
    nik: '3573********0004',
    region: 'Kecamatan Sukun',
    program: 'Bantuan Langsung Tunai',
    status: 'Terverifikasi',
  },
]

function StatusBadge({ status }: { status: string }) {
  const isVerified = status === 'Terverifikasi'

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
        isVerified
          ? 'bg-[#E8F3EA] text-[#2A835F]'
          : 'bg-[#FFF3DF] text-[#A66B19]'
      }`}
    >
      {isVerified ? (
        <CheckCircle2 size={13} />
      ) : (
        <FileSearch size={13} />
      )}
      {status}
    </span>
  )
}

export default function BeneficiariesSection() {
  return (
    <section
      id="data-penerima"
      className="scroll-mt-24 bg-white py-20 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* Heading */}
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#E8F3EA] px-4 py-2 text-sm font-semibold text-[#2A835F]">
              <Eye size={16} />
              Keterbukaan Informasi
            </div>

            <h2 className="text-3xl font-bold leading-tight text-[var(--navy-dark)] md:text-4xl">
              Data penerima dapat dipantau bersama.
            </h2>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--text-muted)]">
              Masyarakat dapat melihat informasi penyaluran bantuan
              dan ikut mengawasi ketepatan sasaran dengan tetap
              memperhatikan perlindungan data pribadi.
            </p>
          </div>

          <a
            href="#data-penerima"
            className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-[var(--green-dark)] transition hover:gap-3"
          >
            Lihat seluruh data
            <ArrowUpRight size={17} />
          </a>
        </div>

        {/* Privacy Notice */}
        <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-[#DCEAE0] bg-[#F3F8F4] p-5 sm:flex-row sm:items-center">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#2A835F]">
            <ShieldCheck size={22} />
          </div>

          <div>
            <h3 className="text-sm font-bold text-[var(--navy-dark)]">
              Privasi penerima tetap dilindungi
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-[var(--text-muted)]">
              Nama dan NIK ditampilkan dalam bentuk tersamarkan.
              Informasi sensitif tidak ditampilkan secara utuh kepada publik.
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-[#E3EAE5] bg-white">
          <div className="flex flex-col justify-between gap-3 border-b border-[#E8EEEA] p-5 sm:flex-row sm:items-center">
            <div>
              <h3 className="font-bold text-[var(--navy-dark)]">
                Daftar Penerima Bantuan
              </h3>
              <p className="mt-1 text-sm text-[var(--text-muted)]">
                Contoh tampilan informasi penerima bantuan
              </p>
            </div>

            <span className="w-fit rounded-full bg-[#F1F5F2] px-3 py-1.5 text-xs font-medium text-[var(--text-muted)]">
              Data ilustrasi
            </span>
          </div>

          {/* Desktop Table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[760px] text-left">
              <thead className="bg-[#F7F9F7]">
                <tr className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                  <th className="px-5 py-4">ID Penerima</th>
                  <th className="px-5 py-4">Nama</th>
                  <th className="px-5 py-4">NIK</th>
                  <th className="px-5 py-4">Wilayah</th>
                  <th className="px-5 py-4">Program Bantuan</th>
                  <th className="px-5 py-4">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#E8EEEA]">
                {beneficiaries.map((person) => (
                  <tr
                    key={person.id}
                    className="transition hover:bg-[#FAFCFA]"
                  >
                    <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-[var(--green-dark)]">
                      {person.id}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-[var(--navy-dark)]">
                      {person.name}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 font-mono text-xs text-[var(--text-muted)]">
                      {person.nik}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-sm text-[var(--text-muted)]">
                      {person.region}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 text-sm text-[var(--text-muted)]">
                      {person.program}
                    </td>
                    <td className="whitespace-nowrap px-5 py-4">
                      <StatusBadge status={person.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="divide-y divide-[#E8EEEA] md:hidden">
            {beneficiaries.map((person) => (
              <div key={person.id} className="space-y-3 p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-bold text-[var(--green-dark)]">
                    {person.id}
                  </span>
                  <StatusBadge status={person.status} />
                </div>

                <div>
                  <p className="font-semibold text-[var(--navy-dark)]">
                    {person.name}
                  </p>
                  <p className="mt-1 font-mono text-xs text-[var(--text-muted)]">
                    NIK: {person.nik}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-2 text-sm">
                  <div>
                    <p className="text-xs text-[var(--text-muted)]">
                      Wilayah
                    </p>
                    <p className="mt-0.5 text-[var(--navy-dark)]">
                      {person.region}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[var(--text-muted)]">
                      Program bantuan
                    </p>
                    <p className="mt-0.5 text-[var(--navy-dark)]">
                      {person.program}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col justify-between gap-3 border-t border-[#E8EEEA] bg-[#FAFCFA] px-5 py-4 sm:flex-row sm:items-center">
            <p className="text-xs leading-relaxed text-[var(--text-muted)]">
              Nama, NIK, dan data penerima di atas merupakan data contoh.
            </p>

            <a
              href="#data-penerima"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--green-dark)] transition hover:gap-3"
            >
              Jelajahi data penerima
              <ArrowRight size={16} />
            </a>
          </div>
        </div>

        {/* Bottom Information */}
        <div className="mt-6 flex flex-col justify-between gap-4 rounded-2xl bg-[var(--navy-dark)] p-6 text-white sm:flex-row sm:items-center md:p-8">
          <div className="max-w-xl">
            <h3 className="text-lg font-bold">
              Menemukan data yang perlu ditinjau?
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-white/70">
              Masyarakat dapat menyampaikan sanggahan apabila menemukan
              informasi penerima bantuan yang perlu diverifikasi kembali.
            </p>
          </div>

          <a
            href="#sanggah-warga"
            className="inline-flex w-fit shrink-0 items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[var(--navy-dark)] transition hover:bg-[#E8F3EA]"
          >
            Sanggah data
            <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
    </section>
  )
}