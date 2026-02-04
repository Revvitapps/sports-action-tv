import Image from "next/image";

export function BackgroundMedia() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-20">
      <Image
        src="/sat-hero-compilation.jpeg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="hero-background-image object-cover opacity-35"
      />
    </div>
  );
}
