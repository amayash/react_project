import { React } from 'react'
import classes from '../../styles/Modal.module.css'

export default function Modal({children, visible}) {

    const rootClasses = [classes.myModal]
    if (visible) {
        rootClasses.push(classes.active);
    }

    return (
        <div className={rootClasses.join(' ')} >
            <div className={classes.myModalContent}>
                {children}
            </div>
        </div>
    )
}
