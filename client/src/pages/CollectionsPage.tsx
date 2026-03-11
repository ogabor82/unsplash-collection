import { useCollectionStore } from '../store/useCollectionStore';

function CollectionsPage() {
  const drafts = useCollectionStore((state) => state.draftCollections);

  return (
    <section className="space-y-6 rounded-xl border border-slate-300 bg-white p-6 shadow-sm">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Collections</h2>
        <p className="text-slate-600">Dummy collection listing content for the second route.</p>
      </div>

      <ul className="space-y-2">
        {drafts.map((item) => (
          <li key={item} className="rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default CollectionsPage;
