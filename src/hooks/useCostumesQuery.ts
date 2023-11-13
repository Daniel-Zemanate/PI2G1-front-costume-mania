// useCostumesQuery.ts

import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { ApiCostume } from "@/interfaces/costume";

const useCostumesQuery = (initialData?: ApiCostume[]) => {
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const { data, isRefetching, isLoading, isError, refetch } = useQuery({
    queryKey: ["costumes"],
    queryFn: async () => {
      const data = await axios.get(`/api/costumes?${searchParams.toString()}`);
      console.log(data);
      return data.data;
    },
    initialData: { data: initialData }, // Ensure the structure matches the expected data
  });

  return { data, isLoading, isError, isRefetching, refetch };
};

export default useCostumesQuery;
