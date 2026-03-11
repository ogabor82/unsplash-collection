import { NavLink, Outlet } from 'react-router-dom';

const navBase = 'rounded-md px-3 py-2 text-sm font-medium transition-colors';

function MainLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-200 text-slate-900">
      <header className="border-b border-slate-300 bg-white/70 backdrop-blur-sm">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <h1 className="text-lg font-semibold">Unsplash Collections</h1>
          <nav className="flex gap-2">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                `${navBase} ${isActive ? 'bg-brand-600 text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/collections"
              className={({ isActive }) =>
                `${navBase} ${isActive ? 'bg-brand-600 text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`
              }
            >
              Collections
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
