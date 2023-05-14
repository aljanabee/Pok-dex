import React from 'react'

export default function Pagination({gotoNextPage, gotoPrevPage}) {
  return (
    <div>
      {gotoPrevPage && <button onClick={gotoPrevPage}>prev</button>}
      {gotoNextPage && <button onClick={gotoNextPage}>next</button>}
    </div>
  )
}
