import React from 'react'
import Link from 'next/link'
import PageSEO from '@/components/SEO/PageSEO'
import siteMetaData from '@/data/siteMetaData'
import * as S from './styles'

export default function NotAllowed() {
  return (
    <>
      <PageSEO ogTitle={`401(Not-allowed) - ${siteMetaData.title}`} />
      <S.Container>
        <S.Inner>
          <S.Status>401</S.Status>
          <S.Message>Looks like not allowed</S.Message>
          <Link href="/login">
            <S.Button>Go to Login</S.Button>
          </Link>
        </S.Inner>
      </S.Container>
    </>
  )
}
