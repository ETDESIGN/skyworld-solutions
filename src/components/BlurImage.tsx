import { useState, useCallback, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { handleImgError } from '@/utils/handleImgError';

interface BlurImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  fallback?: string;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
  onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
  style?: React.CSSProperties;
  /** Responsive srcSet for different viewport sizes (e.g., "photo-640.jpg 640w, photo-1024.jpg 1024w") */
  srcSet?: string;
  /** Sizes attribute for responsive images (e.g., "(max-width: 768px) 100vw, 50vw") */
  sizes?: string;
  /** Explicit intrinsic width for CLS prevention */
  width?: number;
  /** Explicit intrinsic height for CLS prevention */
  height?: number;
}

/** Derive a WebP URL by replacing .jpg/.jpeg/.png extension with .webp */
function toWebp(url: string): string {
  return url.replace(/\.(jpe?g|png)(\?.*)?$/i, '.webp$2');
}

/** Derive an Unsplash URL with WebP format (they support fm=webp) */
function toUnsplashWebp(url: string): string {
  if (!url.includes('images.unsplash.com')) return '';
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}fm=webp`;
}

/** Generate responsive srcSet for Unsplash images at different widths */
function getUnsplashSrcSet(url: string, widths: number[]): string {
  if (!url.includes('images.unsplash.com')) return '';
  const base = url.split('?')[0];
  const params = new URLSearchParams(url.split('?')[1] || '');
  return widths
    .map((w) => {
      params.set('w', String(w));
      return `${base}?${params.toString()} ${w}w`;
    })
    .join(', ');
}

export default function BlurImage({
  src,
  alt,
  className,
  containerClassName,
  fallback,
  loading = 'lazy',
  fetchPriority,
  onError,
  style,
  srcSet,
  sizes,
  width,
  height,
}: BlurImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleError = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      setHasError(true);
      if (fallback) {
        handleImgError(e, fallback);
        const img = e.currentTarget;
        const retryLoad = () => {
          setIsLoaded(true);
          setHasError(false);
        };
        img.addEventListener('load', retryLoad, { once: true });
      }
      onError?.(e);
    },
    [fallback, onError],
  );

  // Determine WebP source URLs (browser auto-falls back to <img> src if WebP fails)
  const webpSrc = useMemo(() => {
    const unsplashWebp = toUnsplashWebp(src);
    if (unsplashWebp) return unsplashWebp;
    return toWebp(src);
  }, [src]);

  // Get fallback WebP source
  const fallbackWebpSrc = useMemo(() => {
    if (!fallback) return '';
    const unsplashWebp = toUnsplashWebp(fallback);
    if (unsplashWebp) return unsplashWebp;
    return toWebp(fallback);
  }, [fallback]);

  // Unsplash responsive srcSet for the primary image
  const autoUnsplashSrcSet = useMemo(() => {
    if (srcSet) return srcSet; // explicit srcSet takes priority
    if (!src.includes('images.unsplash.com')) return '';
    return getUnsplashSrcSet(src, [640, 1024, 1440, 1920]);
  }, [src, srcSet]);

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-slate-200 dark:bg-slate-800',
        !isLoaded && !hasError && 'animate-pulse',
        containerClassName,
      )}
    >
      {/* Skeleton shimmer effect */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent" />
      )}

      <picture>
        {webpSrc && (
          <source
            srcSet={webpSrc}
            type="image/webp"
          />
        )}
        {fallbackWebpSrc && (
          <source
            srcSet={fallbackWebpSrc}
            type="image/webp"
          />
        )}

        <img
          src={src}
          alt={alt}
          srcSet={autoUnsplashSrcSet || srcSet}
          sizes={sizes}
          width={width}
          height={height}
          loading={loading}
          fetchPriority={fetchPriority}
          onLoad={handleLoad}
          onError={handleError}
          style={style}
          className={cn(
            'transition-opacity duration-500',
            isLoaded ? 'opacity-100' : 'opacity-0',
            hasError && !fallback ? 'hidden' : '',
            className,
          )}
        />
      </picture>
    </div>
  );
}
