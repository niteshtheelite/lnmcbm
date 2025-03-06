import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URl, STUDENT_URL } from "./constant";

export const apliSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URl }),

  endpoints: (builder) => ({
    getStudent: builder.query({
      query: () => `${STUDENT_URL}/allStudents`,
      providesTags: ["Student"],
    }),
    getFilterStudent: builder.query({
      query: () => `${STUDENT_URL}/filterStudent`,
      providesTags: ["Student"],
    }),
    getSelectedStudent: builder.query({
      query: () => `${STUDENT_URL}/selectStudents`,
      providesTags: ["Student"],
    }),
    addStudent: builder.mutation({
      query: (student) => ({
        url: `${STUDENT_URL}/createStudent`,
        method: "POST",
        body: student,
      }),
      invalidatesTags: ["Student"],
    }),
    updateStudent: builder.mutation({
      query: ({ id, ...student }) => ({
        url: `${STUDENT_URL}/${id}`,
        method: "PUT",
        body: student,
      }),
      invalidatesTags: ["Student"],
    }),
    deleteStudent: builder.mutation({
      query: ({ id }) => ({
        url: `${STUDENT_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Student"],
    }),
  }),
});

export const {
  useGetStudentQuery,
  useGetFilterStudentQuery,
  useGetSelectedStudentQuery,
  useAddStudentMutation,
  useDeleteStudentMutation,
  useUpdateStudentMutation,
} = apliSlice;
