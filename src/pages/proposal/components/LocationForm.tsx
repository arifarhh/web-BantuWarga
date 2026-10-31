
import { useEffect, useState } from 'react'
import { ImagePlus, MapPin, Upload, X } from 'lucide-react'

import type { ProposalFormData } from '../types/proposal.types'

interface LocationFormProps {
  data: ProposalFormData
  onChange: (field: keyof ProposalFormData, value: string) => void
  onFileChange: (file: File | null) => void
}

const inputClass =
  'w-full rounded-lg border border-[var(--line)] bg-white px-4 py-3 text-sm text-[var(--ink)] outline-none transition focus:border-[var(--teal)] focus:ring-2 focus:ring-[var(--mint)]'

const labelClass =
  'mb-2 block text-sm font-semibold text-[var(--navy)]'

export default function LocationForm({
  data,
  onChange,
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
          Lengkapi alamat lokasi calon penerima dan unggah foto kondisi
          tempat tinggal sebagai bukti pendukung usulan.
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <label htmlFor="recipientAddressLocation" className={labelClass}>
            Alamat lokasi calon penerima{' '}
            <span className="text-[var(--danger)]">*</span>
          </label>
          <textarea
            id="recipientAddressLocation"
            value={data.recipientAddress}
            onChange={(e) => onChange('recipientAddress', e.target.value)}
            rows={3}
            placeholder="Masukkan alamat lengkap, RT/RW, kelurahan, dan kecamatan..."
            className={inputClass}
            required
          />
        </div>

        <div>
          <div className="mb-3 flex items-center gap-2">
            <MapPin size={18} className="text-[var(--teal)]" />
            <h3 className="text-sm font-semibold text-[var(--navy)]">
              Koordinat Lokasi
            </h3>
          </div>

          <p className="mb-4 text-xs leading-relaxed text-[var(--text)]">
            Masukkan koordinat lokasi tempat tinggal calon penerima.
            Pengambilan koordinat melalui peta atau GPS dapat
            diintegrasikan pada tahap pengembangan berikutnya.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="latitude" className={labelClass}>
                Latitude
              </label>
              <input
                id="latitude"
                type="text"
                value={data.latitude}
                onChange={(e) => onChange('latitude', e.target.value)}
                placeholder="Contoh: -7.9666"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="longitude" className={labelClass}>
                Longitude
              </label>
              <input
                id="longitude"
                type="text"
                value={data.longitude}
                onChange={(e) => onChange('longitude', e.target.value)}
                placeholder="Contoh: 112.6326"
                className={inputClass}
              />
            </div>
          </div>
        </div>

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
      </div>
    </div>
  )
}
