import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import HttpError from '../service/httpError';

interface MutationResponse<T> {
  mutation: (data: T) => void;
  data?: T;
  loading: boolean;
  error?: string;
}

const useMutation = <T = any,>(url: string): MutationResponse<T> => {
  const [value, setValue] = useState({
    data: undefined,
    loading: false,
    error: '',
  });

  const mutation = async (data: T) => {
    try {
      setValue((prev) => ({ ...prev, loading: true }));
      const response = await (await axios.post(url, data)).data;
      setValue((prev) => ({ ...prev, data: response }));
    } catch (error) {
      const { response } = error as unknown as AxiosError;
      if (response) {
        const errorMessage = new HttpError(response.status, response.statusText).errorMessage;
        setValue((prev) => ({ ...prev, error: errorMessage }));
      } else {
        throw new Error('Unknown Error');
      }
    } finally {
      setValue((prev) => ({ ...prev, loading: false }));
    }
  };

  return {
    mutation,
    loading: value.loading,
    error: value.error,
    data: value.data,
  };
};
export default useMutation;
