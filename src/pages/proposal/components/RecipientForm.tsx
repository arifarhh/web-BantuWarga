import type {
  ProposalFormData,
  ProposalType,
} from '../types/proposal.types'

interface RecipientFormProps {
  data: ProposalFormData
  onChange: (field: keyof ProposalFormData, value: string) => void
}

const inputClass =
  'w-full rounded-lg border border-[var(--line)] bg-white px-4 py-3 text-sm text-[var(--ink)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--green)] focus:ring-2 focus:ring-[var(--green)]/10'

export default function RecipientForm({
  data,
  onChange,
}: RecipientFormProps) {
  const handleTypeChange = (type: ProposalType) => {
    onChange('proposalType', type)

    if (type === 'self') {
      onChange('recipientName', data.proposerName)
      onChange('recipientNik', data.proposerNik)
      onChange('recipientPhone', data.proposerPhone)
      onChange('recipientAddress', data.proposerAddress)
      onChange('relationship', 'Diri sendiri')
    } else {
      onChange('recipientName', '')
      onChange('recipientNik', '')
      onChange('recipientPhone', '')
      onChange('recipientAddress', '')
      onChange('relationship', '')
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[var(--navy)]">
          Data Calon Penerima
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[var(--text)]">
          Tentukan siapa yang diusulkan sebagai calon penerima bantuan sosial.
        </p>
      </div>

      <div className="mb-6 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => handleTypeChange('self')}
          className={`rounded-xl border p-4 text-left transition ${
            data.proposalType === 'self'
              ? 'border-[var(--green)] bg-[var(--green-light)]'
              : 'border-[var(--line)] bg-white hover:border-[var(--green)]'
          }`}
        >
          <span className="block text-sm font-bold text-[var(--navy)]">
            Untuk diri sendiri
          </span>
          <span className="mt-1 block text-xs text-[var(--text)]">
            Saya mengusulkan diri sendiri.
          </span>
        </button>

        <button
          type="button"
          onClick={() => handleTypeChange('other')}
          className={`rounded-xl border p-4 text-left transition ${
            data.proposalType === 'other'
              ? 'border-[var(--green)] bg-[var(--green-light)]'
              : 'border-[var(--line)] bg-white hover:border-[var(--green)]'
          }`}
        >
          <span className="block text-sm font-bold text-[var(--navy)]">
            Untuk orang lain
          </span>
          <span className="mt-1 block text-xs text-[var(--text)]">
            Saya mengusulkan warga lain.
          </span>
        </button>
      </div>

      {data.proposalType && (
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-[var(--ink)]">
              Nama calon penerima
            </label>
            <input
              type="text"
              value={data.recipientName}
              onChange={(e) => onChange('recipientName', e.target.value)}
              placeholder="Masukkan nama lengkap"
              readOnly={data.proposalType === 'self'}
              className={`${inputClass} ${
                data.proposalType === 'self' ? 'bg-[var(--background)]' : ''
              }`}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[var(--ink)]">
              NIK calon penerima
            </label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={16}
              value={data.recipientNik}
              onChange={(e) =>
                onChange('recipientNik', e.target.value.replace(/\D/g, ''))
              }
              placeholder="Masukkan 16 digit NIK"
              readOnly={data.proposalType === 'self'}
              className={`${inputClass} ${
                data.proposalType === 'self' ? 'bg-[var(--background)]' : ''
              }`}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[var(--ink)]">
              Nomor HP
            </label>
            <input
              type="tel"
              value={data.recipientPhone}
              onChange={(e) => onChange('recipientPhone', e.target.value)}
              placeholder="Nomor HP calon penerima"
              readOnly={data.proposalType === 'self'}
              className={`${inputClass} ${
                data.proposalType === 'self' ? 'bg-[var(--background)]' : ''
              }`}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[var(--ink)]">
              Hubungan dengan pengusul
            </label>
            <select
              value={data.relationship}
              onChange={(e) => onChange('relationship', e.target.value)}
              disabled={data.proposalType === 'self'}
              className={inputClass}
            >
              <option value="">Pilih hubungan</option>
              <option value="Diri sendiri">Diri sendiri</option>
              <option value="Keluarga">Keluarga</option>
              <option value="Tetangga">Tetangga</option>
              <option value="Kerabat">Kerabat</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-[var(--ink)]">
              Alamat calon penerima
            </label>
            <textarea
              rows={3}
              value={data.recipientAddress}
              onChange={(e) => onChange('recipientAddress', e.target.value)}
              placeholder="Masukkan alamat lengkap calon penerima"
              readOnly={data.proposalType === 'self'}
              className={`${inputClass} ${
                data.proposalType === 'self' ? 'bg-[var(--background)]' : ''
              }`}
            />
          </div>
        </div>
      )}
    </div>
  )
}