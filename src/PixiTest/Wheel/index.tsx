import React, {
    FC,
    PropsWithChildren,
    RefObject,
    useCallback,
    useRef,
} from 'react'
import { Stage, Container, Sprite, Text, Graphics, PixiRef } from '@pixi/react'
import { useHandleActions, useHandleData, useHandleGraphics } from './handler'
import { wheelOption } from '..'
import { Deg2Rad, eWheelConfig } from './lib'

interface Props {
    options: wheelOption[]
    startGame: boolean
    complete: () => void
}
type IContainer = PixiRef<typeof Container> // PIXI.Container

const WheelContainer: FC<Props> = ({ options, startGame, complete }) => {
    const contRef = useRef<IContainer>(null)
    const result = useHandleData(options)
    const { wheel, arrow, middleCircle, textArr } = useHandleGraphics(result)

    useHandleActions(startGame, result, contRef, complete)

    return (
        <>
            <Container position={[400, 400]} ref={contRef}>
                <Graphics draw={wheel} />
                <Graphics draw={middleCircle} />
                {textArr.map((text, index) => (
                    <Text key={`${index}_${text.text}`} {...text} />
                ))}
            </Container>
            <Graphics
                draw={arrow}
                anchor={[0, 0.5]}
                angle={0}
                position={[
                    400 + eWheelConfig.radius + eWheelConfig.arrowOffset,
                    400,
                ]}
            />
        </>
    )
}

export default WheelContainer
