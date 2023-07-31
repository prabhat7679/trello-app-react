import React from 'react'
import './Header.css'
export default function Header() {
    function BackButton(event){

    }
    return (
        <div className="Header">
            {/* <button className="Backbtn"onClick={BackButton}>Boards</button> */}
            <img className='image' src="https://logos-world.net/wp-content/uploads/2021/02/Trello-Logo.png" alt="logo" />
        </div>

    )
}
