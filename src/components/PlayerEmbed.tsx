type PlayerEmbedProps = {
  title: string;
  src: string;
};

export function PlayerEmbed({ title, src }: PlayerEmbedProps) {
  return (
    <div className="relative mt-6 w-full overflow-hidden rounded-3xl border border-white/10 bg-black/60" style={{ paddingBottom: "56.25%" }}>
      <iframe
        title={title}
        src={src}
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        frameBorder="0"
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}
