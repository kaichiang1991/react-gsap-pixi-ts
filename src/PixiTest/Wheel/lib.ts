import { gsap } from 'gsap'
import { DEG_TO_RAD, RAD_TO_DEG } from 'pixi.js'

// 其他設定
export enum eWheelConfig {
    radius = 300,
    textRadius = 150,
    arrowOffset = 20,
}

// 角度轉換
export const Deg2Rad = (degree: number): number => degree * DEG_TO_RAD
export const Rad2Deg = (radian: number): number => radian * RAD_TO_DEG

export const getPointByDegree = (
    degree: number,
    length: number = eWheelConfig.radius
): number[] =>
    [Math.cos(Deg2Rad(degree)), Math.sin(Deg2Rad(degree))].map(
        unit => unit * length
    )
export const getPointByRadian = (
    radian: number,
    length: number = eWheelConfig.radius
): number[] => [Math.cos(radian), Math.sin(radian)].map(unit => unit * length)

// 顏色設定
const colorDef = ['#37ff90', '#929e21', '#0acdb3', '#646cff', '#213547']
export const getColor = (index: number, length: number): string => {
    let offset: number = index % colorDef.length
    if (index === length - 1 && offset === 0) {
        // 最後一個，並且與頭一個顏色相等
        // 拿出與前後不同的顏色陣列
        const otherColors: string[] = colorDef.filter(
            (_, _index) => _index !== 0 && _index !== index - 1
        )
        return gsap.utils.random(otherColors)
    }

    return colorDef[offset]
}
