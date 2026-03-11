import type { CSSProperties } from 'react';
import Skeleton from '../components/ui/Skeleton';

function HomePage() {
  const leftDecorations = [
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

  const rightDecorations = [
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

  const dummyImages = [
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

  return (
    <section className="relative isolate min-h-[calc(100vh-65px)] overflow-hidden py-12 md:py-20">
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

        {dummyImages.map((image, index) => (
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

      <div className="mx-auto flex max-w-2xl flex-col items-center px-4 text-center md:pt-20">
        <h2 className="text-5xl font-bold tracking-tight text-slate-900">Search</h2>
        <p className="mt-3 text-2xl text-slate-700 md:text-3xl">Search high-resolution images from Unsplash</p>
        <div className="relative mt-8 w-full">
          <input
            type="text"
            placeholder="Enter your keywords..."
            disabled
            className="h-14 w-full rounded-xl border border-slate-300 bg-white px-5 pr-14 text-lg text-slate-500 outline-none"
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
      </div>
    </section>
  );
}

export default HomePage;
