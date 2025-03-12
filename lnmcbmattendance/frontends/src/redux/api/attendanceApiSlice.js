import { ATTENDANCE_URL } from "../constant";
import { apiSlice } from "./apiSlice";

export const attendanceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addAttendance: builder.mutation({
      query: (attendance) => ({
        url: `${ATTENDANCE_URL}/createAttendance`,
        method: "POST",
        body: attendance,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ["Attendance"],
    }),
    filterAttendance: builder.query({
      query: () => `${ATTENDANCE_URL}/filterAttendance`,
      providesTags: ["Attendance"],
    }),
  }),
});

export const { useAddAttendanceMutation, useFilterAttendanceQuery } =
  attendanceApiSlice;
