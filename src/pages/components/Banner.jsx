import { React, useEffect, useState } from 'react'
import banner1 from '../../images/banner1.jpg'
import banner2 from '../../images/banner2.jpg'
import banner3 from '../../images/banner3.jpg'

export default function Banner() {
    var old = 0;
    var current = 1;
    const [bannerState, setBannerState] = useState(['show', 'hide', 'hide']);

    useEffect(() => {
        const timer = window.setInterval(() => {
            setBannerState([...bannerState, bannerState[current] = 'show', bannerState[old] = 'hide']);

            console.info('Banner changed');

            old = current;
            current++;

            if (current === 3) {
                current = 0;
            }
        }, 5000)

        return () => {
            window.clearInterval(timer);
        }
    }, [])

    return (
        <div className="d-flex align-items-center flex-column" id="banner">
            <img src={banner1} className={bannerState[0]} />
            <img src={banner2} className={bannerState[1]} />
            <img src={banner3} className={bannerState[2]} />
        </div>
    )
}