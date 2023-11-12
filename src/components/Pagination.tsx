import { useEffect, useMemo, useState } from 'react'
import './Pagination.css'
import { arrayChunk } from '../utils/array'


type Page = {
  number: number | null
  label?: string
}

type Props<T> = {
  items: T[]
  pageSize: number
  onPageSet: (pageItems: T[]) => any
}

const Pagination = <T, >({ items, pageSize, onPageSet }: Props<T>) => {
  const [pageNumber, setPageNumber] = useState(1)

  const paginatedItems = useMemo(() => arrayChunk(items, pageSize), [items, pageSize])

  const pagesCount = paginatedItems.length

  const pages = useMemo(() => {
    const pages = [] as Page[]

    if (pagesCount < 2)
      return pages

    const addPage = (number: Page['number'], label?: Page['label']) => pages.push({ number, label })

    const addDotsPage = (prevNumber: number, nextNumber: number) =>
      addPage(Math.ceil((prevNumber + nextNumber) / 2), '...')

    addPage(pageNumber > 1 ? pageNumber - 1 : null, '<')

    if (pagesCount > 5) {
      addPage(1)

      if (pageNumber > 4)
        addDotsPage(1, pageNumber - 2)

      if (pageNumber > 3)
        addPage(pageNumber - 2)
      if (pageNumber > 2)
        addPage(pageNumber - 1)
      if (pageNumber > 1 && pageNumber < pagesCount)
        addPage(pageNumber)
      if (pageNumber < pagesCount - 1)
        addPage(pageNumber + 1)
      if (pageNumber < pagesCount - 2)
        addPage(pageNumber + 2)

      if (pageNumber < pagesCount - 4)
        addDotsPage(pageNumber + 2, pagesCount)

      addPage(pagesCount)
    } else
      for (let i = 1; i <= pagesCount; i++)
        addPage(i)

    addPage(pageNumber < pagesCount ? pageNumber + 1 : null, '>')

    return pages
  }, [pageNumber, pagesCount])

  useEffect(() => {
    setPageNumber(1)
  }, [items, pageSize])

  const index = pageNumber - 1

  useEffect(() => {
    onPageSet(paginatedItems[index] ?? [])
  }, [onPageSet, paginatedItems, index])

  const itemsOnPage = paginatedItems[index]?.length ?? 0

  return (
    <div className='pagination-container'>
      <div>
        Показано {itemsOnPage ? index * pageSize + 1 : 0} - {index * pageSize + itemsOnPage} из {items.length}
      </div>
      <div className='pagination'>
        {pages.map(({ number, label }) =>
          <button
            className={!label && number === pageNumber ? 'active' : ''}
            type='button'
            key={'' + label + number}
            onClick={() => setPageNumber(number as number)}
            title={'' + (number ?? '')}
            disabled={!number}
          >
            {label ?? '' + number}
          </button>,
        )}
      </div>
    </div>
  )
}

export default Pagination
