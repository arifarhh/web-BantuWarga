import { useState, useEffect, useMemo, useCallback } from 'react'
import {
  Search,
  Filter,
  Download,
  RotateCcw,
  Eye,
  CheckCircle,
  Clock,
  FileSearch,
  MapPin,
  Users,
  CheckCircle2,
  FileSpreadsheet,
  AlertCircle,
  ChevronDown,
  Building,
} from 'lucide-react'
import type { ProposalItem, ProposalStatus } from '../../../types/admin.types'
import { proposalService } from '../../../services/proposalService'
import ProposalDetailModal from './components/ProposalDetailModal'
import VerificationActionModal from './components/VerificationActionModal'

const DISTRICTS_KOTA_MALANG = [
  'Semua Kecamatan',
  'Sukun',
  'Lowokwaru',
  'Blimbing',
  'Klojen',
  'Kedungkandang',
]

const STATUS_FILTER_OPTIONS: { value: string; label: string }[] = [
  { value: 'all', label: 'Semua Status' },
  { value: 'menunggu_verifikasi', label: 'Menunggu Verifikasi' },
  { value: 'verifikasi_berkas', label: 'Verifikasi Berkas' },
  { value: 'survei_lapangan', label: 'Survei Lapangan' },
  { value: 'musyawarah', label: 'Musyawarah Kelurahan' },
  { value: 'disetujui', label: 'Disetujui' },
  { value: 'ditolak', label: 'Ditolak' },
]

function getStatusBadge(status: ProposalStatus) {
  switch (status) {
    case 'menunggu_verifikasi':
      return {
        label: 'Menunggu Verifikasi',
        cls: 'bg-amber-50 text-amber-800 border-amber-200',
        dot: 'bg-amber-500',
      }
    case 'verifikasi_berkas':
      return {
        label: 'Verifikasi Berkas',
        cls: 'bg-blue-50 text-blue-800 border-blue-200',
        dot: 'bg-blue-500',
      }
    case 'survei_lapangan':
      return {
        label: 'Survei Lapangan',
        cls: 'bg-purple-50 text-purple-800 border-purple-200',
        dot: 'bg-purple-500',
      }
    case 'musyawarah':
      return {
        label: 'Musyawarah Kelurahan',
        cls: 'bg-indigo-50 text-indigo-800 border-indigo-200',
        dot: 'bg-indigo-500',
      }
    case 'disetujui':
      return {
        label: 'Disetujui',
        cls: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        dot: 'bg-emerald-500',
      }
    case 'ditolak':
      return {
        label: 'Ditolak',
        cls: 'bg-red-50 text-red-800 border-red-200',
        dot: 'bg-red-500',
      }
    default:
      return {
        label: status,
        cls: 'bg-slate-50 text-slate-700 border-slate-200',
        dot: 'bg-slate-400',
      }
  }
}

export default function AdminProposalsPage() {
  const [proposals, setProposals] = useState<ProposalItem[]>([])
  const [metrics, setMetrics] = useState(() => proposalService.getMetrics())

  // Filters State
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('Semua Kecamatan')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedHouseCondition, setSelectedHouseCondition] = useState('all')
  const [sortBy, setSortBy] = useState<'date_desc' | 'date_asc' | 'priority_desc'>('date_desc')

  // Modals State
  const [detailModalItem, setDetailModalItem] = useState<ProposalItem | null>(null)
  const [verifyModalItem, setVerifyModalItem] = useState<ProposalItem | null>(null)
  const [toastMessage, setToastMessage] = useState('')

  const loadData = useCallback(() => {
    setProposals(proposalService.getAll())
    setMetrics(proposalService.getMetrics())
  }, [])

  useEffect(() => {
    loadData()

    const handleStorageUpdate = () => loadData()
    window.addEventListener('bantuwarga_proposals_updated', handleStorageUpdate)
    window.addEventListener('storage', handleStorageUpdate)

    return () => {
      window.removeEventListener('bantuwarga_proposals_updated', handleStorageUpdate)
      window.removeEventListener('storage', handleStorageUpdate)
    }
  }, [loadData])

  // Tampilkan toast sementara
  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(''), 3500)
  }

  // Filter & Search Logic
  const filteredProposals = useMemo(() => {
    return proposals
      .filter((item) => {
        // Search text
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim()
          const matchTicket = item.ticketCode.toLowerCase().includes(q)
          const matchRecipient = item.recipientName.toLowerCase().includes(q)
          const matchProposer = item.proposerName.toLowerCase().includes(q)
          const matchNik = item.recipientNik.includes(q) || item.proposerNik.includes(q)
          const matchAddress = item.recipientAddress.toLowerCase().includes(q)
          if (!matchTicket && !matchRecipient && !matchProposer && !matchNik && !matchAddress) {
            return false
          }
        }

        // District Filter
        if (selectedDistrict !== 'Semua Kecamatan' && item.district !== selectedDistrict) {
          return false
        }

        // Status Filter
        if (selectedStatus !== 'all' && item.status !== selectedStatus) {
          return false
        }

        // House Condition Filter
        if (selectedHouseCondition !== 'all' && item.houseCondition !== selectedHouseCondition) {
          return false
        }

        return true
      })
      .sort((a, b) => {
        if (sortBy === 'date_desc') {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        }
        if (sortBy === 'date_asc') {
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        }
        if (sortBy === 'priority_desc') {
          return b.priorityScore - a.priorityScore
        }
        return 0
      })
  }, [proposals, searchQuery, selectedDistrict, selectedStatus, selectedHouseCondition, sortBy])

  const handleExportCSV = () => {
    proposalService.exportToCSV(filteredProposals)
    showToast(`Berhasil mengekspor ${filteredProposals.length} data usulan ke format CSV.`)
  }

  const handleResetData = () => {
    if (confirm('Kembalikan data ke contoh awal Kota Malang? Data usulan yang baru diinput akan diatur ulang.')) {
      proposalService.resetToDefault()
      loadData()
      showToast('Data usulan berhasil direset ke contoh default Kota Malang.')
    }
  }

  const handleVerifySuccess = () => {
    setVerifyModalItem(null)
    loadData()
    showToast('Status usulan berhasil diperbarui dan dicatat ke Audit Trail.')
  }

  return (
    <div className="space-y-6 text-[var(--ink)]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-60 flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-xs font-bold text-white shadow-xl animate-bounce">
          <CheckCircle2 size={16} className="text-emerald-400" />
          {toastMessage}
        </div>
      )}

      {/* Top Banner & Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[var(--navy)]">
            Manajemen Usulan Bantuan Sosial
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[var(--text)]">
            Wilayah Kerja Dinas Sosial Kota Malang • Data Terintegrasi Terbuka
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 rounded-xl border border-[var(--line)] bg-[var(--surface)] px-3.5 py-2.5 text-xs font-bold text-[var(--teal)] shadow-sm transition hover:bg-[var(--green-light)] cursor-pointer"
          >
            <Download size={15} className="text-emerald-700" />
            Ekspor Data (.CSV)
          </button>

          <button
            type="button"
            onClick={handleResetData}
            title="Kembalikan data ke contoh awal Kota Malang"
            className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--line)] bg-[var(--surface)] px-3 py-2.5 text-xs font-semibold text-[var(--text)] hover:bg-[var(--green-light)] cursor-pointer"
          >
            <RotateCcw size={14} />
            Reset Data Demo
          </button>
        </div>
      </div>

      {/* KPI Cards / Metrik Ringkasan */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total Usulan</span>
            <FileSpreadsheet size={16} className="text-slate-600" />
          </div>
          <p className="mt-2 text-2xl font-black text-[#1B3C53]">{metrics.total}</p>
          <p className="mt-0.5 text-[10px] text-slate-400">Seluruh Kota Malang</p>
        </div>

        <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-4 shadow-sm">
          <div className="flex items-center justify-between text-amber-700">
            <span className="text-[11px] font-bold uppercase tracking-wider">Perlu Ditinjau</span>
            <Clock size={16} />
          </div>
          <p className="mt-2 text-2xl font-black text-amber-900">{metrics.menungguVerifikasi}</p>
          <p className="mt-0.5 text-[10px] text-amber-700">Usulan baru masuk</p>
        </div>

        <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-4 shadow-sm">
          <div className="flex items-center justify-between text-blue-700">
            <span className="text-[11px] font-bold uppercase tracking-wider">Cek Berkas</span>
            <FileSearch size={16} />
          </div>
          <p className="mt-2 text-2xl font-black text-blue-900">{metrics.verifikasiBerkas}</p>
          <p className="mt-0.5 text-[10px] text-blue-700">Validasi DTKS/KTP</p>
        </div>

        <div className="rounded-2xl border border-purple-200 bg-purple-50/50 p-4 shadow-sm">
          <div className="flex items-center justify-between text-purple-700">
            <span className="text-[11px] font-bold uppercase tracking-wider">Survei Lapangan</span>
            <MapPin size={16} />
          </div>
          <p className="mt-2 text-2xl font-black text-purple-900">{metrics.surveiLapangan}</p>
          <p className="mt-0.5 text-[10px] text-purple-700">Pemeriksaan TKSK</p>
        </div>

        <div className="rounded-2xl border border-indigo-200 bg-indigo-50/50 p-4 shadow-sm">
          <div className="flex items-center justify-between text-indigo-700">
            <span className="text-[11px] font-bold uppercase tracking-wider">Muskel</span>
            <Users size={16} />
          </div>
          <p className="mt-2 text-2xl font-black text-indigo-900">{metrics.musyawarah}</p>
          <p className="mt-0.5 text-[10px] text-indigo-700">Musyawarah Kelurahan</p>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 shadow-sm">
          <div className="flex items-center justify-between text-emerald-700">
            <span className="text-[11px] font-bold uppercase tracking-wider">Disetujui</span>
            <CheckCircle2 size={16} />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-emerald-900">{metrics.disetujui}</span>
            <span className="text-xs text-red-600 font-bold">({metrics.ditolak} ditolak)</span>
          </div>
          <p className="mt-0.5 text-[10px] text-emerald-700">Ditetapkan bansos</p>
        </div>
      </div>

      {/* Filter and Search Hub */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm space-y-4">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {/* Search Box */}
          <div className="relative">
            <Search size={17} className="absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari Kode Tiket, Nama, NIK..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-3 py-2.5 text-xs text-slate-800 placeholder-slate-400 outline-none transition focus:border-emerald-600 focus:bg-white"
            />
          </div>

          {/* Filter Kecamatan Kota Malang */}
          <div className="relative">
            <Building size={16} className="absolute left-3.5 top-3 text-slate-400 pointer-events-none" />
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-8 py-2.5 text-xs font-semibold text-slate-700 outline-none transition focus:border-emerald-600 focus:bg-white cursor-pointer"
            >
              {DISTRICTS_KOTA_MALANG.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-3.5 text-slate-400 pointer-events-none" />
          </div>

          {/* Filter Status */}
          <div className="relative">
            <Filter size={16} className="absolute left-3.5 top-3 text-slate-400 pointer-events-none" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-8 py-2.5 text-xs font-semibold text-slate-700 outline-none transition focus:border-emerald-600 focus:bg-white cursor-pointer"
            >
              {STATUS_FILTER_OPTIONS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-3.5 text-slate-400 pointer-events-none" />
          </div>

          {/* Sorting */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 pr-8 py-2.5 text-xs font-semibold text-slate-700 outline-none transition focus:border-emerald-600 focus:bg-white cursor-pointer"
            >
              <option value="date_desc">Urutkan: Tanggal Terbaru</option>
              <option value="date_asc">Urutkan: Tanggal Terlama</option>
              <option value="priority_desc">Urutkan: Skor Prioritas Tertinggi</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-3.5 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Filter Summary & Quick Tags */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>Menampilkan <strong>{filteredProposals.length}</strong> dari <strong>{proposals.length}</strong> usulan</span>
            {(searchQuery || selectedDistrict !== 'Semua Kecamatan' || selectedStatus !== 'all') && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('')
                  setSelectedDistrict('Semua Kecamatan')
                  setSelectedStatus('all')
                }}
                className="text-[11px] font-bold text-red-600 hover:underline cursor-pointer"
              >
                Reset Filter
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Sinkronisasi data otomatis dengan portal warga
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 bg-slate-50/90 text-slate-600 font-bold">
              <tr>
                <th className="px-5 py-4">Kode Tiket & Tanggal</th>
                <th className="px-5 py-4">Calon Penerima Bansos</th>
                <th className="px-5 py-4">Pengusul</th>
                <th className="px-5 py-4">Wilayah</th>
                <th className="px-5 py-4">Prioritas & Kondisi</th>
                <th className="px-5 py-4">Status Alur</th>
                <th className="px-5 py-4 text-center">Tindakan</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredProposals.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <AlertCircle size={32} className="mx-auto mb-2 text-slate-300" />
                    <p className="text-sm font-semibold text-slate-600">Tidak ada usulan yang sesuai</p>
                    <p className="text-xs text-slate-400 mt-1">Coba ubah kata kunci pencarian atau bersihkan filter.</p>
                  </td>
                </tr>
              ) : (
                filteredProposals.map((item) => {
                  const statusInfo = getStatusBadge(item.status)
                  const formattedDate = new Date(item.createdAt).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })

                  return (
                    <tr
                      key={item.id}
                      className="transition hover:bg-slate-50/80 group"
                    >
                      {/* 1. Tiket & Tanggal */}
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span className="font-mono font-extrabold text-[#1B3C53] block text-xs">
                          {item.ticketCode}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {formattedDate}
                        </span>
                      </td>

                      {/* 2. Calon Penerima */}
                      <td className="px-5 py-4">
                        <div className="font-bold text-slate-800 text-xs">
                          {item.recipientName}
                        </div>
                        <div className="font-mono text-[10px] text-slate-400">
                          NIK: {item.recipientNik ? `${item.recipientNik.slice(0, 4)}••••${item.recipientNik.slice(-4)}` : '-'}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {item.recipientPhone || '-'}
                        </div>
                      </td>

                      {/* 3. Pengusul */}
                      <td className="px-5 py-4">
                        <div className="font-semibold text-slate-700 text-xs">
                          {item.proposerName}
                        </div>
                        <span className="inline-block mt-0.5 rounded bg-slate-100 px-1.5 py-0.5 text-[9px] font-medium text-slate-600">
                          {item.proposalType === 'self' ? 'Mandiri' : item.relationship || 'Warga'}
                        </span>
                      </td>

                      {/* 4. Wilayah Kota Malang */}
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span className="font-bold text-slate-800 text-xs block">
                          Kec. {item.district}
                        </span>
                        <span className="text-[11px] text-slate-500">
                          Kel. {item.subdistrict}
                        </span>
                      </td>

                      {/* 5. Prioritas & Kondisi */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-slate-800">
                            {item.priorityScore}
                          </span>
                          <div className="h-1.5 w-16 rounded-full bg-slate-200 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                item.priorityScore >= 80
                                  ? 'bg-red-500'
                                  : item.priorityScore >= 60
                                  ? 'bg-amber-500'
                                  : 'bg-emerald-500'
                              }`}
                              style={{ width: `${item.priorityScore}%` }}
                            />
                          </div>
                        </div>
                        <span className="text-[10px] text-slate-500 block mt-0.5">
                          {item.houseCondition || 'Rumah belum dinilai'}
                        </span>
                      </td>

                      {/* 6. Status Alur */}
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold ${statusInfo.cls}`}
                        >
                          <span className={`h-1.5 w-1.5 rounded-full ${statusInfo.dot}`} />
                          {statusInfo.label}
                        </span>
                      </td>

                      {/* 7. Tindakan */}
                      <td className="px-5 py-4 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => setDetailModalItem(item)}
                            title="Buka rincian lengkap usulan"
                            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100 hover:text-[#1B3C53] cursor-pointer"
                          >
                            <Eye size={13} />
                            Detail
                          </button>

                          <button
                            type="button"
                            onClick={() => setVerifyModalItem(item)}
                            title="Proses verifikasi atau ubah status"
                            className="inline-flex items-center gap-1 rounded-lg bg-emerald-700 px-2.5 py-1.5 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-800 cursor-pointer"
                          >
                            <CheckCircle size={13} />
                            Verifikasi
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Detail Usulan */}
      {detailModalItem && (
        <ProposalDetailModal
          proposal={detailModalItem}
          onClose={() => setDetailModalItem(null)}
          onOpenVerify={(p) => {
            setDetailModalItem(null)
            setVerifyModalItem(p)
          }}
        />
      )}

      {/* Modal Aksi Verifikasi */}
      {verifyModalItem && (
        <VerificationActionModal
          proposal={verifyModalItem}
          onClose={() => setVerifyModalItem(null)}
          onSuccess={handleVerifySuccess}
        />
      )}
    </div>
  )
}
