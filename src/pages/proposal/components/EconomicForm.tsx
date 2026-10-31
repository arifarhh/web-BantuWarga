
import type { ProposalFormData } from '../types/proposal.types'

interface EconomicFormProps {
  data: ProposalFormData
  onChange: (field: keyof ProposalFormData, value: string) => void
}

const inputClass =
  'w-full rounded-lg border border-[var(--line)] bg-white px-4 py-3 text-sm text-[var(--ink)] outline-none transition focus:border-[var(--teal)] focus:ring-2 focus:ring-[var(--mint)]'

const labelClass =
  'mb-2 block text-sm font-semibold text-[var(--navy)]'

export default function EconomicForm({
  data,
  onChange,
}: EconomicFormProps) {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[var(--navy)]">
          Kondisi Ekonomi Calon Penerima
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[var(--text)]">
          Informasikan kondisi pekerjaan, penghasilan, tanggungan, dan
          tempat tinggal calon penerima secara jujur.
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <label htmlFor="occupation" className={labelClass}>
            Pekerjaan saat ini <span className="text-[var(--danger)]">*</span>
          </label>
          <select
            id="occupation"
            value={data.occupation}
            onChange={(e) => onChange('occupation', e.target.value)}
            className={inputClass}
            required
          >
            <option value="">Pilih pekerjaan</option>
            <option value="Tidak bekerja">Tidak bekerja</option>
            <option value="Buruh">Buruh</option>
            <option value="Petani">Petani</option>
            <option value="Pedagang">Pedagang</option>
            <option value="Pekerja informal">Pekerja informal</option>
            <option value="Karyawan">Karyawan</option>
            <option value="Lainnya">Lainnya</option>
          </select>
        </div>

        <div>
          <label htmlFor="monthlyIncome" className={labelClass}>
            Perkiraan penghasilan per bulan{' '}
            <span className="text-[var(--danger)]">*</span>
          </label>
          <select
            id="monthlyIncome"
            value={data.monthlyIncome}
            onChange={(e) => onChange('monthlyIncome', e.target.value)}
            className={inputClass}
            required
          >
            <option value="">Pilih rentang penghasilan</option>
            <option value="Tidak memiliki penghasilan">
              Tidak memiliki penghasilan
            </option>
            <option value="Di bawah Rp500.000">Di bawah Rp500.000</option>
            <option value="Rp500.000 - Rp1.000.000">
              Rp500.000 - Rp1.000.000
            </option>
            <option value="Rp1.000.001 - Rp2.000.000">
              Rp1.000.001 - Rp2.000.000
            </option>
            <option value="Di atas Rp2.000.000">
              Di atas Rp2.000.000
            </option>
            <option value="Tidak diketahui">Tidak diketahui</option>
          </select>
        </div>

        <div>
          <label htmlFor="dependents" className={labelClass}>
            Jumlah tanggungan keluarga{' '}
            <span className="text-[var(--danger)]">*</span>
          </label>
          <input
            id="dependents"
            type="number"
            min="0"
            value={data.dependents}
            onChange={(e) => onChange('dependents', e.target.value)}
            placeholder="Contoh: 3"
            className={inputClass}
            required
          />
          <p className="mt-1 text-xs text-[var(--muted)]">
            Masukkan jumlah anggota keluarga yang menjadi tanggungan.
          </p>
        </div>

        <div>
          <label htmlFor="houseCondition" className={labelClass}>
            Kondisi tempat tinggal{' '}
            <span className="text-[var(--danger)]">*</span>
          </label>
          <select
            id="houseCondition"
            value={data.houseCondition}
            onChange={(e) => onChange('houseCondition', e.target.value)}
            className={inputClass}
            required
          >
            <option value="">Pilih kondisi rumah</option>
            <option value="Tidak layak huni">Tidak layak huni</option>
            <option value="Kurang layak huni">Kurang layak huni</option>
            <option value="Cukup layak huni">Cukup layak huni</option>
            <option value="Layak huni">Layak huni</option>
            <option value="Tidak diketahui">Tidak diketahui</option>
          </select>
        </div>

        <div>
          <label htmlFor="housingStatus" className={labelClass}>
            Status tempat tinggal{' '}
            <span className="text-[var(--danger)]">*</span>
          </label>
          <select
            id="housingStatus"
            value={data.housingStatus}
            onChange={(e) => onChange('housingStatus', e.target.value)}
            className={inputClass}
            required
          >
            <option value="">Pilih status tempat tinggal</option>
            <option value="Milik sendiri">Milik sendiri</option>
            <option value="Menumpang">Menumpang</option>
            <option value="Kontrak atau sewa">Kontrak atau sewa</option>
            <option value="Lainnya">Lainnya</option>
            <option value="Tidak diketahui">Tidak diketahui</option>
          </select>
        </div>

        <div>
          <label htmlFor="additionalInformation" className={labelClass}>
            Informasi tambahan
          </label>
          <textarea
            id="additionalInformation"
            value={data.additionalInformation}
            onChange={(e) =>
              onChange('additionalInformation', e.target.value)
            }
            rows={4}
            maxLength={500}
            placeholder="Jelaskan kondisi atau keadaan lain yang perlu diketahui..."
            className={inputClass}
          />
          <p className="mt-1 text-right text-xs text-[var(--muted)]">
            {data.additionalInformation.length}/500 karakter
          </p>
        </div>
      </div>
    </div>
  )
}
