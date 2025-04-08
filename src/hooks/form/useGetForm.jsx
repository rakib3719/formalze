import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import usePublicAxios from '../usePublicAxios';

const useGetForm = () => {
  const { data: sessionData } = useSession();
  const user_id = sessionData?.user?.id;
  const publicAxios = usePublicAxios();

  return useQuery({
    enabled: !!user_id,
    queryKey: ['getForms', user_id],
    queryFn: async () => {
      const response = await publicAxios.get(`form/list/?title=&created_by=${user_id}`);
      return response.data;
    },
  });
};

export default useGetForm;
