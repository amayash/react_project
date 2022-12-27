import React from "react"
import MyButton from './MyButton'

export default function Item(props) {
    let price = props.item.price;
    let sale = props.item.sale;

    if (sale > 0) {
        price = price - (price * sale) / 100;
    }
    return (
        <div className="border rounded mt-1 ms-1" style={{width: '420px'}}>
            <img className="posterItem me-3 mt-1 ms-1" src={props.item.image} alt={props.item.name} align="left" />
            <div className="d-flex flex-row flex-wrap  flex-grow-1 align-items-center">
                <div className="pt-3 description d-flex flex-column justify-content-start align-items-center mb-3 fs-6 fw-bold">
                    <p className="text-start description">
                        <a className="text-white fs-5 fw-bold pt-3 itemLink" onClick={() => props.openItemPageFunc(props.item.id)} style={{ cursor: "pointer" }}>
                            {props.item.name}
                        </a>
                        <br />{props.item.type} <br />
                        {typeof props.countItems === 'undefined' ? price : (price * props.countItems).toFixed(2)} $
                        {sale > 0 ? <label className="text-danger"> -{sale}%=</label>: null}</p>
                </div>
                <div className="d-flex flex-wrap justify-content-end fw-bold fs-4 flex-grow-1">
                    <p className="m-1">{props.item.count > 1 ? props.item.count : null}</p>
                    <MyButton value={props} />
                </div>
            </div>
        </div>
    )
}