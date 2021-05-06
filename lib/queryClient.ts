import { MutableRefObject, useRef } from "react"
import { QueryClient, QueryFunction } from "react-query"
import axios from "axios"
import { DefaultOptions } from "react-query/types/core/types"

export const optionsQueryClientConfig: DefaultOptions = {}

const defaultQueryFn: QueryFunction = async ({ queryKey }) => {
  const { data } = await axios.get(
    `${queryKey.length ? queryKey[0] : queryKey}`
  )
  return data
}
export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      ...optionsQueryClientConfig,
      queries: {
        ...optionsQueryClientConfig.queries,
        queryFn: defaultQueryFn,
        refetchOnWindowFocus: false,
      },
    },
  })

export const useQueryClientRef = () => {
  const queryClientRef = useRef() as MutableRefObject<QueryClient>
  if (!queryClientRef.current) {
    queryClientRef.current = createQueryClient()
  }
  return queryClientRef
}
