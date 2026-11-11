import type {
  ProposalItem,
  ProposalStatus,
  ProposalMetrics,
  VerificationLog,
} from '../types/admin.types'
import type { ProposalFormData } from '../pages/proposal/types/proposal.types'

const STORAGE_KEY = 'bantuwarga_proposals_data'
const EVENT_NAME = 'bantuwarga_proposals_updated'

// Seed Data Realistis Kota Malang
const INITIAL_PROPOSALS: ProposalItem[] = [
  {
    id: 'prop-mlg-001',
    ticketCode: 'BW-2026-MLG-0101',
    createdAt: '2026-03-01T08:30:00.000Z',
    updatedAt: '2026-03-01T08:30:00.000Z',
    status: 'menunggu_verifikasi',
    district: 'Sukun',
    subdistrict: 'Bandulan',
    proposerName: 'Ahmad Supriyadi',
    proposerNik: '3573041508820003',
    proposerPhone: '081234567890',
    proposerAddress: 'Jl. Bandulan Gang 6 No. 24, RT 03 / RW 04, Kel. Bandulan, Kec. Sukun, Kota Malang',
    proposalType: 'other',
    recipientName: 'Mbah Siti Maryam',
    recipientNik: '3573045512480001',
    recipientPhone: '085790123456',
    relationship: 'Tetangga',
    recipientAddress: 'Jl. Bandulan Gang 6 No. 28, RT 03 / RW 04, Kel. Bandulan, Kec. Sukun, Kota Malang',
    occupation: 'Tidak bekerja',
    monthlyIncome: 'Tidak memiliki penghasilan',
    dependents: '1',
    houseCondition: 'Tidak layak huni',
    housingStatus: 'Menumpang',
    additionalInformation: 'Lansia berusia 78 tahun hidup sebatang kara dengan kondisi atap rumah bocor parah dan dinding anyaman bambu rapuh. Memerlukan bantuan sembako rutin dan program bedah rumah.',
    housePhotoUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
    housePhotoName: 'foto_rumah_bandulan.jpg',
    priorityScore: 95,
    logs: [
      {
        id: 'log-001-1',
        timestamp: '2026-03-01T08:30:00.000Z',
        verifierName: 'Sistem BantuWarga',
        verifierRole: 'Sistem Otomatis',
        fromStatus: 'menunggu_verifikasi',
        toStatus: 'menunggu_verifikasi',
        notes: 'Usulan berhasil didaftarkan oleh warga melalui formulir portal publik.',
      },
    ],
  },
  {
    id: 'prop-mlg-002',
    ticketCode: 'BW-2026-MLG-0102',
    createdAt: '2026-03-02T09:15:00.000Z',
    updatedAt: '2026-03-03T11:20:00.000Z',
    status: 'verifikasi_berkas',
    district: 'Lowokwaru',
    subdistrict: 'Tlogomas',
    proposerName: 'Bambang Irawan',
    proposerNik: '3573051203790005',
    proposerPhone: '081333444555',
    proposerAddress: 'Jl. Tlogomas No. 88, RT 02 / RW 05, Kel. Tlogomas, Kec. Lowokwaru, Kota Malang',
    proposalType: 'self',
    recipientName: 'Bambang Irawan',
    recipientNik: '3573051203790005',
    recipientPhone: '081333444555',
    relationship: 'Diri sendiri',
    recipientAddress: 'Jl. Tlogomas No. 88, RT 02 / RW 05, Kel. Tlogomas, Kec. Lowokwaru, Kota Malang',
    occupation: 'Buruh',
    monthlyIncome: 'Di bawah Rp500.000',
    dependents: '4',
    houseCondition: 'Kurang layak huni',
    housingStatus: 'Kontrak atau sewa',
    additionalInformation: 'Kepala keluarga dengan 4 tanggungan anak sekolah. Pendapatan buruh serabutan tidak menentu akibat kondisi pemulihan pasca sakit.',
    housePhotoUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    housePhotoName: 'tampak_depan_tlogomas.jpg',
    priorityScore: 85,
    logs: [
      {
        id: 'log-002-1',
        timestamp: '2026-03-02T09:15:00.000Z',
        verifierName: 'Sistem BantuWarga',
        verifierRole: 'Sistem Otomatis',
        fromStatus: 'menunggu_verifikasi',
        toStatus: 'menunggu_verifikasi',
        notes: 'Usulan didaftarkan pengusul secara mandiri.',
      },
      {
        id: 'log-002-2',
        timestamp: '2026-03-03T11:20:00.000Z',
        verifierName: 'Dra. Endang Sulastri',
        verifierRole: 'Verifikator Dinas Sosial',
        fromStatus: 'menunggu_verifikasi',
        toStatus: 'verifikasi_berkas',
        notes: 'Berkas KTP dan KK sudah diverifikasi valid di DTKS, menunggu kelengkapan surat keterangan tidak mampu dari RT setempat.',
      },
    ],
  },
  {
    id: 'prop-mlg-003',
    ticketCode: 'BW-2026-MLG-0103',
    createdAt: '2026-03-03T14:40:00.000Z',
    updatedAt: '2026-03-05T10:00:00.000Z',
    status: 'survei_lapangan',
    district: 'Blimbing',
    subdistrict: 'Purwodadi',
    proposerName: 'Rini Astuti',
    proposerNik: '3573016209860002',
    proposerPhone: '081298765432',
    proposerAddress: 'Jl. Simpang Borobudur RT 04 / RW 02, Kel. Purwodadi, Kec. Blimbing, Kota Malang',
    proposalType: 'other',
    recipientName: 'Keluarga Pak Joko Santoso',
    recipientNik: '3573011406730004',
    recipientPhone: '087812349988',
    relationship: 'Ketua RT Setempat',
    recipientAddress: 'Jl. Tenaga Baru No. 12, RT 04 / RW 02, Kel. Purwodadi, Kec. Blimbing, Kota Malang',
    occupation: 'Pekerja informal',
    monthlyIncome: 'Rp500.000 - Rp1.000.000',
    dependents: '3',
    houseCondition: 'Tidak layak huni',
    housingStatus: 'Menumpang',
    additionalInformation: 'Keluarga prasejahtera yang tinggal di lahan bantaran rel. Kondisi sanitasi tidak memadai, tidak memiliki jamban keluarga mandiri.',
    housePhotoUrl: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80',
    housePhotoName: 'kondisi_rumah_blimbing.jpg',
    priorityScore: 90,
    assignedSurveyor: 'Tri Cahyono, S.Sos (TKSK Blimbing)',
    surveyDate: '2026-03-07',
    logs: [
      {
        id: 'log-003-1',
        timestamp: '2026-03-03T14:40:00.000Z',
        verifierName: 'Sistem BantuWarga',
        verifierRole: 'Sistem Otomatis',
        fromStatus: 'menunggu_verifikasi',
        toStatus: 'menunggu_verifikasi',
        notes: 'Usulan didaftarkan melalui koordinasi perangkat RT.',
      },
      {
        id: 'log-003-2',
        timestamp: '2026-03-04T09:00:00.000Z',
        verifierName: 'Dra. Endang Sulastri',
        verifierRole: 'Verifikator Dinas Sosial',
        fromStatus: 'menunggu_verifikasi',
        toStatus: 'verifikasi_berkas',
        notes: 'Berkas administrasi kependudukan lengkap dan valid.',
      },
      {
        id: 'log-003-3',
        timestamp: '2026-03-05T10:00:00.000Z',
        verifierName: 'Rahmat Hidayat, S.AP',
        verifierRole: 'Supervisor Dinsos',
        fromStatus: 'verifikasi_berkas',
        toStatus: 'survei_lapangan',
        notes: 'Dijadwalkan survei lapangan dan verifikasi faktual tempat tinggal oleh petugas TKSK Blimbing.',
        surveyorName: 'Tri Cahyono, S.Sos (TKSK Blimbing)',
        surveyDate: '2026-03-07',
      },
    ],
  },
  {
    id: 'prop-mlg-004',
    ticketCode: 'BW-2026-MLG-0104',
    createdAt: '2026-03-04T10:10:00.000Z',
    updatedAt: '2026-03-06T15:30:00.000Z',
    status: 'musyawarah',
    district: 'Kedungkandang',
    subdistrict: 'Buring',
    proposerName: 'Kurnia Dewi',
    proposerNik: '3573034907910001',
    proposerPhone: '085234567811',
    proposerAddress: 'Jl. Mayjen Sungkono Gang 2 RT 01 / RW 03, Kel. Buring, Kec. Kedungkandang, Kota Malang',
    proposalType: 'other',
    recipientName: 'Ibu Warsini (Janda Dhuafa)',
    recipientNik: '3573036811650002',
    recipientPhone: '085234567811',
    relationship: 'Kerabat',
    recipientAddress: 'Jl. Mayjen Sungkono Gang 2 RT 01 / RW 03, Kel. Buring, Kec. Kedungkandang, Kota Malang',
    occupation: 'Pedagang',
    monthlyIncome: 'Di bawah Rp500.000',
    dependents: '2',
    houseCondition: 'Kurang layak huni',
    housingStatus: 'Milik sendiri',
    additionalInformation: 'Lansia jualan gorengan keliling dengan penghasilan Rp15.000/hari, menanggung 2 cucu yatim piatu usia sekolah dasar.',
    housePhotoUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    housePhotoName: 'rumah_buring_kedungkandang.jpg',
    priorityScore: 88,
    assignedSurveyor: 'Agus Widodo (Petugas Pendamping PKH)',
    surveyDate: '2026-03-05',
    logs: [
      {
        id: 'log-004-1',
        timestamp: '2026-03-04T10:10:00.000Z',
        verifierName: 'Sistem BantuWarga',
        verifierRole: 'Sistem Otomatis',
        fromStatus: 'menunggu_verifikasi',
        toStatus: 'menunggu_verifikasi',
        notes: 'Usulan diterima ke sistem portal.',
      },
      {
        id: 'log-004-2',
        timestamp: '2026-03-05T08:00:00.000Z',
        verifierName: 'Dra. Endang Sulastri',
        verifierRole: 'Verifikator Dinas Sosial',
        fromStatus: 'menunggu_verifikasi',
        toStatus: 'survei_lapangan',
        notes: 'Survei faktual telah selesai dilaksanakan dengan hasil kondisi benar-benar sangat membutuhkan.',
      },
      {
        id: 'log-004-3',
        timestamp: '2026-03-06T15:30:00.000Z',
        verifierName: 'Rahmat Hidayat, S.AP',
        verifierRole: 'Supervisor Dinsos',
        fromStatus: 'survei_lapangan',
        toStatus: 'musyawarah',
        notes: 'Diteruskan ke agenda Musyawarah Kelurahan (Muskel Buring) untuk penetapan usulan PKH/BPNT tahap 2.',
      },
    ],
  },
  {
    id: 'prop-mlg-005',
    ticketCode: 'BW-2026-MLG-0105',
    createdAt: '2026-02-20T11:00:00.000Z',
    updatedAt: '2026-03-04T14:00:00.000Z',
    status: 'disetujui',
    district: 'Klojen',
    subdistrict: 'Bareng',
    proposerName: 'Hadi Prasetyo',
    proposerNik: '3573021901840003',
    proposerPhone: '081234909090',
    proposerAddress: 'Jl. Bareng Kulon Gang 2 No. 15, Kel. Bareng, Kec. Klojen, Kota Malang',
    proposalType: 'other',
    recipientName: 'Pak Sukardi (Disabilitas Fisik)',
    recipientNik: '3573020504710006',
    recipientPhone: '081234909090',
    relationship: 'Pengurus RW',
    recipientAddress: 'Jl. Bareng Kulon Gang 2 No. 15, Kel. Bareng, Kec. Klojen, Kota Malang',
    occupation: 'Tidak bekerja',
    monthlyIncome: 'Tidak memiliki penghasilan',
    dependents: '2',
    houseCondition: 'Kurang layak huni',
    housingStatus: 'Menumpang',
    additionalInformation: 'Warga penyandang disabilitas lumpuh fisik pasca kecelakaan kerja. Tinggal di petak kamar menumpang saudara.',
    housePhotoUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
    housePhotoName: 'bareng_klojen_bukti.jpg',
    priorityScore: 96,
    logs: [
      {
        id: 'log-005-1',
        timestamp: '2026-02-20T11:00:00.000Z',
        verifierName: 'Sistem BantuWarga',
        verifierRole: 'Sistem Otomatis',
        fromStatus: 'menunggu_verifikasi',
        toStatus: 'menunggu_verifikasi',
        notes: 'Pendaftaran usulan bansos disabilitas.',
      },
      {
        id: 'log-005-2',
        timestamp: '2026-02-25T13:30:00.000Z',
        verifierName: 'Dra. Endang Sulastri',
        verifierRole: 'Verifikator Dinas Sosial',
        fromStatus: 'menunggu_verifikasi',
        toStatus: 'survei_lapangan',
        notes: 'Verifikasi faktual langsung di kediaman warga.',
      },
      {
        id: 'log-005-3',
        timestamp: '2026-03-04T14:00:00.000Z',
        verifierName: 'Rahmat Hidayat, S.AP',
        verifierRole: 'Supervisor Dinsos',
        fromStatus: 'survei_lapangan',
        toStatus: 'disetujui',
        notes: 'Disetujui dalam Berita Acara Musyawarah Kelurahan Bareng sebagai Penerima Bantuan Asistensi Sosial Penyandang Disabilitas (ASPD) Kota Malang.',
      },
    ],
  },
  {
    id: 'prop-mlg-006',
    ticketCode: 'BW-2026-MLG-0106',
    createdAt: '2026-02-18T08:15:00.000Z',
    updatedAt: '2026-02-22T09:45:00.000Z',
    status: 'ditolak',
    district: 'Lowokwaru',
    subdistrict: 'Dinoyo',
    proposerName: 'Danang Wicaksono',
    proposerNik: '3573052107950001',
    proposerPhone: '082133445566',
    proposerAddress: 'Jl. MT Haryono No. 120, Kel. Dinoyo, Kec. Lowokwaru, Kota Malang',
    proposalType: 'self',
    recipientName: 'Danang Wicaksono',
    recipientNik: '3573052107950001',
    recipientPhone: '082133445566',
    relationship: 'Diri sendiri',
    recipientAddress: 'Jl. MT Haryono No. 120, Kel. Dinoyo, Kec. Lowokwaru, Kota Malang',
    occupation: 'Karyawan',
    monthlyIncome: 'Di atas Rp2.000.000',
    dependents: '0',
    houseCondition: 'Layak huni',
    housingStatus: 'Kontrak atau sewa',
    additionalInformation: 'Mengajukan bantuan modal usaha mandiri.',
    priorityScore: 25,
    logs: [
      {
        id: 'log-006-1',
        timestamp: '2026-02-18T08:15:00.000Z',
        verifierName: 'Sistem BantuWarga',
        verifierRole: 'Sistem Otomatis',
        fromStatus: 'menunggu_verifikasi',
        toStatus: 'menunggu_verifikasi',
        notes: 'Usulan diterima sistem.',
      },
      {
        id: 'log-006-2',
        timestamp: '2026-02-22T09:45:00.000Z',
        verifierName: 'Dra. Endang Sulastri',
        verifierRole: 'Verifikator Dinas Sosial',
        fromStatus: 'menunggu_verifikasi',
        toStatus: 'ditolak',
        notes: 'Ditolak: Pemohon berstatus karyawan dengan penghasilan di atas UMK / desil mampu dan tidak memenuhi kriteria keluarga miskin/rentan pada program Bansos Reguler.',
      },
    ],
  },
]

// Ekstrak nama kecamatan dari string alamat
function extractDistrictFromAddress(address: string): { district: string; subdistrict: string } {
  const lower = address.toLowerCase()
  let district = 'Klojen'
  let subdistrict = 'Pusat'

  if (lower.includes('sukun') || lower.includes('bandulan') || lower.includes('gadang') || lower.includes('bakalan')) {
    district = 'Sukun'
    subdistrict = lower.includes('bandulan') ? 'Bandulan' : lower.includes('gadang') ? 'Gadang' : 'Sukun'
  } else if (lower.includes('lowokwaru') || lower.includes('tlogomas') || lower.includes('dinoyo') || lower.includes('tunggulwulung')) {
    district = 'Lowokwaru'
    subdistrict = lower.includes('tlogomas') ? 'Tlogomas' : lower.includes('dinoyo') ? 'Dinoyo' : 'Lowokwaru'
  } else if (lower.includes('blimbing') || lower.includes('purwodadi') || lower.includes('polowijen') || lower.includes('arjosari')) {
    district = 'Blimbing'
    subdistrict = lower.includes('purwodadi') ? 'Purwodadi' : lower.includes('polowijen') ? 'Polowijen' : 'Blimbing'
  } else if (lower.includes('kedungkandang') || lower.includes('buring') || lower.includes('sawojajar') || lower.includes('kotalama')) {
    district = 'Kedungkandang'
    subdistrict = lower.includes('buring') ? 'Buring' : lower.includes('sawojajar') ? 'Sawojajar' : 'Kedungkandang'
  } else if (lower.includes('klojen') || lower.includes('bareng') || lower.includes('kauman') || lower.includes('oro-oro ombo')) {
    district = 'Klojen'
    subdistrict = lower.includes('bareng') ? 'Bareng' : lower.includes('kauman') ? 'Kauman' : 'Klojen'
  }

  return { district, subdistrict }
}

// Hitung skor prioritas kerentanan (1 - 100)
export function calculatePriorityScore(data: {
  monthlyIncome: string
  dependents: string
  houseCondition: string
  housingStatus: string
}): number {
  let score = 20

  // Penghasilan
  if (data.monthlyIncome === 'Tidak memiliki penghasilan') score += 35
  else if (data.monthlyIncome === 'Di bawah Rp500.000') score += 28
  else if (data.monthlyIncome === 'Rp500.000 - Rp1.000.000') score += 20
  else if (data.monthlyIncome === 'Rp1.000.001 - Rp2.000.000') score += 10

  // Tanggungan
  const depNum = parseInt(data.dependents || '0', 10)
  if (depNum >= 4) score += 20
  else if (depNum >= 2) score += 12
  else if (depNum === 1) score += 6

  // Kondisi rumah
  if (data.houseCondition === 'Tidak layak huni') score += 20
  else if (data.houseCondition === 'Kurang layak huni') score += 12
  else if (data.houseCondition === 'Cukup layak huni') score += 5

  // Status tempat tinggal
  if (data.housingStatus === 'Menumpang') score += 10
  else if (data.housingStatus === 'Kontrak atau sewa') score += 6

  return Math.min(Math.max(score, 10), 100)
}

class ProposalService {
  private getStorageData(): ProposalItem[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) {
        this.saveStorageData(INITIAL_PROPOSALS)
        return INITIAL_PROPOSALS
      }
      return JSON.parse(raw) as ProposalItem[]
    } catch {
      this.saveStorageData(INITIAL_PROPOSALS)
      return INITIAL_PROPOSALS
    }
  }

  private saveStorageData(items: ProposalItem[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
      window.dispatchEvent(new Event(EVENT_NAME))
    } catch {
      // Penyimpanan penuh
    }
  }

  public getAll(): ProposalItem[] {
    return this.getStorageData()
  }

  public getById(id: string): ProposalItem | undefined {
    return this.getStorageData().find((item) => item.id === id)
  }

  public getByTicketCode(ticketCode: string): ProposalItem | undefined {
    const code = ticketCode.trim().toUpperCase()
    return this.getStorageData().find(
      (item) => item.ticketCode.toUpperCase() === code,
    )
  }

  public addProposal(
    formData: ProposalFormData,
    photoDataUrl?: string,
  ): ProposalItem {
    const items = this.getStorageData()
    const now = new Date()
    const year = now.getFullYear()
    const nextSeq = String(items.length + 101).padStart(4, '0')
    const ticketCode = `BW-${year}-MLG-${nextSeq}`

    const { district, subdistrict } = extractDistrictFromAddress(
      formData.recipientAddress || formData.proposerAddress,
    )

    const priorityScore = calculatePriorityScore({
      monthlyIncome: formData.monthlyIncome,
      dependents: formData.dependents,
      houseCondition: formData.houseCondition,
      housingStatus: formData.housingStatus,
    })

    const initialLog: VerificationLog = {
      id: `log-${Date.now()}-1`,
      timestamp: now.toISOString(),
      verifierName: 'Sistem BantuWarga',
      verifierRole: 'Portal Warga',
      fromStatus: 'menunggu_verifikasi',
      toStatus: 'menunggu_verifikasi',
      notes: `Usulan baru diajukan oleh ${formData.proposerName} (${formData.proposalType === 'self' ? 'Pengajuan Mandiri' : 'Mengusulkan Warga Lain'}).`,
    }

    const newProposal: ProposalItem = {
      id: `prop-${Date.now()}`,
      ticketCode,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
      status: 'menunggu_verifikasi',
      district,
      subdistrict,
      proposerName: formData.proposerName,
      proposerNik: formData.proposerNik,
      proposerPhone: formData.proposerPhone,
      proposerAddress: formData.proposerAddress,
      proposalType: formData.proposalType === 'self' ? 'self' : 'other',
      recipientName: formData.recipientName,
      recipientNik: formData.recipientNik,
      recipientPhone: formData.recipientPhone,
      relationship: formData.relationship,
      recipientAddress: formData.recipientAddress,
      occupation: formData.occupation,
      monthlyIncome: formData.monthlyIncome,
      dependents: formData.dependents,
      houseCondition: formData.houseCondition,
      housingStatus: formData.housingStatus,
      additionalInformation: formData.additionalInformation,
      housePhotoUrl: photoDataUrl || (formData.housePhoto ? URL.createObjectURL(formData.housePhoto) : undefined),
      housePhotoName: formData.housePhoto?.name || 'foto_rumah_warga.jpg',
      priorityScore,
      logs: [initialLog],
    }

    // Usulan terbaru masuk paling atas
    const updated = [newProposal, ...items]
    this.saveStorageData(updated)
    return newProposal
  }

  public updateStatus(
    id: string,
    newStatus: ProposalStatus,
    verifier: { name: string; role: string },
    notes: string,
    surveyorName?: string,
    surveyDate?: string,
  ): ProposalItem {
    const items = this.getStorageData()
    const index = items.findIndex((item) => item.id === id)

    if (index === -1) {
      throw new Error('Usulan tidak ditemukan.')
    }

    const current = items[index]
    const now = new Date().toISOString()

    const newLog: VerificationLog = {
      id: `log-${Date.now()}`,
      timestamp: now,
      verifierName: verifier.name,
      verifierRole: verifier.role,
      fromStatus: current.status,
      toStatus: newStatus,
      notes,
      surveyorName,
      surveyDate,
    }

    const updatedItem: ProposalItem = {
      ...current,
      status: newStatus,
      updatedAt: now,
      assignedSurveyor: surveyorName || current.assignedSurveyor,
      surveyDate: surveyDate || current.surveyDate,
      logs: [newLog, ...current.logs],
    }

    items[index] = updatedItem
    this.saveStorageData(items)
    return updatedItem
  }

  public getMetrics(): ProposalMetrics {
    const items = this.getStorageData()
    return {
      total: items.length,
      menungguVerifikasi: items.filter((i) => i.status === 'menunggu_verifikasi').length,
      verifikasiBerkas: items.filter((i) => i.status === 'verifikasi_berkas').length,
      surveiLapangan: items.filter((i) => i.status === 'survei_lapangan').length,
      musyawarah: items.filter((i) => i.status === 'musyawarah').length,
      disetujui: items.filter((i) => i.status === 'disetujui').length,
      ditolak: items.filter((i) => i.status === 'ditolak').length,
    }
  }

  public resetToDefault(): void {
    this.saveStorageData(INITIAL_PROPOSALS)
  }

  public exportToCSV(items: ProposalItem[]): void {
    const headers = [
      'Kode Tiket',
      'Tanggal Usulan',
      'Status',
      'Kecamatan',
      'Kelurahan',
      'Nama Calon Penerima',
      'NIK Calon Penerima',
      'Telepon Penerima',
      'Alamat Penerima',
      'Pengusul',
      'Pekerjaan',
      'Penghasilan',
      'Tanggungan',
      'Kondisi Rumah',
      'Status Rumah',
      'Skor Prioritas',
      'Petugas Survei',
      'Tanggal Survei',
      'Catatan Terakhir',
    ]

    const rows = items.map((item) => {
      const latestLog = item.logs[0]?.notes || '-'
      return [
        item.ticketCode,
        new Date(item.createdAt).toLocaleDateString('id-ID'),
        item.status,
        item.district,
        item.subdistrict,
        `"${item.recipientName.replace(/"/g, '""')}"`,
        `'${item.recipientNik}`,
        item.recipientPhone,
        `"${item.recipientAddress.replace(/"/g, '""')}"`,
        `"${item.proposerName.replace(/"/g, '""')}"`,
        item.occupation,
        item.monthlyIncome,
        item.dependents,
        item.houseCondition,
        item.housingStatus,
        item.priorityScore,
        item.assignedSurveyor || '-',
        item.surveyDate || '-',
        `"${latestLog.replace(/"/g, '""')}"`,
      ]
    })

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `rekap_usulan_bansos_malang_${Date.now()}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }
}

export const proposalService = new ProposalService()
