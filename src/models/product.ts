import { CategoryDTO } from "./category.ts";

export type ProductDTO = {
  id: number;
  name: string;
  description: string;
  price: number;
  imgUrl: string;
  isFeatured: boolean;
  categories?: CategoryDTO[];
};
