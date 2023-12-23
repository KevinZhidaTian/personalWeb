import { AxiosError, AxiosResponse } from "axios";

export type BaseRequest<T,V> = (params?: T) => Promise<AxiosResponse<V>>;

export type SuccessResponse<V> = {
    code: "success";
    data: V;
}

export type ErrorResponse<E = AxiosError> = {
    code: 'error';
    error: E;
}

export type BaseResponse<V, E> = Promise<SuccessResponse<V>|ErrorResponse<E>>;

export type Contact = {
    email: string;
    phone: string;
}