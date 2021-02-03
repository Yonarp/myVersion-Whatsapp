import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectDarkMode, setDark } from '../../features/darkModeSlice'
import './DarkThemeToggle.scss';

function DarkThemeToggle() {

    const dispatch = useDispatch()
    const isDark = useSelector(selectDarkMode);

    return (
        <form>
            <input type = 'checkbox' onClick = {() => {
                dispatch(setDark(!isDark))
            }} id = 'dark-theme-checkbox'/>
            <label  htmlFor = 'dark-theme-checkbox' className= 'dark-theme-button' >
                <div className="circle">
                    <span className= 'circle-main'></span>
                    <span className= 'circle-secondary'></span>
                    <span className= 'circle-secondary-2'></span>
                    <span className= 'circle-secondary-3'></span>
                </div>
            </label>

        </form>
    );
}

export default DarkThemeToggle
