function App() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--background)] px-6">
      <section className="w-full max-w-xl rounded-2xl border border-[var(--line)] bg-white p-10 text-center shadow-[var(--shadow)]">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--dark-teal)] text-xl font-extrabold text-white">
          BW
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-[var(--navy)]">
          BantuWarga
        </h1>

        <p className="mt-3 text-sm leading-6 text-[var(--text)]">
          Portal Transparansi Bantuan Sosial
        </p>

        <div className="mx-auto mt-7 h-1 w-16 rounded-full bg-[var(--green)]" />
      </section>
    </main>
  )
}

export default App