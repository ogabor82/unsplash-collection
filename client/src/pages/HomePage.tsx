import { Link } from 'react-router-dom';
import { useCollectionStore } from '../store/useCollectionStore';

function HomePage() {
  const featuredCount = useCollectionStore((state) => state.featuredCount);
  const incrementFeatured = useCollectionStore((state) => state.incrementFeatured);

  return (
    <section className="space-y-6 rounded-xl border border-slate-300 bg-white p-6 shadow-sm">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Home</h2>
        <p className="text-slate-600">
          Dummy landing content for the client app. Use this page as the entry point for the frontend.
        </p>
      </div>

      <div className="rounded-lg bg-slate-100 p-4">
        <p className="text-sm text-slate-700">Featured collections (Zustand state):</p>
        <p className="mt-2 text-3xl font-semibold text-brand-700">{featuredCount}</p>
        <button
          type="button"
          onClick={incrementFeatured}
          className="mt-3 rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
        >
          Increase Featured Count
        </button>
      </div>

      <Link className="inline-block text-sm font-medium text-brand-700 hover:underline" to="/collections">
        Go to Collections
      </Link>
    </section>
  );
}

export default HomePage;
