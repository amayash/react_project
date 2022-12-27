import React from "react"
import MyButton from './MyButton'

export default function Item(props) {
    
    const data = props.item;
    if (data.lines) {
        for (let elem in data.lines) {
            data[elem] = data.lines[elem];
        }
    }

    let price = data.price;
    let sale = data.sale;

    if (sale > 0) {
        price = price - (price * sale) / 100;
    }
    return (
        <div className="border rounded mt-1 ms-1" style={{ width: '420px' }}>
            <img className="posterItem me-3 mt-1 ms-1" src={data.image} alt={data.name} align="left" />
            <div className="d-flex flex-row flex-wrap  flex-grow-1 align-items-center">
                <div className="pt-3 description d-flex flex-column justify-content-start align-items-center mb-3 fs-6 fw-bold">
                    <p className="text-start description">
                        <a className="text-white fs-5 fw-bold pt-3 itemLink" onClick={() => props.openItemPageFunc(data.id)} style={{ cursor: "pointer" }}>
                            {data.name}
                        </a>
                        <br />{data.type} <br />
                        {typeof props.countItems === 'undefined' ? price.toFixed(2) : (price * props.countItems).toFixed(2)} $
                        {sale > 0 ? <label className="text-danger"> -{sale}%</label> : null}</p>
                </div>
                <div className="d-flex flex-wrap justify-content-end fw-bold fs-4 flex-grow-1">
                    <p className="m-1">{data.count > 1 ? data.count : null}</p>
                    <MyButton value={props} />
                </div>
            </div>
        </div>
    )
}