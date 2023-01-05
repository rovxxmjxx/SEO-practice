import React, { useState } from 'react'
import Carousal from 'nuka-carousel'
import Image from 'next/image'
import DetailSEO from '@/components/seo/detail'
import { useQuery } from 'react-query'
import { QueryKeys, fetcher } from '../../utils/queryClient'
import { useRouter } from 'next/router'
import { Attraction } from '@/data/types'

export default function AttractionDetailPage() {
  const [slideIndex, setSlideIndex] = useState(0)
  const {
    query: { id },
  } = useRouter()

  const { data } = useQuery([QueryKeys.ATTRACTIONS, id], () =>
    fetcher({ method: 'GET', path: `/api/attractions/${id}` })
  )

  if (!data) return

  const attraction = data.attraction

  return (
    <>
      <DetailSEO ogTitle={''} ogDescription={''} images={attraction.coverimage} />
      <div className="relative pt-3">
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className="flex ">
            <div className="flex-col space-y-2 mr-3 hidden sm:flex ">
              {[attraction.coverimage].map((image, index) => (
                <div
                  key={image}
                  className={`${index === slideIndex ? 'ring-2 ring-gray-900' : ''}`}
                >
                  <Image
                    key={image}
                    src={image}
                    alt={image}
                    width={200}
                    height={20}
                    onClick={() => setSlideIndex(index)}
                  />
                </div>
              ))}
            </div>
            <Carousal withoutControls={true} wrapAround slideIndex={slideIndex}>
              {[attraction.coverimage].map((image) => (
                <Image key={image} src={image} alt={image} width={600} height={50} />
              ))}
            </Carousal>
          </div>
          <div>설명</div>
        </div>
      </div>
    </>
  )
}
