import React from 'react'
import classes from './DisplayBox.module.css'

const DisplayBox = ({ title, verse }) => {
    const copyText = `${title} : ${verse}`
    return (
        <section className={classes['layout']} onClick={() => navigator.clipboard.writeText(copyText)}>
            <h1 className={classes['title']}>{title}</h1>
            <div className={classes['verse']}>{verse}</div>
        </section>
    )
}

export default DisplayBox
