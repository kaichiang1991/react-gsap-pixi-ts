import { FC } from 'react'
import TweenTest from './TweenTest'
import TimelineTest from './TimelineTest'

export interface ISiderItem {
    text: string
    href: string
    component: FC<{}>
}

export const lists: Array<ISiderItem> = [
    { text: 'tween', href: 'tween', component: TweenTest },
    { text: 'timeline', href: 'timeline', component: TimelineTest },
]
