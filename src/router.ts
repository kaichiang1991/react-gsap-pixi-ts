import { FC } from 'react'
import TweenTest from './TweenTest'

export interface ISiderItem {
    text: string
    href: string
    component?: FC<{}>
}

export const lists: Array<ISiderItem> = [
    { text: 'tween', href: 'tween', component: TweenTest },
    { text: '測試2', href: '666' },
]
