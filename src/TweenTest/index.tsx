import { useCallback, useRef } from 'react'
import CommonBox from '../CommonBox'
import gsap from 'gsap'

const TweenTest = () => {
    const rectRef = useRef<HTMLDivElement>(null)
    const circleRef = useRef<HTMLDivElement>(null)

    const func = useCallback(() => {
        // 用 ref 控制
        gsap.to(rectRef.current, {
            x: '+=200',
            rotate: 60,
            backgroundColor: 'red',
            duration: 1,
        }).delay(1)
        // 用 class 控制
        // gsap.to(`.${styles.circle}`, {
        gsap.to(circleRef.current, {
            y: '-=200',
            x: '+=200',
            opacity: 0.3,
            duration: 1,
        }).delay(1)
        gsap.to(circleRef.current, { duration: 0.3, x: '+=30rem' }).delay(
            1 + 1 + 0.5
        )
    }, [rectRef, circleRef])

    return (
        <CommonBox {...{ func, rectRef, circleRef }}>
            <h1>TweenTest</h1>
        </CommonBox>
    )
}

export default TweenTest
