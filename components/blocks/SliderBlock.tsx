"use client";

import { useEffect, useState } from "react";
import type { SliderBlock as SliderBlockType } from "@/lib/content/blocks";

export default function SliderBlock({ block }: { block: SliderBlockType }) {
  const { images, autoplay, intervalMs } = block.props;
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!autoplay || images.length < 2) return;
    const t = setInterval(() => {
      setI((v) => (v + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(t);
  }, [autoplay, intervalMs, images.length]);

  if (images.length === 0) return null;

  return (
    <div className="container-px py-8">
      <div className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-2xl border border-ink-line bg-paper-raised">
          <div className="relative aspect-[16/9]">
            {images.map((img, idx) => (
              <div
                key={`${img.src}-${idx}`}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  idx === i ? "opacity-100" : "opacity-0"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {images.length > 1 && (
          <div className="mt-4 flex items-center justify-center gap-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setI(idx)}
                aria-label={`Slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all ${
                  idx === i ? "w-8 bg-copper" : "w-2 bg-ink-line"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
