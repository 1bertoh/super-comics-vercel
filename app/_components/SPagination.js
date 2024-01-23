'use client'
import { ChevronLeftIcon, ChevronRightIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation';
import ReactPaginate from 'react-paginate';

/**
 * pagination:{Pagination}
 */
export const SPagination = (pagination) => {
    const {page, lastPage, path, filteredQueryFlat} = pagination
    const router = new useRouter()
    // let extraQuery = filteredQueryFlat.length ? `&${
    //                             filteredQueryFlat[0]
    //                         }=${filteredQueryFlat[1]}` : ''     
    // const path = "/all/manga/page/1"
    const pathList = path.split("/")
    const pageIndex = pathList.findIndex(e => e === "page")+1

    const getTheNewPath = (page) => {
        let newPathList = pathList
        newPathList[pageIndex] = page
        
        return newPathList.join("/")
    }
    
    
    return (
        <>
            <div className="pagination sm:block hidden ">
                <ReactPaginate
                    breakLabel={
                        <EllipsisHorizontalIcon className="h-100% w-5 flex-none light-gray2" />
                    }
                    initialPage={page - 1}
                    disabledClassName="pagination-item-disabled"
                    activeClassName="pagination-current"
                    pageClassName="pagination-item-active"
                    onPageChange={(e) => {
                        router.push(getTheNewPath(e.selected+1));
                    }}
                    pageRangeDisplayed={5}
                    marginPagesDisplayed={1}
                    pageCount={lastPage}
                    previousLabel={
                        <ChevronLeftIcon className="h-9 w-9 flex-none" />
                    }
                    nextLabel={
                        <ChevronRightIcon className="h-9 w-9 flex-none" />
                    }
                    renderOnZeroPageCount={null}
                />
            </div>
            <div className="pagination sm:hidden block">
                <ReactPaginate
                    breakLabel={
                        <EllipsisHorizontalIcon className="h-100% w-5 flex-none light-gray2" />
                    }
                    initialPage={page - 1}
                    disabledClassName="pagination-item-disabled"
                    activeClassName="pagination-current"
                    pageClassName="pagination-item-active"
                    onPageChange={(e) => {
                        router.push(getTheNewPath(e.selected+1));
                    }}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={1}
                    pageCount={lastPage}
                    previousLabel={
                        <ChevronLeftIcon className="h-9 w-9 flex-none" />
                    }
                    nextLabel={
                        <ChevronRightIcon className="h-9 w-9 flex-none" />
                    }
                    renderOnZeroPageCount={null}
                />
            </div>
        </>
    );
} 
