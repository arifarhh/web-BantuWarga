import type { ProposalFormData } from '../types/proposal.types'

interface IdentityFormProps {
  data: ProposalFormData
  onChange: (field: keyof ProposalFormData, value: string) => void
}

const inputClass =
  'w-full rounded-lg border border-[var(--line)] bg-white px-4 py-3 text-sm text-[var(--ink)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--green)] focus:ring-2 focus:ring-[var(--green)]/10'

export default function IdentityForm({
  data,
  onChange,
}: IdentityFormProps) {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[var(--navy)]">
          Identitas Pengusul
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[var(--text)]">
          Lengkapi identitas Anda sebagai pihak yang mengajukan usulan
          calon penerima bantuan sosial.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-[var(--ink)]">
            Nama lengkap
          </label>
          <input
            type="text"
            value={data.proposerName}
            onChange={(e) => onChange('proposerName', e.target.value)}
            placeholder="Masukkan nama lengkap"
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-[var(--ink)]">
            NIK
          </label>
          <input
            type="text"
            inputMode="numeric"
            maxLength={16}
            value={data.proposerNik}
            onChange={(e) =>
              onChange('proposerNik', e.target.value.replace(/\D/g, ''))
            }
            placeholder="Masukkan 16 digit NIK"
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-[var(--ink)]">
            Nomor HP
          </label>
          <input
            type="tel"
            value={data.proposerPhone}
            onChange={(e) => onChange('proposerPhone', e.target.value)}
            placeholder="Contoh: 081234567890"
            className={inputClass}
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-semibold text-[var(--ink)]">
            Alamat pengusul
          </label>
          <textarea
            rows={3}
            value={data.proposerAddress}
            onChange={(e) => onChange('proposerAddress', e.target.value)}
            placeholder="Masukkan alamat lengkap"
            className={inputClass}
          />
        </div>
      </div>

      <p className="mt-5 text-xs leading-relaxed text-[var(--muted)]">
        Informasi identitas digunakan untuk keperluan verifikasi pengajuan
        dan tidak ditampilkan sebagai data publik.
      </p>
    </div>
  )
}