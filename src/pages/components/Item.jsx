import React from "react"
import MyButton from './MyButton'

export default function Item(props) {
    return (
        <tr>
            <td>
                <div className="border-black">
                    <img className="posterItem me-3" src={props.item.image} alt={props.item.name} align="left"/>
                    <div className="d-flex flex-row flex-wrap  flex-grow-1 align-items-center">
                        <div className="pt-3 description d-flex flex-column justify-content-start align-items-center mb-3 fs-6 fw-bold">
                            <p className="text-start description">
                                <a className="text-white fs-5 fw-bold pt-3 itemLink" onClick={() => props.openItemPageFunc(props.item.id)} style={{ cursor: "pointer" }}>
                                    {props.item.name}
                                </a>
                                <br />{props.item.type} <br /> 
                                {typeof props.countItems === 'undefined' ? props.item.price : (props.item.price * props.countItems).toFixed(2)} $</p>
                        </div>
                        <div className="d-flex flex-wrap justify-content-end fw-bold fs-4 flex-grow-1">
                            <p className="m-1">{props.item.count > 1 ? props.item.count : null}</p>
                            <MyButton value={props} />
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    )
}