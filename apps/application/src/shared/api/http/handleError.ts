import axios from 'axios';
import { httpErrors } from './httpErrors';

interface ApiErrorResponse {
  message?: string;
}

const handleError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;

    if (status === 500 || status === 504) {
      return httpErrors.API_ERROR;
    }

    const data = error.response?.data as ApiErrorResponse | undefined;
    return data?.message ?? httpErrors.UNKNOWN_ERROR;
  }

  return httpErrors.UNRESOLVED_ERROR;
};

export default handleError;
