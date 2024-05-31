'use client'

const WebButton =({onClick,label,type}) =>{
    return (
      <button className=" py-[10px] px-[28px] bg-blue-700 rounded-[8px] " type={type} onClick={onClick}> {label} </button>
    )
  }
  export default WebButton;