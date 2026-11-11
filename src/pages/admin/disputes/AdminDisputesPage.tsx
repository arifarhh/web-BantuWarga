import { useCallback, useEffect, useState } from 'react'
import { Search, ShieldAlert, MapPin, Clock3, FileText, Eye, X } from 'lucide-react'

type Dispute = {
  id: string
  category: string
  address: string
  description: string
  evidenceFiles: string[]
  submittedAt: string
  status: string
}

const readDisputes = (): Dispute[] => JSON.parse(localStorage.getItem('bantuwarga_disputes') || '[]')

export default function AdminDisputesPage() {
  const [items, setItems] = useState<Dispute[]>([])
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<Dispute | null>(null)
  const load = useCallback(() => setItems(readDisputes()), [])

  useEffect(() => {
    load()
    window.addEventListener('bantuwarga_disputes_updated', load)
    window.addEventListener('storage', load)
    return () => {
      window.removeEventListener('bantuwarga_disputes_updated', load)
      window.removeEventListener('storage', load)
    }
  }, [load])

  const visible = items.filter((item) => `${item.category} ${item.address} ${item.description}`.toLowerCase().includes(query.toLowerCase()))

  return (
    <div className="space-y-6 text-[var(--ink)]">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-[var(--teal)]">Layanan warga</p>
          <h1 className="mt-1 text-2xl font-extrabold text-[var(--navy)]">Manajemen Sanggahan Warga</h1>
          <p className="mt-1 text-sm text-[var(--text)]">Tinjau laporan ketidaksesuaian yang dikirim melalui form sanggah.</p>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-[var(--line)] bg-white px-4 py-3 text-sm">
          <ShieldAlert size={17} className="text-[var(--teal)]" /> <strong>{items.length}</strong><span className="text-[var(--text)]">laporan diterima</span>
        </div>
      </header>

      <section className="rounded-2xl border border-[var(--line)] bg-white p-4 shadow-sm sm:p-5">
        <label className="relative block">
          <Search size={17} className="absolute left-3.5 top-3.5 text-[var(--muted)]" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari jenis, lokasi, atau keterangan..." className="w-full rounded-xl border border-[var(--line)] bg-[var(--background)] py-3 pl-10 pr-4 text-sm text-[var(--ink)] outline-none focus:border-[var(--green)]" />
        </label>
      </section>

      <section className="overflow-hidden rounded-2xl border border-[var(--line)] bg-white shadow-sm">
        {visible.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--green-light)] text-[var(--teal)]"><FileText size={22} /></span>
            <h2 className="mt-4 font-bold text-[var(--navy)]">{items.length ? 'Tidak ada hasil yang cocok' : 'Belum ada sanggahan masuk'}</h2>
            <p className="mt-1 text-sm text-[var(--text)]">Sanggahan yang dikirim warga akan muncul di halaman ini.</p>
          </div>
        ) : (
          <div className="overflow-x-auto"><table className="w-full text-left text-sm">
            <thead className="bg-[var(--background)] text-xs font-bold uppercase tracking-wide text-[var(--text)]"><tr><th className="px-5 py-4">Jenis & lokasi</th><th className="px-5 py-4">Keterangan</th><th className="px-5 py-4">Tanggal</th><th className="px-5 py-4">Status</th><th className="px-5 py-4 text-right">Aksi</th></tr></thead>
            <tbody className="divide-y divide-[var(--line)]">{visible.map((item) => <tr key={item.id} className="hover:bg-[var(--background)]">
              <td className="px-5 py-4"><p className="font-bold text-[var(--navy)]">{item.category}</p><p className="mt-1 flex items-center gap-1 text-xs text-[var(--text)]"><MapPin size={13} />{item.address}</p></td>
              <td className="max-w-sm px-5 py-4 text-[var(--text)]"><p className="line-clamp-2">{item.description}</p>{item.evidenceFiles?.length > 0 && <span className="mt-1 inline-block text-xs text-[var(--teal)]">{item.evidenceFiles.length} lampiran</span>}</td>
              <td className="whitespace-nowrap px-5 py-4 text-xs text-[var(--text)]"><Clock3 size={13} className="mr-1 inline" />{new Date(item.submittedAt).toLocaleString('id-ID')}</td>
              <td className="px-5 py-4"><span className="rounded-full border border-[var(--line)] bg-[var(--green-light)] px-2.5 py-1 text-xs font-semibold text-[var(--teal)]">{item.status}</span></td>
              <td className="px-5 py-4 text-right"><button onClick={() => setSelected(item)} className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--line)] px-3 py-2 text-xs font-bold text-[var(--teal)] hover:border-[var(--teal)]"><Eye size={14} />Detail</button></td>
            </tr>)}</tbody>
          </table></div>
        )}
      </section>

      {selected && <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[var(--dark-teal)]/60 p-4" onClick={() => setSelected(null)}><article role="dialog" aria-modal="true" className="w-full max-w-2xl rounded-2xl bg-white shadow-xl" onClick={(event) => event.stopPropagation()}>
        <header className="flex items-start justify-between border-b border-[var(--line)] p-5"><div><p className="text-xs font-bold uppercase tracking-wide text-[var(--teal)]">Detail sanggahan</p><h2 className="mt-1 text-lg font-extrabold text-[var(--navy)]">{selected.category}</h2></div><button aria-label="Tutup" onClick={() => setSelected(null)} className="rounded-lg p-2 text-[var(--text)] hover:bg-[var(--background)]"><X size={18} /></button></header>
        <div className="space-y-4 p-5 text-sm"><div><p className="font-bold text-[var(--navy)]">Lokasi</p><p className="mt-1 text-[var(--text)]">{selected.address}</p></div><div><p className="font-bold text-[var(--navy)]">Keterangan</p><p className="mt-1 whitespace-pre-wrap leading-6 text-[var(--text)]">{selected.description}</p></div><div><p className="font-bold text-[var(--navy)]">Bukti pendukung</p><p className="mt-1 text-[var(--text)]">{selected.evidenceFiles?.length ? selected.evidenceFiles.join(', ') : 'Tidak ada lampiran'}</p></div><p className="text-xs text-[var(--muted)]">Dikirim {new Date(selected.submittedAt).toLocaleString('id-ID')}</p></div>
      </article></div>}
    </div>
  )
}
