import { useState, useCallback } from 'react';
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
        // If fallback loads, retry showing it
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

      <img
        src={src}
        alt={alt}
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
    </div>
  );
}
