"use client";
import { Button } from "@mantine/core";
import { use, useEffect, useState } from "react";

interface IOwnProps {
  label: string;
}

const Header = ({ label }: IOwnProps) => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (counter < 10) {
      console.log("Counter is less than 10");
    } else {
      console.log("Counter is 10 or more");
    }
  }, [counter]);

  return (
    <div className="header">
      <div className="header__title">
        <h1>Game ITS</h1>
      </div>
      <div>{counter}</div>
      <Button variant="light" onClick={() => setCounter(counter + 1)}>
        {label}
      </Button>
    </div>
  );
};

export default Header;
