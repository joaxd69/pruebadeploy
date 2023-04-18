import React from 'react'

export default function Pagination  ({countriesPerPage, filtered, setCurrentPage, currentPage, })  {
    const pageNumbers = [] 
 
    for(let i=1; i<=Math.round(filtered/countriesPerPage); i++){
        pageNumbers.push(i)
        
}

const onPreviousPage = () => {
  if(currentPage >1){
    setCurrentPage(currentPage-1)
}}

const onNextPage = () =>{
  if(currentPage !== pageNumbers.length){

    setCurrentPage(currentPage + 1)
}
}


const onSpecificPage = (n) => {
  setCurrentPage(n) 
}
  return (
    
<nav className="pagination is-centered mb-6" 
    role="navigation" 
    aria-label="pagination">

  <a className={`pagination-previous ${currentPage===1? 'is-disabled' :'has-background-link'}`}onClick={onPreviousPage} >Previous</a>
  <a className={`pagination-next  ${currentPage >=pageNumbers.length? 'is-disabled' :'has-background-link' }`} onClick={onNextPage}>Next page</a>
  <ul className="pagination-list">

    
    {pageNumbers.map(noPage=>(                       
        <li key={noPage}>
        <a className={`pagination-link ${noPage===currentPage? 'is-current' :'has-background-light'}`}
        onClick={()=> onSpecificPage(noPage)}
        >
            {noPage}</a>    
        </li>

        ))
     }
  </ul>
</nav>
  )
}
