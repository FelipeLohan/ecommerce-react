const CtaLoadMore = () => {
  return (
    <div className="flex justify-center my-2 mb-8">
      <button className="px-10 py-3 text-sm font-semibold text-primary-600 bg-transparent border-2 border-primary-600 rounded-full tracking-wide cursor-pointer transition-[background,color,box-shadow,transform] duration-[250ms] hover:bg-primary-600 hover:text-white hover:shadow-[0_4px_14px_rgba(52,131,250,0.35)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-none sm:w-auto w-4/5">
        Carregar mais
      </button>
    </div>
  );
};

export { CtaLoadMore };
