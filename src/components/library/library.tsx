'use client';

import {ReactNode, useEffect, useState} from "react";
import Styles from "./library.module.css"


interface LibraryProps {
    data: any[]
    renderCard: (data: any) => ReactNode
    recordsPerPage: number
    showNav?: boolean
}

const Library = ({data, renderCard, recordsPerPage, showNav}: LibraryProps) => {
    const [currPage, setCurrPage] = useState<number>(1)
    const lastIndex: number = currPage * recordsPerPage;
    const firstIndex: number = lastIndex - recordsPerPage;
    const records: any[] = data.slice(firstIndex, lastIndex);
    const numberOfPages: number = Math.ceil(data.length / recordsPerPage)
    const numbers = Array.from({ length: numberOfPages }, (_, index) => index + 1);

    function previousPage() {
        if (currPage !== 1) {
            setCurrPage(currPage - 1)
        }
    }

    function changePage(number: number) {
        setCurrPage(number)
    }

    function nextPage() {
        if (currPage !== numberOfPages) {
            setCurrPage(currPage + 1)
        }
    }

    if (records.length === 0) {
        return (
            <div>NOTHING TO SHOW</div>
        )
    } else {
        return (
            <div className={Styles.container}>
                <ul id={"grid"} className={Styles.grid}>
                    {records.map((record) => {
                        return (
                            <li key={record.id}>
                                {renderCard(record)}
                            </li>
                        )
                    })}
                </ul>
                {showNav && (
                    <nav>
                        <ul>
                            <li>
                                <a href={"#grid"} onClick={previousPage}>
                                    Prev
                                </a>
                            </li>
                            {numbers.map((number, index) => (
                                <li
                                    className={currPage === number ? Styles.active : ''}
                                    key={index}
                                >
                                    <a href={"#grid"} onClick={() => changePage(number)}>
                                        {number}
                                    </a>
                                </li>
                            ))
                            }
                            <li className={"library__pagination--btn direction"}>
                                <a href={"#grid"} className={"library__pagination--page-link"} onClick={nextPage}>
                                    Next
                                </a>
                            </li>
                        </ul>
                    </nav>
                )}
            </div>
        )
    }
}

export default Library