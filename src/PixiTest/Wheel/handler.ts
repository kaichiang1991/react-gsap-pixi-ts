import {
    ComponentProps,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react'
import { Graphics } from '@pixi/react'
import { Graphics as PIXIGraphics, PI_2 } from 'pixi.js'
import { wheelOption } from '..'
import { getColor, getPointByRadian, eWheelConfig, Rad2Deg } from './lib'

type Draw = ComponentProps<typeof Graphics>['draw']

interface DataResult {
    [propName: string]: number
}
export const useHandleData = (options: wheelOption[]): DataResult => {
    const [result, setResult] = useState<DataResult>({})

    // 計算機率總數
    const calcProbTotal = useCallback(
        (_options: wheelOption[]): number =>
            _options?.reduce((pre, curr) => pre + curr[1], 0),
        [options]
    )

    useEffect(() => {
        const newResult: DataResult = {}
        const total: number = calcProbTotal(options)
        // 計算每一個選項的機率
        options.map(([name, count]) => {
            newResult[name] = count / total
        })

        setResult(newResult)
    }, [options])

    return result
}

interface TextResult {
    text: string
    rotation: number // in radian
    position: [number, number]
    anchor: [number, number]
}
interface GraphicsResult {
    middleCircle: Draw // 中間的圓圈
    wheel: Draw
    textArr: TextResult[]
}
export const useHandleGraphics = (data: DataResult): GraphicsResult => {
    // 中間的白色錨點
    const middleCircle: Draw = useCallback<any>((g: PIXIGraphics) => {
        g.clear().beginFill('0xFFF').drawCircle(0, 0, 30).endFill()
    }, [])

    // 整個輪盤
    const wheel: Draw = useCallback(
        (g: PIXIGraphics) => {
            g.clear()

            Object.entries(data).forEach(([_, odds], index, arr) => {
                const color: string = getColor(index, arr.length),
                    preOddsSum: number = arr
                        .slice(0, index)
                        .reduce((pre, curr) => pre + curr[1], 0),
                    startRadian: number = preOddsSum * PI_2,
                    endRadian: number = (preOddsSum + odds) * PI_2,
                    startPoint: number[] = getPointByRadian(startRadian)

                g.beginFill(color)
                    .lineTo(startPoint[0], startPoint[1])
                    .arc(0, 0, eWheelConfig.radius, startRadian, endRadian)
                    .endFill()
            })
        },
        [data]
    )

    // 文字提示
    const textArr = useMemo(() => {
        return Object.entries(data).map(([name, odds], index, arr) => {
            const preOddsSum: number = arr
                    .slice(0, index)
                    .reduce((pre, curr) => pre + curr[1], 0),
                startRadian: number = preOddsSum * PI_2,
                endRadian: number = (preOddsSum + odds) * PI_2,
                averageRadian: number = (endRadian + startRadian) / 2,
                [x, y] = getPointByRadian(
                    averageRadian,
                    eWheelConfig.textRadius
                )

            return {
                text: name,
                rotation: averageRadian,
                position: [x, y] as [number, number],
                anchor: [0, 0.5] as [number, number],
            }
        })
    }, [data])

    return {
        middleCircle,
        wheel,
        textArr,
    }
}

export const useHandleActions = () => {}
