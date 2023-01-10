import { QueryClient } from 'react-query'

type AnyOBJ = {
  [key: string]: any
}

export const getClient = (() => {
  let client: QueryClient | null = null

  return () => {
    if (!client)
      client = new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity,
            cacheTime: Infinity,
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
          },
        },
      })
    return client
  }
})()

const BASE_URL = 'https://www.mecallapi.com'

export const fetcher = async ({
  method,
  path,
  body,
  params,
  headers,
}: {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  path: string
  body?: AnyOBJ
  params?: AnyOBJ
  headers?: AnyOBJ
}) => {
  let url = `${BASE_URL}${path}`

  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': BASE_URL,
      ...headers,
    },
  }

  if (body) options.body = JSON.stringify(body)

  if (params) {
    const searchParams = new URLSearchParams(params)
    url += '?' + searchParams.toString()
  }

  try {
    const res = await fetch(url, options)
    const json = await res.json()

    return json
  } catch (error) {
    console.error(error)
  }
}

export const QueryKeys = {
  ATTRACTIONS: 'ATTRACTIONS',
  AUTH: 'AUTH',
}