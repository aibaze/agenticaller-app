import { axiosInstanceCoachApi } from 'src/utils/axios';

export const createStudent = async (student) =>
  await axiosInstanceCoachApi.post('/student', student);

export const getCoachStudents = async (coachId, params) =>
  await axiosInstanceCoachApi.get(`/student/coach/${coachId}${params ? params : ''}`);

export const deleteStudent = async (studentId, coachId) =>
  await axiosInstanceCoachApi.delete(`/student/coach/${coachId}/student/${studentId}`);

export const editStudent = async (studentId, coachId, student) =>
  await axiosInstanceCoachApi.put(`/student/update/${studentId}/coach/${coachId}`, student);

export const updateStudentPaymentStatus = async (payload) =>
  await axiosInstanceCoachApi.put(`/student/update-payment-status`, payload);
