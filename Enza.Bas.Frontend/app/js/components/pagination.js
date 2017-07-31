/**
 * Created by dbasukala on 1/10/2017.
 */
import React from 'react';

import PageLink from './pageLink'

class Pagination extends React.Component {
    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.props.onPageSizeChange(e.target.value);
    }

    render() {

        let {pageNo, tableWidth,totalRecords,pageSize,onPagination,}= this.props;
        let totalPages = Math.ceil(totalRecords / pageSize);

        let pagesInside = [];

        if (totalPages < 6) {
            // << < 1 2 3 4 5 > >>
            for (let i = 1; i <= totalPages; i++) {
                pagesInside.push(<PageLink key={i} onClick={onPagination}
                                           classes={pageNo == i ? "active" : ""} data-page={i} title={i}>{i}</PageLink>)
            }

        }
        else if (totalPages >= 6) {
            if (pageNo > 3 && pageNo < totalPages - 2) {
                // << < 1 ... 4 5 6 ... 10 > >>
                pagesInside.push(<PageLink key={1} onClick={onPagination} data-page="1">1 </PageLink>)
                pagesInside.push(<PageLink key={2} onClick={onPagination}>...</PageLink>)
                pagesInside.push(<PageLink key={3} onClick={onPagination}
                                           data-page={pageNo - 1}>{pageNo - 1}</PageLink>)
                pagesInside.push(<PageLink key={4} onClick={onPagination} classes="active"
                                           data-page={pageNo}>{pageNo}</PageLink>)
                pagesInside.push(<PageLink key={5} onClick={onPagination}
                                           data-page={pageNo + 1}>{pageNo + 1}</PageLink>)
                pagesInside.push(<PageLink key={6} onClick={onPagination}>...</PageLink>)
                pagesInside.push(<PageLink key={7} onClick={onPagination}
                                           data-page={totalPages}>{totalPages}</PageLink>)

            }
            else if (pageNo <= 3) {
                // << < 1 2 3 ... 20
                pagesInside.push(<PageLink key={1} onClick={onPagination}
                                           classes={pageNo == 1 ? "active" : ""}
                                           data-page={1}>1</PageLink>)
                pagesInside.push(<PageLink key={2} onClick={onPagination}
                                           classes={pageNo == 2 ? "active" : ""}
                                           data-page={2}>2</PageLink>)
                pagesInside.push(<PageLink key={3} onClick={onPagination}
                                           classes={pageNo == 3 ? "active" : ""}
                                           data-page={3}>3</PageLink>)
                pagesInside.push(<PageLink key={4} onClick={onPagination}>...</PageLink>)
                pagesInside.push(<PageLink key={5} onClick={onPagination}
                                           data-page={totalPages}>{totalPages}</PageLink>)
            }
            else if ((totalPages - pageNo) <= 2) {
                // << < 1 ... 18 19 20
                pagesInside.push(<PageLink key={1} onClick={onPagination} data-page={1}>1</PageLink>)
                pagesInside.push(<PageLink key={2} onClick={onPagination}>...</PageLink>)
                pagesInside.push(<PageLink key={3} onClick={onPagination}
                                           classes={pageNo == (totalPages - 2) ? "active" : ""}
                                           data-page={totalPages - 2}>{totalPages - 2}</PageLink>)
                pagesInside.push(<PageLink key={4} onClick={onPagination}
                                           classes={pageNo == (totalPages - 1) ? "active" : ""}
                                           data-page={totalPages - 1}>{totalPages - 1}</PageLink>)
                pagesInside.push(<PageLink key={5} onClick={onPagination}
                                           classes={pageNo == totalPages ? "active" : ""}
                                           data-page={totalPages}>{totalPages}</PageLink>)
            }
        }

        return (
            <div className="pagination" style={{width: tableWidth}}>
                <ul className="pages" data-visibility={totalRecords > 0 ? "shown" : "hidden"}>
                    <PageLink classes={"first icon-left-dir  " + (pageNo == 1 ? "disabled" : "")} data-page="first"
                              onClick={onPagination} title="First Page"/>
                    <PageLink classes={"previous icon-left-dir " + (pageNo == 1 ? "disabled" : "")} data-page="previous"
                              onClick={onPagination} title="Previous Page"/>
                    {pagesInside}
                    <PageLink classes={"next icon-right-dir " + (pageNo == totalPages ? "disabled" : "")}
                              data-page="next"
                              onClick={onPagination} title="Next Page"/>
                    <PageLink classes={"last icon-right-dir " + (pageNo == totalPages ? "disabled" : "")}
                              data-page="last"
                              onClick={onPagination} title="Last Page"/>
                </ul>

                <div className="pageSize" data-visibility={totalRecords > 0 ? "shown" : "hidden"}>
                    <span>Showing</span>
                    <select onChange={this.onChange} value={pageSize}>
                        <option value="100">100</option>
                        <option value="200">200</option>
                        <option value="300">300</option>
                        <option value="500">500</option>
                    </select>
                    <span>items per page </span>
                </div>
                <p> Total items {totalRecords}</p>
            </div>
        )
    }
}



export default Pagination;