import React, { FC, useEffect, useState } from 'react'
import './index.css'
import { ISiderItem, lists } from '../router'

interface Props {}

const AppSider: FC<Props> = (props: Props) => {
    const [toggle, setToggle] = useState<boolean>(true)

    return (
        <aside>
            <ul>
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
