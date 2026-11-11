import { useState } from 'react'
import {
  X,
  UserCheck,
  Home,
  MapPin,
  History,
  Shield,
  Eye,
  EyeOff,
  ExternalLink,
  Calendar,
  AlertTriangle,
  CheckCircle,
  FileText,
  Clock,
  Sparkles,
  Maximize2,
} from 'lucide-react'
import type { ProposalItem, ProposalStatus } from '../../../../types/admin.types'

interface ProposalDetailModalProps {
  proposal: ProposalItem | null
  onClose: () => void
  onOpenVerify: (proposal: ProposalItem) => void
}

function getStatusBadge(status: ProposalStatus) {
  switch (status) {
    case 'menunggu_verifikasi':
      return {
        label: 'Menunggu Verifikasi',
        color: 'bg-amber-50 text-amber-800 border-amber-200',
        dot: 'bg-amber-500',
      }
    case 'verifikasi_berkas':
      return {
        label: 'Verifikasi Berkas',
        color: 'bg-blue-50 text-blue-800 border-blue-200',
        dot: 'bg-blue-500',
      }
    case 'survei_lapangan':
      return {
        label: 'Survei Lapangan',
        color: 'bg-purple-50 text-purple-800 border-purple-200',
        dot: 'bg-purple-500',
      }
    case 'musyawarah':
      return {
        label: 'Musyawarah Kelurahan',
        color: 'bg-indigo-50 text-indigo-800 border-indigo-200',
        dot: 'bg-indigo-500',
      }
    case 'disetujui':
      return {
        label: 'Disetujui',
        color: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        dot: 'bg-emerald-500',
      }
    case 'ditolak':
      return {
        label: 'Ditolak',
        color: 'bg-red-50 text-red-800 border-red-200',
        dot: 'bg-red-500',
      }
    default:
      return {
        label: status,
        color: 'bg-slate-50 text-slate-700 border-slate-200',
        dot: 'bg-slate-400',
      }
  }
}

export default function ProposalDetailModal({
  proposal,
  onClose,
  onOpenVerify,
}: ProposalDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'identitas' | 'ekonomi' | 'lokasi' | 'logs'>('identitas')
  const [revealedNiks, setRevealedNiks] = useState<{ [key: string]: boolean }>({})
  const [isPhotoZoomed, setIsPhotoZoomed] = useState(false)

  if (!proposal) return null

  const statusInfo = getStatusBadge(proposal.status)

  const toggleNikReveal = (key: string) => {
    setRevealedNiks((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const renderMaskedNik = (nik: string, key: string) => {
    const isRevealed = revealedNiks[key]
    if (isRevealed) {
      return (
        <span className="font-mono font-bold tracking-wider text-slate-800">
          {nik}
        </span>
      )
    }
    const masked = nik ? `${nik.slice(0, 4)} •••• •••• ${nik.slice(-4)}` : '-'
    return (
      <span className="font-mono text-slate-600">
        {masked}
      </span>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative z-10 flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-slate-200 bg-slate-50/80 px-6 py-5">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="font-mono text-sm font-extrabold text-[#1B3C53]">
                {proposal.ticketCode}
              </span>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-bold ${statusInfo.color}`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${statusInfo.dot}`} />
                {statusInfo.label}
              </span>
              <span className="rounded-md bg-emerald-100/70 px-2 py-0.5 text-[11px] font-semibold text-emerald-900">
                Kecamatan {proposal.district}
              </span>
            </div>

            <h3 className="mt-1.5 text-lg font-bold text-[#1B3C53]">
              Usulan Penerima: {proposal.recipientName}
            </h3>
            <p className="text-xs text-slate-500">
              Diajukan pada {new Date(proposal.createdAt).toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' })}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Priority Score Banner */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 bg-gradient-to-r from-emerald-50 via-teal-50 to-slate-50 px-6 py-3 text-xs">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-emerald-600" />
            <span className="font-semibold text-slate-700">Indeks Skor Kerentanan Kemiskinan:</span>
            <span className="font-bold text-emerald-800 text-sm">{proposal.priorityScore} / 100</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="h-2 w-32 rounded-full bg-slate-200 overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  proposal.priorityScore >= 80
                    ? 'bg-red-500'
                    : proposal.priorityScore >= 60
                    ? 'bg-amber-500'
                    : 'bg-emerald-500'
                }`}
                style={{ width: `${proposal.priorityScore}%` }}
              />
            </div>
            <span className="text-[11px] font-medium text-slate-500">
              {proposal.priorityScore >= 80
                ? 'Sangat Mendesak'
                : proposal.priorityScore >= 60
                ? 'Prioritas Sedang'
                : 'Prioritas Rendah'}
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-white px-6">
          <button
            type="button"
            onClick={() => setActiveTab('identitas')}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-xs font-bold transition ${
              activeTab === 'identitas'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <UserCheck size={16} />
            Data Identitas
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('ekonomi')}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-xs font-bold transition ${
              activeTab === 'ekonomi'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Home size={16} />
            Sosial & Ekonomi
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('lokasi')}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-xs font-bold transition ${
              activeTab === 'lokasi'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <MapPin size={16} />
            Lokasi & Bukti
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('logs')}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-xs font-bold transition ${
              activeTab === 'logs'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <History size={16} />
            Audit Trail ({proposal.logs.length})
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: IDENTITAS */}
          {activeTab === 'identitas' && (
            <div className="grid gap-6 md:grid-cols-2">
              {/* Data Calon Penerima */}
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
                  <h4 className="font-bold text-[#1B3C53] flex items-center gap-2 text-sm">
                    <UserCheck size={17} className="text-emerald-600" />
                    Calon Penerima Bantuan
                  </h4>
                  <span className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                    Target Bansos
                  </span>
                </div>

                <dl className="space-y-3.5 text-xs">
                  <div>
                    <dt className="text-slate-400">Nama Lengkap</dt>
                    <dd className="mt-0.5 font-bold text-slate-800 text-sm">
                      {proposal.recipientName}
                    </dd>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <dt className="text-slate-400 flex items-center gap-1.5">
                        <Shield size={13} className="text-slate-400" />
                        NIK (Data Pribadi Terlindungi)
                      </dt>
                      <button
                        type="button"
                        onClick={() => toggleNikReveal('recipient')}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 hover:underline cursor-pointer"
                      >
                        {revealedNiks['recipient'] ? <EyeOff size={13} /> : <Eye size={13} />}
                        {revealedNiks['recipient'] ? 'Masking NIK' : 'Buka NIK Lengkap'}
                      </button>
                    </div>
                    <dd className="mt-1 rounded-lg bg-slate-50 px-3 py-2 border border-slate-100">
                      {renderMaskedNik(proposal.recipientNik, 'recipient')}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-slate-400">Nomor Telepon / WhatsApp</dt>
                    <dd className="mt-0.5 font-semibold text-slate-800">
                      {proposal.recipientPhone || '-'}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-slate-400">Hubungan dengan Pengusul</dt>
                    <dd className="mt-0.5 font-medium text-slate-800">
                      {proposal.relationship || 'Diri Sendiri'}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-slate-400">Alamat Calon Penerima</dt>
                    <dd className="mt-0.5 leading-relaxed text-slate-700">
                      {proposal.recipientAddress}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Data Pengusul */}
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
                  <h4 className="font-bold text-[#1B3C53] flex items-center gap-2 text-sm">
                    <FileText size={17} className="text-blue-600" />
                    Data Pengusul
                  </h4>
                  <span className="rounded bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700">
                    {proposal.proposalType === 'self' ? 'Pengajuan Mandiri' : 'Mengusulkan Warga Lain'}
                  </span>
                </div>

                <dl className="space-y-3.5 text-xs">
                  <div>
                    <dt className="text-slate-400">Nama Pengusul</dt>
                    <dd className="mt-0.5 font-bold text-slate-800 text-sm">
                      {proposal.proposerName}
                    </dd>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <dt className="text-slate-400 flex items-center gap-1.5">
                        <Shield size={13} className="text-slate-400" />
                        NIK Pengusul
                      </dt>
                      <button
                        type="button"
                        onClick={() => toggleNikReveal('proposer')}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700 hover:underline cursor-pointer"
                      >
                        {revealedNiks['proposer'] ? <EyeOff size={13} /> : <Eye size={13} />}
                        {revealedNiks['proposer'] ? 'Masking NIK' : 'Buka NIK Lengkap'}
                      </button>
                    </div>
                    <dd className="mt-1 rounded-lg bg-slate-50 px-3 py-2 border border-slate-100">
                      {renderMaskedNik(proposal.proposerNik, 'proposer')}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-slate-400">Nomor Telepon Pengusul</dt>
                    <dd className="mt-0.5 font-semibold text-slate-800">
                      {proposal.proposerPhone || '-'}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-slate-400">Alamat Pengusul</dt>
                    <dd className="mt-0.5 leading-relaxed text-slate-700">
                      {proposal.proposerAddress}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          )}

          {/* TAB 2: EKONOMI */}
          {activeTab === 'ekonomi' && (
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-xs text-slate-400">Pekerjaan Utama</p>
                  <p className="mt-1 text-sm font-bold text-[#1B3C53]">
                    {proposal.occupation || 'Tidak bekerja'}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-xs text-slate-400">Perkiraan Penghasilan</p>
                  <p className="mt-1 text-sm font-bold text-emerald-700">
                    {proposal.monthlyIncome || '-'}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-xs text-slate-400">Jumlah Tanggungan</p>
                  <p className="mt-1 text-sm font-bold text-[#1B3C53]">
                    {proposal.dependents} orang
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-xs text-slate-400">Kondisi Bangunan Rumah</p>
                  <p className="mt-1 text-sm font-bold text-amber-700">
                    {proposal.houseCondition || '-'}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-xs text-slate-400">Status Tempat Tinggal</p>
                  <p className="mt-1 text-sm font-bold text-[#1B3C53]">
                    {proposal.housingStatus || '-'}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-xs text-slate-400">Wilayah Verifikasi</p>
                  <p className="mt-1 text-sm font-bold text-[#1B3C53]">
                    Kec. {proposal.district}, Kel. {proposal.subdistrict}
                  </p>
                </div>
              </div>

              {proposal.additionalInformation && (
                <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Keterangan Kondisi & Kebutuhan Tambahan
                  </h4>
                  <p className="text-sm leading-relaxed text-slate-700">
                    {proposal.additionalInformation}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: LOKASI & BUKTI FOTO */}
          {activeTab === 'lokasi' && (
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Info Alamat & Peta */}
                <div className="space-y-4">
                  <div className="rounded-xl border border-slate-200 bg-white p-5">
                    <h4 className="font-bold text-[#1B3C53] flex items-center gap-2 text-sm mb-3">
                      <MapPin size={17} className="text-emerald-600" />
                      Titik Lokasi Tempat Tinggal
                    </h4>

                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {proposal.recipientAddress}
                    </p>

                    <div className="rounded-lg bg-slate-50 p-3 border border-slate-100 text-xs space-y-1.5 font-mono">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Latitude:</span>
                        <span className="font-semibold text-slate-800">{proposal.latitude || '-7.9786'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Longitude:</span>
                        <span className="font-semibold text-slate-800">{proposal.longitude || '112.6318'}</span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <a
                        href={`https://www.google.com/maps?q=${proposal.latitude || '-7.9786'},${proposal.longitude || '112.6318'}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-100 px-4 py-2.5 text-xs font-bold text-slate-700 transition hover:bg-slate-200"
                      >
                        <ExternalLink size={14} />
                        Buka di Google Maps
                      </a>
                    </div>
                  </div>

                  {/* Info Penugasan Survei bila ada */}
                  {proposal.assignedSurveyor && (
                    <div className="rounded-xl border border-purple-200 bg-purple-50/60 p-4 text-xs text-purple-900">
                      <p className="font-bold flex items-center gap-1.5 mb-1 text-purple-950">
                        <Calendar size={14} />
                        Jadwal Survei Lapangan Faktual
                      </p>
                      <p>Petugas: <span className="font-semibold">{proposal.assignedSurveyor}</span></p>
                      <p>Tanggal: <span className="font-semibold">{proposal.surveyDate || 'Menunggu konfirmasi'}</span></p>
                    </div>
                  )}
                </div>

                {/* Foto Tempat Tinggal */}
                <div className="rounded-xl border border-slate-200 bg-white p-5">
                  <h4 className="font-bold text-[#1B3C53] flex items-center gap-2 text-sm mb-3">
                    <Home size={17} className="text-emerald-600" />
                    Foto Kondisi Tempat Tinggal
                  </h4>

                  {proposal.housePhotoUrl ? (
                    <div className="relative group overflow-hidden rounded-xl border border-slate-200">
                      <img
                        src={proposal.housePhotoUrl}
                        alt="Bukti foto tempat tinggal"
                        className="h-56 w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                      <button
                        type="button"
                        onClick={() => setIsPhotoZoomed(true)}
                        className="absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-0 group-hover:opacity-100 transition duration-200 gap-1.5 text-xs font-bold cursor-pointer"
                      >
                        <Maximize2 size={16} />
                        Perbesar Foto
                      </button>
                      <div className="p-2.5 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 truncate">
                        {proposal.housePhotoName || 'Foto Rumah Pendukung'}
                      </div>
                    </div>
                  ) : (
                    <div className="flex h-56 flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 text-slate-400">
                      <AlertTriangle size={32} className="mb-2 text-slate-300" />
                      <p className="text-xs font-semibold">Tidak ada lampiran foto</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: AUDIT TRAIL */}
          {activeTab === 'logs' && (
            <div className="space-y-4">
              <div className="rounded-xl bg-slate-50 p-4 border border-slate-200 text-xs text-slate-600 leading-relaxed flex items-center gap-2">
                <Shield size={16} className="text-emerald-600 shrink-0" />
                <span>
                  Setiap tahapan penanganan usulan dicatat permanen dalam riwayat audit trail untuk menjamin akuntabilitas & transparansi verifikator.
                </span>
              </div>

              <div className="relative pl-6 space-y-6 before:absolute before:bottom-2 before:top-2 before:left-2 before:w-0.5 before:bg-slate-200">
                {proposal.logs.map((log) => {
                  const logStatus = getStatusBadge(log.toStatus)
                  return (
                    <div key={log.id} className="relative">
                      <div className="absolute -left-6 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-white ring-4 ring-white">
                        <span className={`h-2.5 w-2.5 rounded-full ${logStatus.dot}`} />
                      </div>

                      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-[#1B3C53]">
                              {log.verifierName}
                            </span>
                            <span className="text-[10px] text-slate-400">({log.verifierRole})</span>
                          </div>

                          <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                            <Clock size={12} />
                            {new Date(log.timestamp).toLocaleString('id-ID', {
                              dateStyle: 'medium',
                              timeStyle: 'short',
                            })}
                          </div>
                        </div>

                        <div className="mt-2.5 flex items-center gap-2 text-xs">
                          <span className="text-slate-400">Status baru:</span>
                          <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-bold ${logStatus.color}`}>
                            {logStatus.label}
                          </span>
                        </div>

                        <p className="mt-2 text-xs leading-relaxed text-slate-700 bg-slate-50/60 p-2.5 rounded-lg border border-slate-100">
                          {log.notes}
                        </p>

                        {log.surveyorName && (
                          <p className="mt-2 text-[11px] text-purple-700 font-medium">
                            Survei oleh: {log.surveyorName} {log.surveyDate && `(Rencana: ${log.surveyDate})`}
                          </p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-100 cursor-pointer"
          >
            Tutup Jendela
          </button>

          <button
            type="button"
            onClick={() => onOpenVerify(proposal)}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-900/20 transition hover:from-emerald-700 hover:to-teal-800 cursor-pointer"
          >
            <CheckCircle size={15} />
            Proses Verifikasi / Ubah Status
          </button>
        </div>
      </div>

      {/* Lightbox Zoom Foto */}
      {isPhotoZoomed && proposal.housePhotoUrl && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setIsPhotoZoomed(false)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <img
              src={proposal.housePhotoUrl}
              alt="Zoom foto tempat tinggal"
              className="max-h-[85vh] max-w-full rounded-lg object-contain shadow-2xl"
            />
            <button
              type="button"
              onClick={() => setIsPhotoZoomed(false)}
              className="absolute -top-10 right-0 text-white hover:text-slate-300 text-xs font-bold flex items-center gap-1 cursor-pointer"
            >
              <X size={20} />
              Tutup Zoom
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
