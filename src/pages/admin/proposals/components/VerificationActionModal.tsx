import { useState } from 'react'
import {
  X,
  CheckCircle,
  FileSearch,
  MapPin,
  Users,
  XCircle,
  Clock,
  Send,
  Building2,
} from 'lucide-react'
import type { ProposalItem, ProposalStatus } from '../../../../types/admin.types'
import { proposalService } from '../../../../services/proposalService'
import { useAdminAuth } from '../../../../context/AdminAuthContext'

interface VerificationActionModalProps {
  proposal: ProposalItem | null
  onClose: () => void
  onSuccess: () => void
}

const statusOptions: {
  value: ProposalStatus
  label: string
  desc: string
  icon: typeof CheckCircle
  color: string
}[] = [
  {
    value: 'verifikasi_berkas',
    label: '1. Verifikasi Berkas',
    desc: 'Pemeriksaan kelengkapan dokumen administrasi kependudukan (KTP, KK, DTKS).',
    icon: FileSearch,
    color: 'text-blue-600 border-blue-200 hover:bg-blue-50/50',
  },
  {
    value: 'survei_lapangan',
    label: '2. Jadwalkan Survei Lapangan',
    desc: 'Penugasan petugas TKSK / pendamping sosial untuk cek fisik kondisi rumah.',
    icon: MapPin,
    color: 'text-purple-600 border-purple-200 hover:bg-purple-50/50',
  },
  {
    value: 'musyawarah',
    label: '3. Musyawarah Kelurahan (Muskel)',
    desc: 'Pembahasan penetapan kelayakan penerima bersama perangkat kelurahan & RT/RW.',
    icon: Users,
    color: 'text-indigo-600 border-indigo-200 hover:bg-indigo-50/50',
  },
  {
    value: 'disetujui',
    label: '4. Setujui Usulan (Ditetapkan)',
    desc: 'Ditetapkan resmi sebagai calon penerima program bantuan sosial.',
    icon: CheckCircle,
    color: 'text-emerald-600 border-emerald-200 hover:bg-emerald-50/50',
  },
  {
    value: 'ditolak',
    label: 'Tolak Usulan',
    desc: 'Usulan tidak memenuhi kriteria penerima bantuan sosial (wajib catatan alasan).',
    icon: XCircle,
    color: 'text-red-600 border-red-200 hover:bg-red-50/50',
  },
]

export default function VerificationActionModal({
  proposal,
  onClose,
  onSuccess,
}: VerificationActionModalProps) {
  const { adminUser } = useAdminAuth()

  const [selectedStatus, setSelectedStatus] = useState<ProposalStatus>(
    proposal?.status || 'verifikasi_berkas',
  )
  const [surveyorName, setSurveyorName] = useState(
    proposal?.assignedSurveyor || 'Tri Cahyono, S.Sos (TKSK)',
  )
  const [surveyDate, setSurveyDate] = useState(
    proposal?.surveyDate || new Date(Date.now() + 86400000 * 2).toISOString().slice(0, 10),
  )
  const [notes, setNotes] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!proposal) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!notes.trim()) {
      setError('Catatan verifikator wajib diisi sebagai bukti audit trail.')
      return
    }

    if (selectedStatus === 'ditolak' && notes.trim().length < 15) {
      setError('Untuk penolakan usulan, mohon berikan alasan spesifik minimal 15 karakter.')
      return
    }

    setIsSubmitting(true)

    try {
      proposalService.updateStatus(
        proposal.id,
        selectedStatus,
        {
          name: adminUser?.name || 'Verifikator Dinsos',
          role: adminUser?.roleLabel || 'Petugas Verifikator',
        },
        notes.trim(),
        selectedStatus === 'survei_lapangan' ? surveyorName : undefined,
        selectedStatus === 'survei_lapangan' ? surveyDate : undefined,
      )

      setIsSubmitting(false)
      onSuccess()
    } catch (err: unknown) {
      setIsSubmitting(false)
      setError(err instanceof Error ? err.message : 'Gagal memperbarui status usulan.')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative z-10 flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
              <Building2 size={18} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#1B3C53]">
                Tindak Lanjut & Pembaruan Status Verifikasi
              </h3>
              <p className="text-[11px] text-slate-500 font-mono">
                {proposal.ticketCode} • {proposal.recipientName}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700 cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700 leading-relaxed">
              {error}
            </div>
          )}

          {/* Status Selection */}
          <div>
            <label className="mb-2 block text-xs font-bold text-[#1B3C53]">
              Pilih Tahapan Penanganan Selanjutnya
            </label>

            <div className="space-y-2">
              {statusOptions.map((opt) => {
                const Icon = opt.icon
                const isSelected = selectedStatus === opt.value

                return (
                  <label
                    key={opt.value}
                    className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-500/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="proposalStatus"
                      value={opt.value}
                      checked={isSelected}
                      onChange={() => setSelectedStatus(opt.value)}
                      className="mt-1 accent-emerald-600"
                    />

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <Icon size={16} className={opt.color.split(' ')[0]} />
                        <span className="text-xs font-bold text-slate-800">
                          {opt.label}
                        </span>
                      </div>
                      <p className="mt-0.5 text-[11px] text-slate-500 leading-normal">
                        {opt.desc}
                      </p>
                    </div>
                  </label>
                )
              })}
            </div>
          </div>

          {/* Field Tambahan jika Survei Lapangan */}
          {selectedStatus === 'survei_lapangan' && (
            <div className="rounded-xl border border-purple-200 bg-purple-50/50 p-4 space-y-3">
              <p className="text-xs font-bold text-purple-900 flex items-center gap-1.5">
                <Clock size={14} />
                Penugasan Petugas & Waktu Survei
              </p>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-[11px] font-semibold text-slate-600">
                    Nama Petugas Survei / TKSK
                  </label>
                  <input
                    type="text"
                    value={surveyorName}
                    onChange={(e) => setSurveyorName(e.target.value)}
                    placeholder="Contoh: Tri Cahyono (TKSK)"
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 outline-none focus:border-purple-600"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1 block text-[11px] font-semibold text-slate-600">
                    Rencana Tanggal Survei
                  </label>
                  <input
                    type="date"
                    value={surveyDate}
                    onChange={(e) => setSurveyDate(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-800 outline-none focus:border-purple-600"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Catatan Verifikator */}
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="text-xs font-bold text-[#1B3C53]">
                Catatan Resmi Verifikator <span className="text-red-500">*</span>
              </label>
              <span className="text-[10px] text-slate-400">
                Akan dicatat di Riwayat Audit Trail
              </span>
            </div>

            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Contoh: Berkas telah diperiksa dan sesuai dengan data kependudukan. Dilanjutkan ke tahap verifikasi faktual lapangan."
              className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-800 placeholder-slate-400 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
              required
            />
          </div>

          <div className="rounded-lg bg-slate-50 p-3 text-[11px] text-slate-500 leading-relaxed border border-slate-200">
            <strong>Petugas Bertanggung Jawab:</strong> {adminUser?.name} ({adminUser?.roleLabel})
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-xl border border-slate-300 px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 disabled:opacity-50 cursor-pointer"
            >
              Batal
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-900/20 transition hover:from-emerald-700 hover:to-teal-800 disabled:opacity-50 cursor-pointer"
            >
              <Send size={14} />
              {isSubmitting ? 'Menyimpan...' : 'Simpan Pembaruan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
