import React, { FC, useEffect, useState } from 'react'
import './index.css'
import { ISiderItem, lists } from '../router'

interface Props {}

const AppSider: FC<Props> = (props: Props) => {
    const [toggle, setToggle] = useState<boolean>(true)

    useEffect(() => {
        console.log(location, location.pathname)
    }, [toggle])

    return (
        <aside>
            <ul onClick={() => setToggle(!toggle)}>
                {lists.map(list => (
                    <ListItem key={list.href} {...list} />
                ))}
            </ul>
        </aside>
    )
}

interface ItemProps extends ISiderItem {}
const ListItem: FC<ItemProps> = ({ text, href }) => {
    return (
        <li>
            <a href={href}>{text}</a>
        </li>
    )
}

export default AppSider
