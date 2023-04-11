import {
    ComponentProps,
    RefObject,
    useCallback,
    useEffect,
    useLayoutEffect,
    useMemo,
    useState,
} from 'react'
import { Graphics, PixiRef, Container } from '@pixi/react'
import { Graphics as PIXIGraphics, PI_2, TextStyle } from 'pixi.js'
import { wheelOption } from '..'
import {
    getColor,
    getPointByRadian,
    eWheelConfig,
    Rad2Deg,
    Deg2Rad,
} from './lib'
import gsap, { Linear, Power3 } from 'gsap'

type Draw = ComponentProps<typeof Graphics>['draw']
type IContainer = PixiRef<typeof Container> // PIXI.Container

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
    style?: TextStyle
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
                style: new TextStyle({
                    fill: 'white',
                    stroke: 'black',
                    strokeThickness: 4,
                }),
            }
        })
    }, [data])

    return {
        middleCircle,
        wheel,
        textArr,
    }
}

interface ActionResult {
    playing: boolean
}
export const useHandleActions = (
    startGame: boolean,
    data: DataResult,
    containerRef: RefObject<IContainer>,
    complete: () => void
): ActionResult => {
    const [playing, setPlaying] = useState<boolean>(false)

    useLayoutEffect(() => {
        if (!startGame) {
            setPlaying(false)
            return
        }

        // 取得結果
        const getResult = (): string => {
            const nameArr: string[] = Object.entries(data).map(
                _data => _data[0]
            )
            return gsap.utils.shuffle(nameArr)[0]
        }

        // 取得結果徑度
        const getRadian = (result: string): number => {
            const entries = Object.entries(data)
            const index: number = entries.findIndex(
                    _data => _data[0] === result
                ),
                startOdds: number = entries
                    .slice(0, index)
                    .reduce((pre, curr) => pre + curr[1], 0),
                endOdds: number = entries
                    .slice(0, index + 1)
                    .reduce((pre, curr) => pre + curr[1], 0),
                randomRadian: number =
                    gsap.utils.random(startOdds, endOdds) * PI_2
            console.log({
                index,
                startOdds,
                endOdds,
                randomRadian: Rad2Deg(randomRadian),
            })
            return randomRadian
        }

        // 開始遊戲
        const ctx: gsap.Context = gsap.context(() => {
            gsap.timeline({ defaults: { ease: Linear.easeNone } })
                // 演出繞圈
                .to(containerRef.current, {
                    rotation: `+=${PI_2}`,
                    duration: 1,
                    repeat: gsap.utils.random(2, 4, 1),
                })
                // 跑完演出
                .to(containerRef.current, {
                    rotation: `+=${PI_2 - containerRef.current!.rotation}`,
                    duration:
                        ((PI_2 - containerRef.current!.rotation) / PI_2) * 1,
                })
                // 結果
                .to(containerRef.current, {
                    rotation: `+=${getRadian(getResult())}`,
                    duration: 1,
                    ease: Power3.easeOut,
                })
                .eventCallback('onComplete', complete)
        }, containerRef)

        return () => ctx.revert()
    }, [startGame, complete])

    return { playing }
}
