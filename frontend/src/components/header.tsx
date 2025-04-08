"use client";

import { Button } from "@mantine/core";
import { useEffect, useState } from "react";

const Header = ({label = "pippo"}) => { 
    const [counter, setCounter] = useState<number>(0);  

    useEffect(() =>{
        console.log("una sola volta")
    },[])
    
    useEffect(() =>{
        console.log("una sola volta")
    },[])
    
    const handleSubmit = () =>{
        setCounter(counter +1);
    }

      
    return(
        <>
            <h1 className="header__title">
                Game ITS
            </h1>

            <Button variant="light" onClick={handleSubmit} >
                {counter}
            </Button>
        </>
    );
}

export default Header;