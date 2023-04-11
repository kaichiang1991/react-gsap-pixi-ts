import React, { FC, PropsWithChildren } from 'react'
import { Stage, Container, Sprite, Text, Graphics } from '@pixi/react'
import { useHandleActions, useHandleData, useHandleGraphics } from './handler'
import { wheelOption } from '..'
import { Deg2Rad, eWheelConfig } from './lib'

interface Props {
    options: wheelOption[]
}
const WheelContainer: FC<Props> = ({ options }) => {
    const result = useHandleData(options)
    const { wheel, middleCircle, textArr } = useHandleGraphics(result)
    // useHandleActions()

    return (
        <Container position={[400, 400]}>
            <Graphics draw={wheel} />
            <Graphics draw={middleCircle} />
            {textArr.map((text, index) => (
                <Text key={`${index}_${text.text}`} {...text} />
            ))}
        </Container>
    )
}

export default WheelContainer
