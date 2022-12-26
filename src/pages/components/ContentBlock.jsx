import React from 'react'

export default function ContentBlock({valueBlock, title, contentDop, ...props}) {

    return (
        <div className="container rounded my-5 p-4 content">
            <div className="content_header rounded-top p-2 mb-2 d-flex justify-content-between">
                <h1 className="fs-1 fw-bold text-white ms-3">{title}</h1>
                {contentDop}
            </div>
            <div {...props}>
                {valueBlock}
            </div>
        </div>
    )

}
