import React, { useState, useRef, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  quality?: number;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
  sizes?: string;
  priority?: boolean;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  quality = 80,
  placeholder,
  onLoad,
  onError,
  sizes,
  priority = false
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || loading === 'eager') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority, loading]);

  // Generate optimized image URLs for different formats
  const getOptimizedSrc = (originalSrc: string, format?: string) => {
    // In a real app, you'd integrate with image optimization services
    // like Cloudinary, Imagekit, or Next.js Image optimization
    if (format === 'webp') {
      return originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    }
    if (format === 'avif') {
      return originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.avif');
    }
    return originalSrc;
  };

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Create responsive image srcSet
  const createSrcSet = (baseSrc: string, format?: string) => {
    const optimizedSrc = getOptimizedSrc(baseSrc, format);
    if (!width) return optimizedSrc;
    
    const breakpoints = [480, 768, 1024, 1200, 1920];
    return breakpoints
      .filter(bp => bp <= width * 2) // Only include relevant breakpoints
      .map(bp => {
        const scale = bp / width;
        return `${optimizedSrc}?w=${bp}&q=${quality} ${scale}x`;
      })
      .join(', ');
  };

  // Placeholder component
  const PlaceholderDiv = () => (
    <div
      className={`${className} bg-gray-200 animate-pulse flex items-center justify-center`}
      style={{ width, height }}
      aria-label="Rasm yuklanmoqda"
    >
      <svg
        className="w-8 h-8 text-gray-400"
        fill="currentColor"
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );

  // Error fallback component
  const ErrorDiv = () => (
    <div
      className={`${className} bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center`}
      style={{ width, height }}
      aria-label="Rasm yuklanmadi"
    >
      <span className="text-gray-500 text-sm">Rasm yuklanmadi</span>
    </div>
  );

  if (hasError) {
    return <ErrorDiv />;
  }

  if (!isInView) {
    return (
      <div
        ref={imgRef}
        className={className}
        style={{ width, height }}
        aria-label={alt}
      >
        {placeholder ? (
          <img
            src={placeholder}
            alt=""
            className={`${className} blur-sm`}
            style={{ width, height }}
            aria-hidden="true"
          />
        ) : (
          <PlaceholderDiv />
        )}
      </div>
    );
  }

  return (
    <picture className={isLoaded ? '' : 'animate-pulse'}>
      {/* AVIF format for modern browsers */}
      <source
        srcSet={createSrcSet(src, 'avif')}
        type="image/avif"
        sizes={sizes}
      />
      
      {/* WebP format for broad support */}
      <source
        srcSet={createSrcSet(src, 'webp')}
        type="image/webp"
        sizes={sizes}
      />
      
      {/* Fallback to original format */}
      <img
        ref={imgRef}
        src={isInView ? src : placeholder}
        alt={alt}
        width={width}
        height={height}
        className={`${className} transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
        decoding="async"
        sizes={sizes}
        style={{
          aspectRatio: width && height ? `${width}/${height}` : undefined,
        }}
      />
    </picture>
  );
};

export default OptimizedImage;

// Hook for preloading critical images
export const useImagePreload = (imageUrls: string[]) => {
  useEffect(() => {
    imageUrls.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = url;
      document.head.appendChild(link);
    });
  }, [imageUrls]);
};

// Component for lazy loading background images
export const LazyBackgroundImage: React.FC<{
  src: string;
  children: React.ReactNode;
  className?: string;
  placeholder?: string;
}> = ({ src, children, className = '', placeholder }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          
          // Preload the image
          const img = new Image();
          img.onload = () => setIsLoaded(true);
          img.src = src;
          
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [src]);

  const backgroundStyle = isLoaded
    ? { backgroundImage: `url(${src})` }
    : placeholder
    ? { backgroundImage: `url(${placeholder})` }
    : {};

  return (
    <div
      ref={containerRef}
      className={`${className} ${isLoaded ? '' : 'animate-pulse'}`}
      style={{
        ...backgroundStyle,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        transition: 'background-image 0.3s ease-in-out'
      }}
    >
      {children}
    </div>
  );
};
