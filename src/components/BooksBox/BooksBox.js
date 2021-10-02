import React from 'react'
import { oldTBooks, newTBooks } from '../../helper'
import { useDispatch } from 'react-redux'
import { book } from '../../store/verse'
import classes from './BooksBox.module.css'

const BooksBox = () => {
    const dispatch = useDispatch()
    let otBooks = []
    let ntBooks = []

    const btnHandler = (e) => {
        e.preventDefault();
        const selectedBook = e.target.id
        dispatch(book(selectedBook))
    }
    for (const book in oldTBooks) {
        otBooks.push(<button className={classes['button']} key={book} id={book} onClick={btnHandler}>{oldTBooks[book]}</button>)
    }
    for (const book in newTBooks) {
        ntBooks.push(<button className={classes['button']} key={book} id={book} onClick={btnHandler}>{newTBooks[book]}</button>)
    }



    return (
        <div className={classes['layout']}>
            <div className={classes['otBooks']}>
                {otBooks.map(book => book)}
            </div>
            <div className={classes['ntBooks']}>
                {ntBooks.map(book => book)}
            </div>
        </div>
    )
}

export default BooksBox
