import React, { useState, useEffect, useRef } from "react";

interface LazyImageProps {
  src: string;
  alt: string;
}

const LazyImage: React.FC<LazyImageProps> = ({ src, alt }: LazyImageProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: "0px 0px 100px 0px",
      }
    );

    const image = imgRef.current;

    if (image) {
      observer.observe(image);
    }

    return () => {
      if (image) {
        observer.unobserve(image);
      }
    };
  }, []);

  return (
    <img
      ref={imgRef}
      src={isVisible ? src : ""}
      alt={alt}
      style={{ maxHeight: "100px", backgroundColor: "#f0f0f0" }}
    />
  );
};

export default LazyImage;
