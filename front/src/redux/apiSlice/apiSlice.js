import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

console.log(`${process.env.REACT_APP_API_BASE_URL}/api`);
export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_API_BASE_URL}/api`
    }),
    tagTypes: [],
    endpoints: (builder) => ({})
})