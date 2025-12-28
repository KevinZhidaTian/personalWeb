import { AxiosError } from "axios";
import type { BaseRequest, BaseResponse } from "../types/types.ts";

export const requestHandler =
  <T, V, E = AxiosError>(request: BaseRequest<T, V>) =>
  async (params?: T): Promise<BaseResponse<V, E>> => {
    try {
      const response = await request(params);
      return { code: "success", data: response.data };
    } catch (e) {
      return { code: "error", error: e as E };
    }
  };
