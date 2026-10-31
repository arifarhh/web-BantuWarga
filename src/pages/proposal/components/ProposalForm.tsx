import { useState } from 'react'
import { ArrowLeft, ArrowRight, Info } from 'lucide-react'

import ProposalSteps from './ProposalSteps'
import IdentityForm from './IdentityForm'
import RecipientForm from './RecipientForm'

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

      if (!/^\d{10,15}$/.test(formData.proposerPhone)) {
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
    }

    return true
  }

  const handleNext = () => {
    if (currentStep === 1) {
      setCurrentStep(2)
      setErrorMessage('')
      return
    }

    if (!validateCurrentStep()) return

    if (currentStep < 3) {
      setCurrentStep((previous) => (previous + 1) as ProposalStep)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((previous) => (previous - 1) as ProposalStep)
      setErrorMessage('')
    }
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
              sebenarnya. Usulan yang dikirim akan menjadi bahan pemeriksaan
              dan verifikasi oleh petugas berwenang.
            </p>

            <div className="mt-6 rounded-xl bg-[var(--green-light)] p-5">
              <h3 className="text-sm font-bold text-[var(--navy)]">
                Hal yang perlu disiapkan
              </h3>

              <ul className="mt-3 space-y-3 text-sm text-[var(--text)]">
                <li className="flex gap-2">
                  <span className="font-bold text-[var(--green)]">✓</span>
                  Data identitas pengusul dan calon penerima.
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-[var(--green)]">✓</span>
                  Informasi kondisi ekonomi dan tempat tinggal.
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-[var(--green)]">✓</span>
                  Alamat dan bukti pendukung yang relevan.
                </li>
              </ul>
            </div>

            <p className="mt-5 text-xs leading-relaxed text-[var(--muted)]">
              Pengajuan usulan tidak secara otomatis menjamin seseorang
              menerima bantuan sosial. Penetapan penerima mengikuti
              ketentuan dan proses verifikasi yang berlaku.
            </p>
          </div>
        )}

        {currentStep === 2 && (
          <IdentityForm data={formData} onChange={handleChange} />
        )}

        {currentStep === 3 && (
          <RecipientForm data={formData} onChange={handleChange} />
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

          <button
            type="button"
            onClick={handleNext}
            disabled={currentStep === 3}
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--dark-teal)] px-5 py-3 text-sm font-bold text-white transition hover:bg-[var(--teal)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {currentStep === 1 ? 'Mulai Pengajuan' : 'Lanjutkan'}
            <ArrowRight size={16} />
          </button>
        </div>

        {currentStep === 3 && (
          <p className="mt-3 text-center text-xs text-[var(--muted)]">
            Tahap berikutnya akan tersedia setelah formulir kondisi ekonomi,
            lokasi, dan bukti selesai dibuat.
          </p>
        )}
      </div>
    </div>
  )
}