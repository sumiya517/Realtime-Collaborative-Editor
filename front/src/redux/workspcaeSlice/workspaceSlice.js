import { apiSlice } from "../apiSlice/apiSlice";


export const apiWorkspace = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWorkspaces: builder.query({
      query: () => ({
        url: "/workspace"
      }),
      providesTags: ["workspaces"]
    }),
    getWorkspaceById: builder.query({
      query: (id) => ({
        url: `/workspace/${id}`,
        method: "GET"
      }),
      providesTags: ["workspaces"]
    }),
    addWorkspace: builder.mutation({
      query: (workspace) => ({
        url: "/workspace",
        method: "POST",
        body: workspace
      }),
      invalidatesTags: ["workspaces"]
    }),
    updateWorkspace: builder.mutation({
      query: ({data,id}) => ({
        url: `/workspace/${id}`,
        method: "PUT",
        body:data
      }),
      invalidatesTags: ["workspaces"]
    }),
    deleteWorkspace: builder.mutation({
      query: (id) => ({
        url: `/workspace/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ["workspaces"]
    }),
  }),
});

export const { useGetWorkspacesQuery,useGetWorkspaceByIdQuery, useAddWorkspaceMutation, useUpdateWorkspaceMutation,useDeleteWorkspaceMutation} = apiWorkspace
