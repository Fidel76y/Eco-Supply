"use client"

import React, { useEffect, useRef } from 'react'
import Jazzicon from "@metamask/jazzicon";
import styled from "@emotion/styled";



const StyledIdenticon = styled.div`
  height: 1rem;
  width: 1rem;
  border-radius: 1.125rem;
  background-color: black;
`;

const Identicon = ({account, className}) => {
    const ref = useRef();
//   const { account } = useEthers();

useEffect(() => {
    if (account && ref.current) {
      ref.current.innerHTML = "";
      ref.current.appendChild(Jazzicon(16, parseInt(account.slice(2, 10), 16)));
    }
    const done = Jazzicon(16, parseInt(account.slice(2, 10), 16))
    // console.log(done)
  }, [account]);

//   return <StyledIdenticon ref={ref} />
return (
    <div ref={ref} className={`${className ? className: ' rounded-full '}`}></div>
)
}

export default Identicon