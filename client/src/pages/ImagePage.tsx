import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import Skeleton from '../components/ui/Skeleton';

type UnsplashPhotoDetails = {
  id: string;
  created_at?: string;
  alt_description?: string | null;
  description?: string | null;
  urls?: {
    regular?: string;
    full?: string;
  };
  user?: {
    name?: string;
    username?: string;
    profile_image?: {
      medium?: string;
    };
  };
  links?: {
    download?: string;
    html?: string;
  };
};

type ApiError = {
  message?: string | string[];
  error?: string;
  statusCode?: number;
};

type CollectionCard = {
  id: string;
  title: string;
  photoCount: number;
  coverUrl: string;
};

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000/api').replace(/\/$/, '');

const COLLECTIONS: CollectionCard[] = [
  {
    id: 'autumn-vibes',
    title: 'Autumn Vibes',
    photoCount: 23,
    coverUrl: 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'lake',
    title: 'Lake',
    photoCount: 12,
    coverUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'italy',
    title: 'Italy',
    photoCount: 2,
    coverUrl: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=300&q=80',
  },
];

function formatPublishDate(isoDate?: string) {
  if (!isoDate) {
    return 'Unknown publish date';
  }

  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) {
    return 'Unknown publish date';
  }

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function ImagePage() {
  const { id } = useParams<{ id: string }>();
  const imageId = id ?? '';
  const [photo, setPhoto] = useState<UnsplashPhotoDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedCollectionId, setSelectedCollectionId] = useState('lake');

  useEffect(() => {
    if (!imageId) {
      setErrorMessage('Image id is missing in URL.');
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();

    async function loadPhotoDetails() {
      setIsLoading(true);
      setErrorMessage('');

      try {
        const response = await fetch(`${API_BASE_URL}/unsplash/photos/${encodeURIComponent(imageId)}`, {
          signal: controller.signal,
        });

        const payload = (await response.json()) as UnsplashPhotoDetails | ApiError;

        if (!response.ok) {
          const apiError = payload as ApiError;
          const message =
            typeof apiError.message === 'string'
              ? apiError.message
              : Array.isArray(apiError.message)
                ? apiError.message.join(', ')
                : 'Failed to load image details.';
          throw new Error(message);
        }

        setPhoto(payload as UnsplashPhotoDetails);
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }

        setPhoto(null);
        setErrorMessage(error instanceof Error ? error.message : 'Failed to load image details.');
      } finally {
        setIsLoading(false);
      }
    }

    void loadPhotoDetails();

    return () => {
      controller.abort();
    };
  }, [imageId]);

  const mainImageUrl = photo?.urls?.regular ?? photo?.urls?.full;
  const imageAlt =
    photo?.alt_description?.trim() || photo?.description?.trim() || (photo?.id ? `Unsplash image ${photo.id}` : 'Image');
  const publishedDate = formatPublishDate(photo?.created_at);
  const authorName = photo?.user?.name?.trim() || 'Unknown photographer';
  const authorUsername = photo?.user?.username?.trim() || 'unknown';
  const authorAvatar = photo?.user?.profile_image?.medium;

  const downloadUrl = photo?.links?.download ?? photo?.urls?.full ?? photo?.urls?.regular;

  const selectedCollection = useMemo(
    () => COLLECTIONS.find((collection) => collection.id === selectedCollectionId),
    [selectedCollectionId],
  );

  return (
    <section className="py-8 md:py-12">
      {isLoading && (
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(340px,430px)] xl:grid-cols-[minmax(0,1fr)_minmax(360px,460px)]">
          <Skeleton className="h-[70vh] min-h-[420px] w-full rounded-md" />
          <div className="min-w-0 space-y-6">
            <div className="space-y-3">
              <Skeleton className="h-10 w-60" />
              <Skeleton className="h-5 w-48" />
            </div>
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-52 w-full" />
          </div>
        </div>
      )}

      {!isLoading && errorMessage && (
        <div className="rounded-md border border-rose-200 bg-rose-50 p-4 text-rose-700">{errorMessage}</div>
      )}

      {!isLoading && !errorMessage && photo && (
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(340px,430px)] xl:grid-cols-[minmax(0,1fr)_minmax(360px,460px)]">
          <div className="min-w-0 overflow-hidden rounded-md bg-slate-200">
            {mainImageUrl ? (
              <img src={mainImageUrl} alt={imageAlt} className="h-full min-h-[420px] w-full object-cover" />
            ) : (
              <Skeleton className="h-[70vh] min-h-[420px] w-full rounded-none" />
            )}
          </div>

          <div className="min-w-0 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                {authorAvatar ? (
                  <img src={authorAvatar} alt={authorName} className="h-11 w-11 rounded-full object-cover" />
                ) : (
                  <Skeleton className="h-11 w-11 rounded-full" />
                )}
                <div>
                  <p className="text-2xl font-semibold text-slate-900">{authorName}</p>
                  <p className="text-sm text-slate-500">@{authorUsername}</p>
                </div>
              </div>
              <p className="text-base text-slate-700">Published on {publishedDate}</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-slate-200 px-4 py-3 text-base font-semibold text-slate-800 transition-colors hover:bg-slate-300"
              >
                <span className="text-xl leading-none">+</span>
                Add to Collection
              </button>

              {downloadUrl ? (
                <a
                  href={downloadUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-slate-200 px-4 py-3 text-base font-semibold text-slate-800 transition-colors hover:bg-slate-300"
                >
                  <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                    <path d="M12 4V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M8 10L12 14L16 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M5 20H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  Download
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-slate-200 px-4 py-3 text-base font-semibold text-slate-500"
                >
                  Download
                </button>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="text-4xl font-semibold leading-tight text-slate-900 md:text-[2.1rem]">Collections</h3>
              <ul className="space-y-4">
                {COLLECTIONS.map((collection) => {
                  const isSelected = selectedCollection?.id === collection.id;

                  return (
                    <li
                      key={collection.id}
                      className={`flex items-center justify-between rounded-lg px-3 py-3 transition-colors ${
                        isSelected ? 'bg-slate-200' : 'bg-transparent hover:bg-slate-100'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setSelectedCollectionId(collection.id)}
                        className="flex min-w-0 items-center gap-4 text-left"
                      >
                        <img src={collection.coverUrl} alt={collection.title} className="h-16 w-16 rounded-md object-cover" />
                        <div className="min-w-0">
                          <p className="truncate text-3xl font-medium leading-tight text-slate-900 md:text-[1.95rem]">
                            {collection.title}
                          </p>
                          <p className="text-base text-slate-600">{collection.photoCount} photos</p>
                        </div>
                      </button>

                      {isSelected ? (
                        <button type="button" className="text-sm font-semibold text-slate-700 hover:text-slate-900">
                          Remove
                        </button>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </div>

            {photo.links?.html && (
              <p className="text-sm text-slate-500">
                View on Unsplash:{' '}
                <a href={photo.links.html} target="_blank" rel="noreferrer" className="underline hover:text-slate-700">
                  {photo.links.html}
                </a>
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default ImagePage;
