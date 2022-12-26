import React from 'react'

export default function ContentBlock(props) {

    return (
        <div className="container rounded my-5 p-4 content">
            <div className="content_header rounded-top p-2 mb-2 d-flex justify-content-between">
                <h1 className="fs-1 fw-bold text-white ms-3">{props.title}</h1>
                {props.contentDop}
            </div>
            <div className="d-flex justify-content-center flex-wrap">
                {props.valueBlock}
            </div>
        </div>
    )

}
