
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Info,
  Copy,
  Check,
} from 'lucide-react'

import ProposalSteps from './ProposalSteps'
import IdentityForm from './IdentityForm'
import RecipientForm from './RecipientForm'
import EconomicForm from './EconomicForm'
import LocationForm from './LocationForm'
import ConfirmationForm from './ConfirmationForm'

import {
  initialProposalData,
  type ProposalFormData,
  type ProposalStep,
} from '../types/proposal.types'
import { proposalService } from '../../../services/proposalService'

export default function ProposalForm() {
  const [currentStep, setCurrentStep] = useState<ProposalStep>(1)
  const [formData, setFormData] =
    useState<ProposalFormData>(initialProposalData)
  const [errorMessage, setErrorMessage] = useState('')
  const [consent, setConsent] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [createdTicket, setCreatedTicket] = useState('')
  const [isCopied, setIsCopied] = useState(false)

  const handleChange = (
    field: keyof ProposalFormData,
    value: string,
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }))
    setErrorMessage('')
  }

  const handleFileChange = (file: File | null) => {
    setFormData((previous) => ({
      ...previous,
      housePhoto: file,
    }))
    setErrorMessage('')
  }

  const validateCurrentStep = () => {
    if (currentStep === 2) {
      if (
        !formData.proposerName.trim() ||
        !formData.proposerNik.trim() ||
        !formData.proposerPhone.trim() ||
        !formData.proposerAddress.trim()
      ) {
        setErrorMessage('Mohon lengkapi seluruh identitas pengusul.')
        return false
      }

      if (!/^\d{16}$/.test(formData.proposerNik)) {
        setErrorMessage('NIK pengusul harus terdiri dari 16 digit.')
        return false
      }

      if (!/^\d{10,15}$/.test(formData.proposerPhone.replace(/\D/g, ''))) {
        setErrorMessage('Periksa kembali nomor HP pengusul.')
        return false
      }
    }

    if (currentStep === 3) {
      if (!formData.proposalType) {
        setErrorMessage('Pilih tujuan pengajuan terlebih dahulu.')
        return false
      }

      if (
        !formData.recipientName.trim() ||
        !formData.recipientNik.trim() ||
        !formData.recipientPhone.trim() ||
        !formData.relationship.trim() ||
        !formData.recipientAddress.trim()
      ) {
        setErrorMessage('Mohon lengkapi seluruh data calon penerima.')
        return false
      }

      if (!/^\d{16}$/.test(formData.recipientNik)) {
        setErrorMessage('NIK calon penerima harus terdiri dari 16 digit.')
        return false
      }

      if (!/^\d{10,15}$/.test(formData.recipientPhone.replace(/\D/g, ''))) {
        setErrorMessage('Periksa kembali nomor HP calon penerima.')
        return false
      }
    }

    if (currentStep === 4) {
      if (
        !formData.occupation ||
        !formData.monthlyIncome ||
        formData.dependents === '' ||
        !formData.houseCondition ||
        !formData.housingStatus
      ) {
        setErrorMessage('Mohon lengkapi seluruh informasi kondisi ekonomi.')
        return false
      }

      if (
        !Number.isInteger(Number(formData.dependents)) ||
        Number(formData.dependents) < 0
      ) {
        setErrorMessage('Jumlah tanggungan harus berupa angka nol atau lebih.')
        return false
      }
    }

    if (currentStep === 5) {
      if (!formData.recipientAddress.trim()) {
        setErrorMessage('Alamat calon penerima belum tersedia.')
        return false
      }

      if (!formData.housePhoto) {
        setErrorMessage('Silakan unggah foto kondisi tempat tinggal.')
        return false
      }
    }

    return true
  }

  const handleNext = () => {
    setErrorMessage('')

    if (currentStep === 1) {
      setCurrentStep(2)
      return
    }

    if (!validateCurrentStep()) return

    if (currentStep < 6) {
      setCurrentStep((previous) => (previous + 1) as ProposalStep)
    }
  }

  const handlePrevious = () => {
    setErrorMessage('')

    if (currentStep > 1) {
      setCurrentStep((previous) => (previous - 1) as ProposalStep)
    }
  }

  const handleSubmit = async () => {
    if (!consent) {
      setErrorMessage('Berikan persetujuan sebelum menyelesaikan pengisian.')
      return
    }

    setErrorMessage('')

    let photoDataUrl: string | undefined = undefined
    if (formData.housePhoto) {
      try {
        photoDataUrl = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => resolve(reader.result as string)
          reader.onerror = reject
          reader.readAsDataURL(formData.housePhoto as Blob)
        })
      } catch {
        // Abaikan jika gagal baca
      }
    }

    // Simpan ke data store terpusat
    const created = proposalService.addProposal(formData, photoDataUrl)
    setCreatedTicket(created.ticketCode)
    setIsCompleted(true)
  }

  const handleCopyTicket = () => {
    if (!createdTicket) return
    navigator.clipboard.writeText(createdTicket)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  if (isCompleted) {
    return (
      <div className="rounded-2xl border border-[var(--line)] bg-white px-6 py-10 text-center shadow-sm md:px-10">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--green-light)] text-[var(--green)]">
          <CheckCircle2 size={36} />
        </div>

        <h2 className="mt-4 text-2xl font-bold text-[var(--navy)]">
          Usulan Berhasil Dikirim!
        </h2>

        <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-[var(--text)]">
          Seluruh tahapan formulir telah dilengkapi dan data usulan telah tersimpan ke dalam sistem untuk ditinjau oleh petugas verifikator.
        </p>

        {/* Kotak Kode Tiket */}
        <div className="mx-auto mt-6 max-w-md rounded-xl border border-[var(--line)] bg-[var(--green-light)]/60 p-4">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--teal)]">
            Kode Tiket Pelacakan Anda:
          </p>
          <div className="mt-2 flex items-center justify-center gap-2">
            <span className="font-mono text-2xl font-extrabold text-[var(--navy)]">
              {createdTicket}
            </span>
            <button
              type="button"
              onClick={handleCopyTicket}
              title="Salin Kode Tiket"
              className="rounded-lg bg-white p-2 text-[var(--teal)] shadow-sm border border-[var(--line)] hover:bg-[var(--green-light)] transition cursor-pointer"
            >
              {isCopied ? <Check size={16} className="text-[var(--green)]" /> : <Copy size={16} />}
            </button>
          </div>
          <p className="mt-2 text-[11px] text-[var(--text)]">
            Simpan kode tiket ini untuk memantau proses verifikasi bantuan sosial.
          </p>
        </div>

        {/* Panduan Tindak Lanjut Warga */}
        <div className="mx-auto mt-5 max-w-md rounded-xl border border-[var(--line)] bg-[var(--background)] p-4 text-left text-xs">
          <div className="flex items-center gap-2 font-bold text-[var(--navy)] mb-1.5">
            <Info size={16} className="text-[var(--teal)] shrink-0" />
            <span>Tahapan Selanjutnya:</span>
          </div>
          <p className="text-[11px] leading-relaxed text-[var(--text)]">
            Usulan Anda akan diverifikasi kelengkapan berkasnya oleh tim verifikator Dinas Sosial Kota Malang. Perkembangan status usulan dapat dipantau secara berkala menggunakan kode tiket di atas.
          </p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-lg bg-[var(--teal)] px-6 py-3 text-xs font-bold text-white transition hover:bg-[var(--navy)]"
          >
            Kembali ke Beranda
          </Link>

          <button
            type="button"
            onClick={() => {
              setFormData(initialProposalData)
              setCurrentStep(1)
              setConsent(false)
              setIsCompleted(false)
              setErrorMessage('')
              setCreatedTicket('')
            }}
            className="inline-flex items-center justify-center rounded-lg border border-[var(--line)] bg-white px-6 py-3 text-xs font-bold text-[var(--navy)] transition hover:bg-slate-50 cursor-pointer"
          >
            Buat Usulan Baru
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <ProposalSteps currentStep={currentStep} />

      <div className="mt-6 rounded-2xl border border-[var(--line)] bg-white p-5 shadow-sm md:p-8">
        {currentStep === 1 && (
          <div>
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--green-light)] text-[var(--green)]">
              <Info size={23} />
            </div>

            <h2 className="text-xl font-bold text-[var(--navy)]">
              Sebelum Mengajukan Usulan
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-[var(--text)]">
              Pastikan informasi yang disampaikan sesuai dengan kondisi
              sebenarnya. Usulan akan menjadi bahan pemeriksaan dan verifikasi
              oleh pihak berwenang.
            </p>

            <div className="mt-6 rounded-xl bg-[var(--green-light)] p-5">
              <h3 className="text-sm font-bold text-[var(--navy)]">
                Hal yang perlu disiapkan
              </h3>

              <ul className="mt-3 space-y-3 text-sm text-[var(--text)]">
                <li>✓ Data identitas pengusul dan calon penerima.</li>
                <li>✓ Informasi kondisi ekonomi dan tempat tinggal.</li>
                <li>✓ Alamat lokasi dan foto pendukung.</li>
              </ul>
            </div>

            <p className="mt-5 text-xs leading-relaxed text-[var(--muted)]">
              Pengajuan tidak otomatis menjamin seseorang menerima bantuan
              sosial. Penetapan penerima mengikuti ketentuan dan proses
              verifikasi instansi berwenang.
            </p>
          </div>
        )}

        {currentStep === 2 && (
          <IdentityForm data={formData} onChange={handleChange} />
        )}

        {currentStep === 3 && (
          <RecipientForm data={formData} onChange={handleChange} />
        )}

        {currentStep === 4 && (
          <EconomicForm data={formData} onChange={handleChange} />
        )}

        {currentStep === 5 && (
          <LocationForm
            data={formData}
            onFileChange={handleFileChange}
          />
        )}

        {currentStep === 6 && (
          <ConfirmationForm
            data={formData}
            consent={consent}
            onConsentChange={setConsent}
          />
        )}

        {errorMessage && (
          <div
            role="alert"
            className="mt-6 rounded-lg border border-[var(--danger)]/30 bg-[var(--danger)]/10 px-4 py-3 text-sm text-[var(--danger)]"
          >
            {errorMessage}
          </div>
        )}

        <div className="mt-8 flex items-center justify-between gap-3 border-t border-[var(--line)] pt-6">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--line)] px-4 py-3 text-sm font-semibold text-[var(--text)] transition hover:border-[var(--green)] hover:bg-[var(--green-light)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowLeft size={16} />
            Kembali
          </button>

          {currentStep < 6 ? (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--teal)] px-5 py-3 text-sm font-bold text-white transition hover:bg-[var(--navy)]"
            >
              {currentStep === 1 ? 'Mulai Pengajuan' : 'Lanjutkan'}
              <ArrowRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--teal)] px-5 py-3 text-sm font-bold text-white transition hover:bg-[var(--navy)]"
            >
              Selesaikan Pengisian
              <CheckCircle2 size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
