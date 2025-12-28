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

type projectDetail = {
  String: {
    role: string;
    details: string[];
  };
};

export type JobExperience = {
  startMonth: string;
  startYear: string;
  isPresent?: boolean;
  finishMonth?: string;
  finishYear?: string;
  company: string;
  careerLevel: string;
  project: {
    [projectName: string]: {
      role?: string;
      details?: string[];
    };
  };
};

export type ImgData = {
  img: string;
  previewImg: string;
  title?: string;
};
