import React, { useState, useEffect } from 'react'
import PageSEO from '@/components/seo/page'
import siteMetaData from '../../data/siteMetaData'
import { useQuery } from 'react-query'
import { QueryKeys, fetcher } from '../api/queryClient'
import { AttractionList } from '@/data/types'
import Loading from '@/components/Loading'
import { useRouter } from 'next/router'
import NotFound from 'pages/404'
import useIsAuthed from '../../hooks/useIsAuthed'
import NotAllowed from 'pages/401'
import OverviewLayout from '@/layouts/OverviewLayout'

const DEFAULT_LAYOUT = 'OverviewLayout'

export default function AttractionsOverViewPage() {
  const {
    query: { page: queryPage, per_page: queryPerPage },
    push,
  } = useRouter()
  const isAuthed = useIsAuthed()
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const { data, isLoading } = useQuery<AttractionList>(
    [QueryKeys.ATTRACTIONS, page, perPage],
    () =>
      fetcher({
        method: 'GET',
        path: '/api/attractions',
        params: { page, per_page: perPage },
      }),
    { keepPreviousData: true }
  )

  const onChangePage = (value: number) => {
    setPage(value)
    push(`/attractions?page=${value}&per_page=${perPage}`)
  }

  const pagination = {
    page,
    totalPages: Number(data?.total_pages),
    onChangePage,
  }

  useEffect(() => {
    if (queryPage) {
      setPage(Number(queryPage))
    }

    if (queryPerPage) {
      setPerPage(Number(queryPerPage) || 10)
    }
  }, [queryPage, queryPerPage])

  useEffect(() => {
    if (!isAuthed) push('/login')
  }, [isAuthed, push])

  if (isLoading) return <Loading />
  if (!data) return
  if (Number(queryPage) < 1 || Number(queryPage) > Number(data?.total_pages)) {
    return <NotFound />
  }

  return (
    <>
      <PageSEO
        ogTitle={`Overview | ${siteMetaData.title}`}
        ogDescription={siteMetaData.description}
      />
      <OverviewLayout title="overview" overview={data} pagination={pagination} />
    </>
  )
}
