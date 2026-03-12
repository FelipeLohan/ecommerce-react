export function HeroBanner() {
  return (
    <section
      className="relative w-full overflow-hidden flex flex-col items-center text-center gap-3 py-12 px-10 md:py-10 md:px-6"
      style={{
        background:
          "linear-gradient(135deg, var(--color-primary-700) 0%, var(--color-primary-500) 60%, var(--color-primary-400) 100%)",
      }}
    >
      {/* radial light overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 70% 50%, rgba(255,255,255,0.08) 0%, transparent 60%)",
        }}
      />

      <h1 className="relative text-4xl md:text-3xl sm:text-2xl font-bold text-white leading-tight tracking-[-0.02em] m-0">
        Encontre o produto perfeito
      </h1>
      <p className="relative text-lg sm:text-base text-primary-100 m-0 max-w-[500px] leading-relaxed">
        Explore nossa seleção com os melhores preços e as melhores marcas do mercado.
      </p>
    </section>
  );
}
