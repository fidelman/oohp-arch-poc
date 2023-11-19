import Axios, {
  AxiosError,
  CreateAxiosDefaults,
  AxiosRequestConfig,
} from "axios";

export const BASE_URL = "https://frontend-test-be.stage.thinkeasy.cz";

export interface ErrorResponse {
  error: string;
  message: string[];
  statusCode: number;
}

export interface ResponseDTO<T> {
  data: T | null;
  error: ErrorResponse | null;
}

const DEFAULT_ERROR: ErrorResponse = {
  error: "Unknown error",
  message: ["Unknown error"],
  statusCode: 500,
};

export type ErrorType<Error> = AxiosError<Error>;

export type BodyType<BodyData> = BodyData;

const getAxiosInstance = () => {
  const config: CreateAxiosDefaults = {
    baseURL: BASE_URL,
  };

  return Axios.create(config);
};

export const clientInstance = <T>(config: AxiosRequestConfig) => {
  const axiosInstance = getAxiosInstance();

  const instance = <T>(config: AxiosRequestConfig): Promise<ResponseDTO<T>> => {
    const source = Axios.CancelToken.source();
    const promise = axiosInstance({
      ...config,
      cancelToken: source.token,
    })
      .then(({ data }: { data: T }) => {
        return { data, error: null };
      })
      .catch(({ response }: AxiosError<ErrorResponse>) => {
        return {
          data: null,
          error: response ? response.data : DEFAULT_ERROR,
        };
      });

    // @ts-ignore
    promise.cancel = () => {
      source.cancel("Query was cancelled");
    };

    return promise;
  };
  return instance<T>(config);
};
