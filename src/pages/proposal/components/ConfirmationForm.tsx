
import {
  CheckCircle2,
  FileText,
  ShieldCheck,
} from 'lucide-react'

import type { ProposalFormData } from '../types/proposal.types'

interface ConfirmationFormProps {
  data: ProposalFormData
  consent: boolean
  onConsentChange: (checked: boolean) => void
}

function maskNik(nik: string) {
  if (!nik) return '-'
  return `********${nik.slice(-4)}`
}

function SummaryItem({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="flex flex-col gap-1 border-b border-[var(--line)] py-3 last:border-0">
      <span className="text-xs text-[var(--muted)]">{label}</span>
      <span className="break-words text-sm font-medium text-[var(--ink)]">
        {value || '-'}
      </span>
    </div>
  )
}

export default function ConfirmationForm({
  data,
  consent,
  onConsentChange,
}: ConfirmationFormProps) {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[var(--navy)]">
          Periksa Kembali Usulan
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[var(--text)]">
          Pastikan informasi yang dimasukkan sudah benar sebelum
          melanjutkan proses pengajuan.
        </p>
      </div>

      <div className="space-y-5">
        <section className="rounded-xl border border-[var(--line)] bg-white p-5">
          <div className="mb-2 flex items-center gap-2">
            <FileText size={18} className="text-[var(--teal)]" />
            <h3 className="font-semibold text-[var(--navy)]">
              Data Pengusul
            </h3>
          </div>

          <SummaryItem label="Nama" value={data.proposerName} />
          <SummaryItem label="NIK" value={maskNik(data.proposerNik)} />
          <SummaryItem label="Nomor Telepon" value={data.proposerPhone} />
          <SummaryItem label="Alamat" value={data.proposerAddress} />
        </section>

        <section className="rounded-xl border border-[var(--line)] bg-white p-5">
          <div className="mb-2 flex items-center gap-2">
            <CheckCircle2 size={18} className="text-[var(--teal)]" />
            <h3 className="font-semibold text-[var(--navy)]">
              Data Calon Penerima
            </h3>
          </div>

          <SummaryItem
            label="Jenis Usulan"
            value={
              data.proposalType === 'self'
                ? 'Untuk diri sendiri'
                : data.proposalType === 'other'
                  ? 'Untuk orang lain'
                  : '-'
            }
          />
          <SummaryItem label="Nama" value={data.recipientName} />
          <SummaryItem label="NIK" value={maskNik(data.recipientNik)} />
          <SummaryItem label="Nomor Telepon" value={data.recipientPhone} />
          <SummaryItem label="Hubungan dengan Pengusul" value={data.relationship} />
          <SummaryItem label="Alamat" value={data.recipientAddress} />
        </section>

        <section className="rounded-xl border border-[var(--line)] bg-white p-5">
          <div className="mb-2 flex items-center gap-2">
            <ShieldCheck size={18} className="text-[var(--teal)]" />
            <h3 className="font-semibold text-[var(--navy)]">
              Kondisi Ekonomi
            </h3>
          </div>

          <SummaryItem label="Pekerjaan" value={data.occupation} />
          <SummaryItem label="Penghasilan per Bulan" value={data.monthlyIncome} />
          <SummaryItem label="Jumlah Tanggungan" value={data.dependents} />
          <SummaryItem label="Kondisi Rumah" value={data.houseCondition} />
          <SummaryItem label="Status Tempat Tinggal" value={data.housingStatus} />
          <SummaryItem
            label="Informasi Tambahan"
            value={data.additionalInformation}
          />
        </section>

        <section className="rounded-xl border border-[var(--line)] bg-white p-5">
          <div className="mb-2 flex items-center gap-2">
            <FileText size={18} className="text-[var(--teal)]" />
            <h3 className="font-semibold text-[var(--navy)]">
              Lokasi dan Bukti
            </h3>
          </div>

          <SummaryItem label="Alamat Lokasi" value={data.recipientAddress} />
          <SummaryItem label="Latitude" value={data.latitude} />
          <SummaryItem label="Longitude" value={data.longitude} />
          <SummaryItem
            label="Foto Kondisi Rumah"
            value={data.housePhoto?.name ?? 'Belum ada foto'}
          />
        </section>

        <div className="rounded-xl border border-[var(--line)] bg-[var(--green-light)] p-4">
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => onConsentChange(e.target.checked)}
              className="mt-1 h-4 w-4 accent-[var(--teal)]"
            />

            <span className="text-sm leading-relaxed text-[var(--ink)]">
              Saya menyatakan bahwa informasi yang diberikan telah diisi
              dengan benar dan dapat dipertanggungjawabkan. Saya memahami
              bahwa pengajuan ini akan melalui proses verifikasi dan tidak
              secara otomatis menjamin penerimaan bantuan sosial.
            </span>
          </label>
        </div>
      </div>
    </div>
  )
}
