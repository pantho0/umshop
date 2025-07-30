import nexiosInstance from "@/app/config/nexios.config";
import ContainerLayout from "../../_components/layouts/ContainerLayout";
import ProductDetailsPage from "../../_components/pages/productDetails/ProductDetailsPage";
import { ApiResponse, IProductResult } from "@/interface";

type ProductPageProps = {
  params: { productId: string };
};

export async function generateMetadata({ params }: ProductPageProps) {
  const { productId } = params;
  try {
    const res = await nexiosInstance.get<ApiResponse<IProductResult>>(
      `/products/${productId}`,
      {
        cache: "no-store",
      }
    );
    const product = res.data.data;

    return {
      title: `UmShop | ${product?.title || "Product Details"}`,
      description: product?.details || "UmShop || Your trusted online store",
    };
  } catch (error) {
    console.log("Failed to fetch product metadata", error);
    return {
      title: "UmShop || Product Details",
      description: "UmShop || Your trusted online store",
    };
  }
}

// Dynamic page function with correct props shape
const ProductPage = async ({ params }: ProductPageProps) => {
  const { productId } = params;

  const res = await nexiosInstance.get<ApiResponse<IProductResult>>(
    `/products/${productId}`,
    {
      cache: "no-store",
    }
  );
  const product = res.data.data;

  return (
    <ContainerLayout>
      <ProductDetailsPage product={product!} />
    </ContainerLayout>
  );
};

export default ProductPage;
