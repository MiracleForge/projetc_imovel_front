export default function RegionEmptyState() {
  return <section className="max-w-6xl mx-auto px-6 py-16">
    <div className="rounded-2xl bg-gray-100">
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold mb-2">Nenhum anúncio na sua região ainda</h3>
        <p className="text-gray-600 mb-6">
          Seja o primeiro a publicar e ganhe mais visibilidade.
        </p>
        <button className="rounded-2xl bg-secundary-blue p-3">
          Publicar primeiro anúncio
        </button>
      </div>
    </div>
  </section>

}
