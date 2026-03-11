import { useState, type CSSProperties, type FormEvent } from 'react';
import Skeleton from '../components/ui/Skeleton';

type PositionedBox = {
  top: string;
  left?: string;
  right?: string;
};

type DummyImage = PositionedBox & {
  src: string;
  alt: string;
};

type ResultCard = {
  src?: string;
  alt?: string;
  rows: number;
  tint?: string;
};

const leftDecorations: PositionedBox[] = [
  { top: '10%', left: '-8%' },
  { top: '10%', left: '6%' },
  { top: '22%', left: '1%' },
  { top: '30%', left: '-8%' },
  { top: '30%', left: '1%' },
  { top: '42%', left: '-8%' },
  { top: '42%', left: '6%' },
  { top: '54%', left: '1%' },
  { top: '54%', left: '12%' },
  { top: '66%', left: '-8%' },
  { top: '66%', left: '6%' },
  { top: '78%', left: '1%' },
];

const rightDecorations: PositionedBox[] = [
  { top: '10%', right: '6%' },
  { top: '10%', right: '-8%' },
  { top: '22%', right: '1%' },
  { top: '30%', right: '12%' },
  { top: '30%', right: '1%' },
  { top: '42%', right: '6%' },
  { top: '42%', right: '-8%' },
  { top: '54%', right: '1%' },
  { top: '54%', right: '12%' },
  { top: '66%', right: '6%' },
  { top: '66%', right: '1%' },
  { top: '78%', right: '12%' },
];

const sideDummyImages: DummyImage[] = [
  {
    src: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=180&q=80',
    alt: 'Canyon lake',
    top: '18%',
    left: '10%',
  },
  {
    src: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=180&q=80',
    alt: 'White and blue buildings',
    top: '15%',
    right: '11%',
  },
  {
    src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=180&q=80',
    alt: 'Tech work station',
    top: '58%',
    left: '5%',
  },
  {
    src: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=180&q=80',
    alt: 'Snowy mountain',
    top: '50%',
    right: '18%',
  },
  {
    src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=180&q=80',
    alt: 'Mountain ridge',
    top: '66%',
    right: '8%',
  },
  {
    src: 'https://images.unsplash.com/photo-1614851099511-773084f6911d?auto=format&fit=crop&w=180&q=80',
    alt: 'Abstract dark pattern',
    top: '80%',
    left: '14%',
  },
];

const resultCards: ResultCard[] = [
  {
    src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80',
    alt: 'Misty pine forest',
    rows: 4,
  },
  {
    src: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=80',
    alt: 'Tree canopy from below',
    rows: 4,
  },
  {
    src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
    alt: 'Ocean wave',
    rows: 4,
  },
  {
    src: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=900&q=80',
    alt: 'Small plant in forest',
    rows: 2,
  },
  {
    tint: '#e9e0ea',
    rows: 3,
  },
  {
    src: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=80',
    alt: 'Aerial forest',
    rows: 3,
  },
  {
    src: 'https://images.unsplash.com/photo-1459666644539-a9755287d6b0?auto=format&fit=crop&w=900&q=80',
    alt: 'Blue floral texture',
    rows: 3,
  },
  {
    src: 'https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?auto=format&fit=crop&w=900&q=80',
    alt: 'Forest path',
    rows: 4,
  },
];

function HomePage() {
  const [query, setQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = query.trim();

    if (!trimmed) {
      setShowResults(false);
      setSubmittedQuery('');
      return;
    }

    setShowResults(true);
    setSubmittedQuery(trimmed);
  };

  return (
    <section className="relative isolate min-h-[calc(100vh-65px)] overflow-hidden pb-10">
      {!showResults ? (
        <>
          <div aria-hidden="true" className="absolute inset-0 -z-10 hidden md:block">
            {leftDecorations.map((box, index) => (
              <Skeleton
                key={`left-${index}`}
                className="absolute h-16 w-16 rounded-md"
                style={box as CSSProperties}
              />
            ))}

            {rightDecorations.map((box, index) => (
              <Skeleton
                key={`right-${index}`}
                className="absolute h-16 w-16 rounded-md"
                style={box as CSSProperties}
              />
            ))}

            {sideDummyImages.map((image, index) => (
              <img
                key={image.alt}
                src={image.src}
                alt={image.alt}
                className={`absolute h-16 w-16 rounded-md object-cover shadow-lg ${
                  index % 2 === 0 ? 'rotate-1' : '-rotate-1'
                }`}
                style={image as CSSProperties}
              />
            ))}
          </div>

          <div className="mx-auto flex max-w-2xl flex-col items-center px-4 pt-12 text-center md:pt-28">
            <h2 className="text-5xl font-bold tracking-tight text-slate-900">Search</h2>
            <p className="mt-3 text-2xl text-slate-700 md:text-3xl">Search high-resolution images from Unsplash</p>
            <form onSubmit={handleSubmit} className="relative mt-8 w-full">
              <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Enter your keywords..."
                className="h-14 w-full rounded-xl border border-slate-300 bg-white px-5 pr-14 text-lg text-slate-700 outline-none placeholder:text-slate-400"
              />
              <svg
                aria-hidden="true"
                className="pointer-events-none absolute right-5 top-1/2 h-6 w-6 -translate-y-1/2 text-slate-300"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                <path d="M20 20L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </form>
          </div>
        </>
      ) : (
        <>
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-0 -z-10 h-36 bg-gradient-to-r from-amber-300 via-pink-400 to-fuchsia-700"
          />

          <div className="mx-auto w-full max-w-[1140px] px-4">
            <form onSubmit={handleSubmit} className="mx-auto max-w-2xl pt-12">
              <div className="relative">
                <input
                  type="text"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Enter your keywords..."
                  className="h-14 w-full rounded-xl border border-slate-300 bg-slate-100 px-5 pr-14 text-lg text-slate-800 outline-none"
                />
                <svg
                  aria-hidden="true"
                  className="pointer-events-none absolute right-5 top-1/2 h-6 w-6 -translate-y-1/2 text-slate-300"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                  <path d="M20 20L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </form>

            <div className="pt-8 mt-6 grid auto-rows-[90px] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {resultCards.map((card, index) => (
                <div
                  key={`${card.alt ?? 'placeholder'}-${index}`}
                  className="overflow-hidden rounded-md bg-slate-200"
                  style={{
                    gridRow: `span ${card.rows} / span ${card.rows}`,
                    backgroundColor: card.tint ?? undefined,
                  }}
                >
                  {card.src ? (
                    <img src={card.src} alt={card.alt} className="h-full w-full object-cover" />
                  ) : (
                    <Skeleton className="h-full w-full rounded-none" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default HomePage;
