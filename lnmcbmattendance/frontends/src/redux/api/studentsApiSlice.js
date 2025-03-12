import { STUDENT_URL } from "../constant";
import { apiSlice } from "./apiSlice";

export const studentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStudent: builder.query({
      query: () => `${STUDENT_URLL}/allStudents`,
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
} = studentsApiSlice;
