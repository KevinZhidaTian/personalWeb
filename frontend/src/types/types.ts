import { AxiosError, type AxiosResponse } from "axios";
export type BaseRequest<T, V> = (params?: T) => Promise<AxiosResponse<V>>;

export type SuccessResponse<V> = {
  code: "success";
  data: V;
};

export type ErrorResponse<E = AxiosError> = {
  code: "error";
  error: E;
};

export type BaseResponse<V, E> = Promise<SuccessResponse<V> | ErrorResponse<E>>;

export type Contact = {
  email: string;
  phone: string;
};

type ProjectDetail = {
  name?: string;
  role?: string;
  details: string[];
};
export type JobExperience = {
  start_month: string;
  start_year: string;
  is_present?: boolean;
  finish_month?: string;
  finish_year?: string;
  company: string;
  career_level: string;
  project: ProjectDetail[];
};

export type JobExperienceResponse = {
  career_level: string;
  company: string;
  experience_id: number;
  finish_month: null | string;
  finish_year: null | number;
  is_present: boolean;
  project_details: string[];
  project_id: number;
  project_name: null | string;
  project_role: null | string;
  start_month: string;
  start_year: number;
};

export type ImgData = {
  img: string;
  preview_img: string;
  title?: string;
};
