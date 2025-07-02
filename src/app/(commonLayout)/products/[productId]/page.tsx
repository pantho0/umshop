import nexiosInstance from "@/app/config/nexios.config";
import ContainerLayout from "../../_components/layouts/ContainerLayout";
import ProductDetailsPage from "../../_components/pages/productDetails/ProductDetailsPage";
import { Product } from "@/interface";

interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

interface Props {
  params: {
    productId: string;
  };
}

const ProductPage = async ({ params }: Props) => {
  const { productId } = await params;
  const response = await nexiosInstance.get<ApiResponse<{ data: Product }>>(
    `/products/${productId}`,
    {
      cache: "no-store",
    }
  );
  const product = response.data.data;
  console.log(product);

  return (
    <ContainerLayout>
      <ProductDetailsPage product={product} />
    </ContainerLayout>
  );
};

export default ProductPage;
