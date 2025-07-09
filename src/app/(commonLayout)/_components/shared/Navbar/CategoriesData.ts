import { IParentCategory, ISubCategory } from "@/interface";
import { getParentCategories, getSubCategories } from "@/services/product";

interface SubItemSection {
  title: string;
  items: string[];
}

interface PromoData {
  title: string;
  product: string;
  image: string;
  buttonText: string;
}

export interface CategoryData {
  id: string;
  name: string;
  icon: string;
  subItems: SubItemSection[];
  promo: PromoData;
}

export interface MegaMenuFetchedCategory extends IParentCategory {
  subCategories: ISubCategory[];
}

export const createLink = async () => {
  try {
    const parentCategoriesData = await getParentCategories();
    const parentCategories: IParentCategory[] = parentCategoriesData.data;

    const subCategoriesData = await getSubCategories();
    const subCategories: ISubCategory[] = subCategoriesData.data;

    const categoriesWithSub: MegaMenuFetchedCategory[] = parentCategories.map(
      (parentCat) => {
        const subCatsForParent = subCategories.filter(
          (sub) => sub.parentCategory.toString() === parentCat._id.toString()
        );
        return {
          ...parentCat,
          subCategories: subCatsForParent,
        };
      }
    );

    return { categories: categoriesWithSub };
  } catch (error) {
    console.error("Error in createLink:", error);
    return { categories: [] };
  }
};
