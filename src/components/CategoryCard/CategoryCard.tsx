type Props = {
  name: string;
};

const CategoryCard = ({ name }: Props) => {
  return (
    <span className="inline-block px-2.5 py-0.5 bg-neutral-100 text-neutral-600 text-xs font-medium rounded-full whitespace-nowrap">
      {name}
    </span>
  );
};

export { CategoryCard };
