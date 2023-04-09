import { FC, useEffect, useLayoutEffect, useRef, useState } from 'react'
import './App.css'
import AppSider from './AppSider'
import { ISiderItem, lists } from './router'

const App: FC<{}> = () => {
    const { pathname } = location
    const matchList: ISiderItem | undefined = lists.find(list =>
        new RegExp(list.href).test(pathname)
    )

    return (
        <div className="App">
            <AppSider />
            {!matchList ? <>尚未選擇</> : matchList.component!({})}
        </div>
    )
}

export default App
