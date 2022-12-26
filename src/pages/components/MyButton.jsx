import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from "@fortawesome/free-solid-svg-icons"
import { faHeart } from "@fortawesome/free-solid-svg-icons"
import { faRemove } from "@fortawesome/free-solid-svg-icons"
import { faMinus } from "@fortawesome/free-solid-svg-icons"

export default function MyButton({ value }) {

    const delButton = (
        <button onClick={() => value.removeFunc(value.item.id)} type="button" className="m-1 btn btn-danger">
            <FontAwesomeIcon icon={faRemove} />
        </button>
    )

    const editButton = (
        <button onClick={() => value.editFunc(value.item.id)} type="button" className="m-1 btn btn-primary">
            <FontAwesomeIcon icon={faEdit} />
        </button>
    )

    const addButton = (
        <button onClick={() => value.addItemToWillSee(value.item)} type="button" className="m-1 btn btn-success">
            <FontAwesomeIcon icon={faHeart} />
        </button>
    )

    const minusButton = (
        <button onClick={() => value.minusFunc(value.item)} type="button" className="m-1 btn btn-primary">
            <FontAwesomeIcon icon={faMinus} />
        </button>
    )

    return (
        <div>
            {value.editFunc ? editButton : null}
            {value.addItemToWillSee ? addButton : null}
            {value.minusFunc ? minusButton : null}
            {value.removeFunc ? delButton : null}
        </div>
    )
}