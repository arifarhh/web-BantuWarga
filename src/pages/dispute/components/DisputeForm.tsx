import { useState, type FormEvent } from 'react'
import { AlertTriangle, Send, Upload } from 'lucide-react'

const inputClass =
  'w-full rounded-lg border border-[var(--line)] bg-white px-4 py-3 text-sm text-[var(--ink)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--green)] focus:ring-2 focus:ring-[var(--green)]/10'

export function DisputeForm() {
  const [submissionAttempted, setSubmissionAttempted] = useState(false)
  const [evidenceFiles, setEvidenceFiles] = useState<string[]>([])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmissionAttempted(true)
  }

  return (
    <div className="rounded-2xl border border-[var(--line)] bg-white p-5 shadow-sm sm:p-8">
      <div className="mb-7">
        <h2 className="text-xl font-extrabold text-[var(--navy)]">
          Formulir Sanggah Warga
        </h2>
        <p className="mt-2 text-sm leading-6 text-[var(--text)]">
          Berikan informasi yang relevan dan dapat dipertanggungjawabkan.
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="dispute-category"
            className="mb-2 block text-sm font-semibold text-[var(--ink)]"
          >
            Jenis ketidaksesuaian
          </label>
          <select
            id="dispute-category"
            name="category"
            required
            defaultValue=""
            className={inputClass}
          >
            <option value="" disabled>
              Pilih jenis ketidaksesuaian
            </option>
            <option value="recipient-data">Data penerima tidak sesuai</option>
            <option value="changed-circumstances">
              Kondisi penerima telah berubah
            </option>
            <option value="duplicate-record">Data penerima terduplikasi</option>
            <option value="other">Lainnya</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="dispute-address"
            className="mb-2 block text-sm font-semibold text-[var(--ink)]"
          >
            Alamat
          </label>
          <input
            id="dispute-address"
            name="address"
            type="text"
            required
            placeholder="Masukkan alamat lengkap lokasi yang dilaporkan"
            className={inputClass}
          />
        </div>

        <div>
          <label
            htmlFor="dispute-description"
            className="mb-2 block text-sm font-semibold text-[var(--ink)]"
          >
            Keterangan
          </label>
          <textarea
            id="dispute-description"
            name="description"
            rows={5}
            required
            minLength={20}
            placeholder="Jelaskan informasi yang Anda ketahui (minimal 20 karakter)"
            className={inputClass}
          />
        </div>

        <div>
          <label
            htmlFor="dispute-evidence"
            className="mb-2 block text-sm font-semibold text-[var(--ink)]"
          >
            Bukti pendukung
            <span className="ml-1 font-normal text-[var(--muted)]">
              (opsional)
            </span>
          </label>
          <div className="rounded-xl border border-dashed border-[var(--line)] bg-[var(--background)] p-4">
            <label
              htmlFor="dispute-evidence"
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-[var(--line)] bg-white px-4 py-2.5 text-sm font-semibold text-[var(--navy)] transition hover:border-[var(--green)] hover:bg-[var(--green-light)]"
            >
              <Upload size={17} />
              Pilih berkas
            </label>
            <input
              id="dispute-evidence"
              name="evidence"
              type="file"
              accept=".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf"
              multiple
              onChange={(event) => {
                setEvidenceFiles(
                  Array.from(event.currentTarget.files ?? []).map(
                    (file) => file.name,
                  ),
                )
              }}
              className="sr-only"
            />
            <p className="mt-3 text-xs leading-5 text-[var(--muted)]">
              Unggah foto atau dokumen pendukung dalam format JPG, PNG, atau
              PDF.
            </p>
            {evidenceFiles.length > 0 && (
              <ul className="mt-3 space-y-1 text-xs text-[var(--text)]">
                {evidenceFiles.map((fileName) => (
                  <li key={fileName} className="truncate">
                    {fileName}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle
              size={19}
              className="mt-0.5 shrink-0 text-amber-700"
            />
            <p className="text-xs leading-5 text-amber-950">
              Formulir ini belum terhubung ke layanan pengiriman laporan.
              Informasi yang diisi belum akan diterima atau diproses oleh
              petugas.
            </p>
          </div>
        </div>

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--dark-teal)] px-5 py-3 text-sm font-bold text-white transition hover:bg-[var(--teal)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--green)] focus-visible:ring-offset-2 sm:w-auto"
        >
          <Send size={16} />
          Periksa formulir
        </button>
      </form>

      {submissionAttempted && (
        <p
          role="status"
          className="mt-5 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-950"
        >
          Formulir belum dikirim. Layanan pengiriman sanggahan belum tersedia
          pada aplikasi ini.
        </p>
      )}
    </div>
  )
}
