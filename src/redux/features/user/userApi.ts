import { baseApi } from "@/redux/api/basApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.mutation({
      query: () => ({
        url: "/auth/login",
      }),
    }),
  }),
});

export const { useGetUserMutation } = userApi;
