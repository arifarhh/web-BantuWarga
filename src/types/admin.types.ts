export type AdminRole = 'admin_dinsos' | 'verifikator_kelurahan' | 'supervisor'

export interface AdminUser {
  id: string
  nip: string
  name: string
  email: string
  role: AdminRole
  roleLabel: string
  district?: string // Kecamatan penugasan di Kota Malang
  avatar?: string
  lastLogin: string
}

export type ProposalStatus =
  | 'menunggu_verifikasi'
  | 'verifikasi_berkas'
  | 'survei_lapangan'
  | 'musyawarah'
  | 'disetujui'
  | 'ditolak'

export interface VerificationLog {
  id: string
  timestamp: string
  verifierName: string
  verifierRole: string
  fromStatus: ProposalStatus
  toStatus: ProposalStatus
  notes: string
  surveyorName?: string
  surveyDate?: string
}

export interface ProposalItem {
  id: string
  ticketCode: string // Format: BW-2026-MLG-XXXX
  createdAt: string
  updatedAt: string
  status: ProposalStatus

  // Wilayah Kota Malang
  district: string // Kecamatan (Klojen, Blimbing, Lowokwaru, Sukun, Kedungkandang)
  subdistrict: string // Kelurahan

  // Data Pengusul
  proposerName: string
  proposerNik: string
  proposerPhone: string
  proposerAddress: string
  proposalType: 'self' | 'other'

  // Data Calon Penerima
  recipientName: string
  recipientNik: string
  recipientPhone: string
  relationship: string
  recipientAddress: string

  // Kondisi Ekonomi
  occupation: string
  monthlyIncome: string
  dependents: string
  houseCondition: string
  housingStatus: string
  additionalInformation: string

  // Lokasi & Bukti
  housePhotoUrl?: string // URL atau base64 gambar tempat tinggal
  housePhotoName?: string

  // Penilaian & Petugas
  priorityScore: number // Skor kerentanan 1 - 100
  assignedSurveyor?: string
  surveyDate?: string

  // Riwayat Catatan Verifikasi
  logs: VerificationLog[]
}

export interface ProposalFilters {
  search: string
  district: string
  status: string
  housingStatus: string
  houseCondition: string
  sortBy: 'date_desc' | 'date_asc' | 'priority_desc' | 'priority_asc'
}

export interface ProposalMetrics {
  total: number
  menungguVerifikasi: number
  verifikasiBerkas: number
  surveiLapangan: number
  musyawarah: number
  disetujui: number
  ditolak: number
}
