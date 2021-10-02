import React, { useState, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import { engBibleID, telBibleID, apiKey } from '../../helper'
import { useSelector, useDispatch } from 'react-redux'
import { eng, tel } from '../../store/verse'
import classes from './Searchbox.module.css'

const SearchBox = () => {
    const dispatch = useDispatch()
    const [selectedBook, setSelectedBook] = useState('')
    const book = useSelector(state => state.verse.book)
    console.log(book, 'TE');

    useEffect(() => {
        if (book) {
            console.log('BOOK', book);
            setSelectedBook(book)
        }
    }, [book])


    const searchHandler = (e) => {

        e.preventDefault()

        let elements = document.getElementById('searchbar').elements
        let formData = new FormData()
        let data = {}
        for (let i = 0; i < elements.length; i++) {
            var item = elements.item(i)
            formData.append(item.name, item.value)
            data[item.name] = item.value
        }
        console.log('DATA', data);
        let reference = ''
        if (data.fromVerse && data.toVerse) {
            reference = `${data.book}.${data.chapter}.${data.fromVerse}-${data.book}.${data.chapter}.${data.toVerse}`
        } else if (data.fromVerse) {
            reference = `${data.book}.${data.chapter}.${data.fromVerse}`
        } else {
            reference = `${data.book}.${data.chapter}`
        }
        const verses = async (lang) => {
            let id = ''
            try {
                if (lang === 'eng') {
                    id = engBibleID
                } else if (lang === 'tel') {
                    id = telBibleID
                }

                let response = await fetch(`https://api.scripture.api.bible/v1/bibles/${id}/passages/${reference}?content-type=text&include-notes=false&include-titles=false&include-chapter-numbers=false&include-verse-numbers=true&include-verse-spans=false&use-org-id=false`, {
                    headers: {
                        'api-key': apiKey,
                        'accept': 'application/json',
                    },
                });

                let result = await response.json();

                let test = {
                    reference: result.data.reference,
                    verse: result.data.content
                }

                if (lang === 'eng') {
                    dispatch(eng(test))
                } else if (lang === 'tel') {
                    dispatch(tel(test))
                }

            } catch (err) {
                console.error(err);
            }
        }
        verses('eng');
        verses('tel');
    }

    return (
        <form id="searchbar" className={classes['formLayout']}>
            <div className={classes['fields']}>
                <label htmlFor="book" className={classes['label']}>Book</label>
                <input type="text" className={classes['input']} name="book" id="book" value={selectedBook} required readOnly />
            </div>
            <div className={classes['fields']}>
                <label htmlFor="chapter" className={classes['label']}>Chapter</label>
                <input type="number" className={classes['input']} name="chapter" id="chapter" min='1' required />
            </div>
            <div className={classes['fields']}>
                <label htmlFor="fromVerse" className={classes['label']}>From verse</label>
                <input type="number" className={classes['input']} name="fromVerse" id="fromVerse" min='1' />
            </div>
            <div className={classes['fields']}>
                <label htmlFor="toVerse" className={classes['label']}>To verse</label>
                <input type="number" className={classes['input']} name="toVerse" id="toVerse" min='1' />
            </div>
            <button className={classes['button']} type='submit' onClick={searchHandler}><FaSearch className={classes['buttonIcon']} /></button>
        </form>
    )
}

export default SearchBox