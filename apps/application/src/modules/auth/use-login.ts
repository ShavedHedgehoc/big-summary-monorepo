import { useMutation } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import handleError from '../../shared/api/http/handleError';
import AuthService from '../../shared/api/services/auth-service';
import { useAuthStore } from './store/auth-store';
import { useShallow } from 'zustand/react/shallow';

export function useLogin() {
  const setAuth = useAuthStore(useShallow((state) => state.setAuth));
  const setToken = useAuthStore(useShallow((state) => state.setToken));
  const setUser = useAuthStore(useShallow((state) => state.setUser));

  const {
    mutateAsync: login,
    isPending: isLoginPending,
    data: loginData,
    isSuccess: isLoginSuccess,
  } = useMutation({
    mutationFn: AuthService.login,
    onSuccess: (data) => {
      setToken(data.data.accessToken);
      setUser(data.data.user);
      setAuth(true);
    },
    onError: (err) => {
      if (err instanceof Error) {
        const error = handleError(err);
        enqueueSnackbar(Array.isArray(error) ? error.join(', ') : error, {
          variant: 'error',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
        });
      }
    },
  });
  return { login, isLoginPending, loginData, isLoginSuccess };
}
