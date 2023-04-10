import { useCallback, useRef } from 'react'
import CommonBox from '../CommonBox'
import gsap, { Linear } from 'gsap'

const TimelineTest = () => {
    const rectRef = useRef<HTMLDivElement>(null)
    const circleRef = useRef<HTMLDivElement>(null)
    const timelineRef = useRef<gsap.core.Timeline | null>(null)

    const func = useCallback(() => {
        console.log('use callback', timelineRef)
        if (!timelineRef.current) timelineRef.current = gsap.timeline()

        const timeline: gsap.core.Timeline = timelineRef.current
        // !!timeline.kill() &&
        timeline
            .from([rectRef.current, circleRef.current], {
                opacity: 0,
                duration: 2,
            })
            .to(rectRef.current, {
                rotate: '+=360',
                repeat: -1,
                ease: Linear.easeNone,
                duration: 1,
            })
            .to(circleRef.current, {
                x: '+=200',
                yoyo: true,
                repeat: -1,
                repeatDelay: 0.1,
                backgroundColor: 'rgb(212, 95, 0)',
            })
    }, [timelineRef, rectRef, circleRef])

    return (
        <CommonBox {...{ func, rectRef, circleRef }}>
            <h1>TimelineTest</h1>
        </CommonBox>
    )
}

export default TimelineTest
