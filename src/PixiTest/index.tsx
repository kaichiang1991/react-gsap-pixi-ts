import React, {
    Dispatch,
    FC,
    FormEventHandler,
    MouseEventHandler,
    SetStateAction,
    useCallback,
    useRef,
    useState,
} from 'react'
import { RouterBox } from '../CommonBox'
import { Stage, Container, Sprite, Text } from '@pixi/react'
import './index.css'
import WheelContainer from './Wheel'

export type wheelOption = [string, number]
interface Props {}

const PixiTest: FC<Props> = (props: Props) => {
    const [options, setOptions] = useState<wheelOption[]>([])
    const [startGame, setStartGame] = useState<boolean>(false)

    const complete = useCallback(() => {
        setStartGame(false)
    }, [])

    const handleStartGame: MouseEventHandler<HTMLButtonElement> = e => {
        setStartGame(true)
    }

    return (
        <RouterBox>
            <Stage
                width={800}
                height={800}
                options={{
                    backgroundAlpha: 0,
                    resolution: 1,
                    width: 800,
                    height: 800,
                }}
            >
                <WheelContainer
                    options={options}
                    startGame={startGame}
                    complete={complete}
                />
            </Stage>
            <div>
                <WheelForm
                    handleStartGame={handleStartGame}
                    setOptions={setOptions}
                    options={options}
                />
                <button
                    className="play-button"
                    type="button"
                    onClick={handleStartGame}
                    disabled={startGame}
                >
                    開始
                </button>
            </div>
        </RouterBox>
    )
}

interface IWheelFormProps {
    handleStartGame: MouseEventHandler<HTMLButtonElement>
    options: wheelOption[]
    setOptions: Dispatch<SetStateAction<wheelOption[]>>
}

const WheelForm: FC<IWheelFormProps> = ({
    setOptions,
    options,
    handleStartGame,
}) => {
    const [option, setOption] = useState<string>()
    const [count, setCount] = useState<number>()
    const [allOptions, setAllOptions] = useState<wheelOption[]>(options)

    // 新增選項
    const handleNewItem: FormEventHandler<HTMLFormElement> = e => {
        e.preventDefault()
        const resetAll = () => {
            setOption('')
            setCount(0)
        }
        if (!option || !count) {
            resetAll()
            return
        }

        setAllOptions([...allOptions, [option, count]])
        resetAll()
    }

    return (
        <>
            <form className="wheel-form" onSubmit={handleNewItem}>
                <input
                    placeholder="新增的選項"
                    value={option}
                    onChange={e => setOption(e.target.value)}
                />
                <input
                    placeholder="份數"
                    type="number"
                    value={count}
                    onChange={e => setCount(+e.target.value)}
                />
                <button type="submit">新增</button>
                <ul>
                    {allOptions.map(([name, count]) => (
                        <li key={name}>
                            {name} - {count}
                        </li>
                    ))}
                </ul>
                <button type="button" onClick={() => setOptions(allOptions)}>
                    確認更改
                </button>
            </form>
        </>
    )
}

export default PixiTest
