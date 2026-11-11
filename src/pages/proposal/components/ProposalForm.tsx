
import { useState } from 'react'
import { ArrowLeft, ArrowRight, CheckCircle2, Info } from 'lucide-react'

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

export default function ProposalForm() {
  const [currentStep, setCurrentStep] = useState<ProposalStep>(1)
  const [formData, setFormData] =
    useState<ProposalFormData>(initialProposalData)
  const [errorMessage, setErrorMessage] = useState('')
  const [consent, setConsent] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)

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

  const handleSubmit = () => {
    if (!consent) {
      setErrorMessage('Berikan persetujuan sebelum menyelesaikan pengisian.')
      return
    }

    setErrorMessage('')

    // Simulasi penyelesaian frontend.
    // Belum menyimpan data ke backend.
    setIsCompleted(true)
  }

  if (isCompleted) {
    return (
      <div className="rounded-2xl border border-[var(--line)] bg-white px-6 py-12 text-center shadow-sm md:px-10">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--green-light)] text-[var(--green)]">
          <CheckCircle2 size={34} />
        </div>

        <h2 className="mt-5 text-2xl font-bold text-[var(--navy)]">
          Pengisian Usulan Selesai
        </h2>

        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[var(--text)]">
          Seluruh tahapan formulir telah dilengkapi. Data ini masih berupa
          simulasi dan belum dikirim atau disimpan ke server.
        </p>

        <button
          type="button"
          onClick={() => {
            setFormData(initialProposalData)
            setCurrentStep(1)
            setConsent(false)
            setIsCompleted(false)
            setErrorMessage('')
          }}
          className="mt-7 rounded-lg bg-[var(--teal)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--navy)]"
        >
          Buat Usulan Baru
        </button>
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
