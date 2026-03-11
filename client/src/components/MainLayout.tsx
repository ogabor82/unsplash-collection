import { NavLink, Outlet } from 'react-router-dom';

const navBase = 'rounded-md px-5 py-2 text-sm font-medium transition-colors';

function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="border-b border-slate-300/80 bg-slate-100">
        <div className="mx-auto flex h-16 w-full max-w-[1240px] items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-3">
            <svg aria-hidden="true" className="h-6 w-6 text-slate-900" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L20.5 7V17L12 22L3.5 17V7L12 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path d="M12 11.5L20.5 7" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
              <path d="M12 11.5L3.5 7" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
              <path d="M12 22V11.5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            </svg>
            <h1 className="text-xl font-semibold">UnsplashBox</h1>
          </div>
          <nav className="flex gap-2">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                `${navBase} ${isActive ? 'bg-slate-200 text-slate-900' : 'text-slate-500 hover:bg-slate-200 hover:text-slate-900'}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/collections"
              className={({ isActive }) =>
                `${navBase} ${isActive ? 'bg-slate-200 text-slate-900' : 'text-slate-500 hover:bg-slate-200 hover:text-slate-900'}`
              }
            >
              Collections
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1240px] px-4 md:px-8">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
