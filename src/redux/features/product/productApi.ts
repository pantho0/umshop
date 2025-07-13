import { baseApi } from "@/redux/api/basApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (productData) => ({
        url: "/products/create-product",
        method: "POST",
        body: productData,
      }),
    }),
  }),
});

export const { useAddProductMutation } = productApi;
