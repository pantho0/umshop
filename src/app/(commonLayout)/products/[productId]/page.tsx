import nexiosInstance from "@/app/config/nexios.config";
import ContainerLayout from "../../_components/layouts/ContainerLayout";
import ProductDetailsPage from "../../_components/pages/productDetails/ProductDetailsPage";
import { ApiResponse, IProductResult } from "@/interface";

type Params = Promise<{ productId: string }>;

// Dynamic page function with correct props shape
const ProductPage = async ({ params }: { params: Params }) => {
  const { productId } = await params;

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
