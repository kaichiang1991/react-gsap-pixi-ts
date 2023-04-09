import React, { FC, RefObject, useLayoutEffect, useRef } from 'react'
import styles from './index.module.css'
import { ReactNode } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { gsap } from 'gsap'

interface Props {
    children: ReactNode
    func: gsap.ContextFunc
    rectRef: RefObject<HTMLDivElement>
    circleRef: RefObject<HTMLDivElement>
}

const CommonBox: FC<Props> = ({ children, func, rectRef, circleRef }) => {
    const containerRef = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        const ctx: gsap.Context = gsap.context(func, containerRef)
        return () => ctx.revert()
    }, [])

    return (
        <div className={styles.box} ref={containerRef}>
            {children}
            <div
                className={[styles.shape, styles.rect].join(' ')}
                ref={rectRef}
            ></div>
            <div
                className={[styles.shape, styles.circle].join(' ')}
                ref={circleRef}
            ></div>
        </div>
    )
}

export default CommonBox
