
import { useEffect, useState } from 'react'
import { ImagePlus, MapPin, Upload, X } from 'lucide-react'

import type { ProposalFormData } from '../types/proposal.types'

interface LocationFormProps {
  data: ProposalFormData
  onFileChange: (file: File | null) => void
}

const labelClass =
  'mb-2 block text-sm font-semibold text-[var(--navy)]'

export default function LocationForm({
  data,
  onFileChange,
}: LocationFormProps) {
  const [previewUrl, setPreviewUrl] = useState('')
  const [fileError, setFileError] = useState('')

  useEffect(() => {
    if (!data.housePhoto) {
      setPreviewUrl('')
      return
    }

    const url = URL.createObjectURL(data.housePhoto)
    setPreviewUrl(url)

    return () => URL.revokeObjectURL(url)
  }, [data.housePhoto])

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0]

    if (!file) return

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    const maxSize = 5 * 1024 * 1024

    if (!allowedTypes.includes(file.type)) {
      setFileError('Format foto harus JPG, PNG, atau WebP.')
      event.target.value = ''
      return
    }

    if (file.size > maxSize) {
      setFileError('Ukuran foto maksimal 5 MB.')
      event.target.value = ''
      return
    }

    setFileError('')
    onFileChange(file)
  }

  const removePhoto = () => {
    onFileChange(null)
    setFileError('')
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[var(--navy)]">
          Lokasi dan Bukti Pendukung
        </h2>

        <p className="mt-2 text-sm leading-relaxed text-[var(--text)]">
          Pastikan alamat calon penerima sudah benar dan unggah foto
          kondisi tempat tinggal sebagai bukti pendukung.
        </p>
      </div>

      <div className="space-y-6">
        {/* Alamat diambil dari tahap Calon Penerima */}
        <div>
          <label className={labelClass}>
            Alamat calon penerima
          </label>

          <div className="flex items-start gap-3 rounded-xl border border-[var(--line)] bg-[var(--background)] p-4">
            <MapPin
              size={19}
              className="mt-0.5 shrink-0 text-[var(--teal)]"
            />

            <p className="text-sm leading-relaxed text-[var(--ink)]">
              {data.recipientAddress || 'Alamat belum diisi.'}
            </p>
          </div>

          <p className="mt-2 text-xs text-[var(--muted)]">
            Alamat diambil dari data calon penerima pada tahap sebelumnya.
            Jika perlu diperbaiki, silakan kembali ke tahap Calon Penerima.
          </p>
        </div>

        {/* Upload foto */}
        <div>
          <label className={labelClass}>
            Foto kondisi tempat tinggal{' '}
            <span className="text-[var(--danger)]">*</span>
          </label>

          {!previewUrl ? (
            <label
              htmlFor="housePhoto"
              className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[var(--line)] bg-white px-5 py-10 text-center transition hover:border-[var(--teal)] hover:bg-[var(--green-light)]"
            >
              <div className="mb-3 rounded-full bg-[var(--green-light)] p-4 text-[var(--teal)]">
                <ImagePlus size={26} />
              </div>

              <span className="text-sm font-semibold text-[var(--navy)]">
                Pilih foto untuk diunggah
              </span>

              <span className="mt-1 text-xs text-[var(--muted)]">
                JPG, PNG, atau WebP (maksimal 5 MB)
              </span>

              <span className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[var(--teal)] px-4 py-2 text-xs font-semibold text-white">
                <Upload size={14} />
                Pilih Foto
              </span>

              <input
                id="housePhoto"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          ) : (
            <div className="overflow-hidden rounded-xl border border-[var(--line)] bg-white">
              <img
                src={previewUrl}
                alt="Pratinjau foto kondisi tempat tinggal"
                className="max-h-72 w-full object-contain"
              />

              <div className="flex items-center justify-between gap-3 border-t border-[var(--line)] p-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-[var(--navy)]">
                    {data.housePhoto?.name}
                  </p>

                  <p className="text-xs text-[var(--muted)]">
                    {data.housePhoto
                      ? `${(data.housePhoto.size / 1024 / 1024).toFixed(2)} MB`
                      : ''}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={removePhoto}
                  className="flex shrink-0 items-center gap-1 rounded-lg px-3 py-2 text-xs font-semibold text-[var(--danger)] transition hover:bg-red-50"
                >
                  <X size={14} />
                  Hapus
                </button>
              </div>
            </div>
          )}

          {fileError && (
            <p className="mt-2 text-xs text-[var(--danger)]">
              {fileError}
            </p>
          )}
        </div>

        <p className="text-xs leading-relaxed text-[var(--muted)]">
          Pastikan foto yang diunggah sesuai dengan kondisi tempat tinggal
          calon penerima dan tidak menampilkan informasi pribadi yang tidak
          diperlukan.
        </p>
      </div>
    </div>
  )
}