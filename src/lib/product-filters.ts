export const slugifyString = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
};

export const getFilterOptions = (
  parentCategories: any,
  subCategories: any
): any => {
  const processedCategories: any[] = parentCategories
    .map((parentCat: any) => {
      const subCatsForParent = subCategories
        ?.filter(
          (sub: any) =>
            sub.parentCategory.toString() === parentCat._id.toString()
        )
        .map((sub: any) => ({
          ...sub,
          count: (sub as any).count || 0,
        }))
        .sort((a: any, b: any) => a.name?.localeCompare(b.name));

      return {
        ...parentCat,

        count: (parentCat as any).count || 0,
        subCategories: subCatsForParent,
      };
    })
    .sort((a: any, b: any) => a.name?.localeCompare(b.name)); // Sort parent categories by name
  return {
    categories: processedCategories,
  };
};
