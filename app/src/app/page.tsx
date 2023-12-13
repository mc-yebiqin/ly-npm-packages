"use client";

import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { ThemeDemo } from "./_components";

import { useMemoizedData, useMemoizedFn } from "laoye-react-hooks";

const Demo = ({ custom }: any) => {
  const test = useMemoizedData(custom);

  useEffect(() => {
    console.log(
      "%c >>>>> useEffect -23",
      "font-size:13px; background:pink; color:#000;",
      test
    );
  }, [test]);

  return (
    <div
      onClick={() => {
        console.log(
          "%c >>>>> useEffect -23",
          "font-size:13px; background:pink; color:#000;",
          test
        );
      }}
    >
      Demo
    </div>
  );
};

function HomePage() {
  const [status, setStatus] = useState(false);
  const [content, setContent] = useState("");

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  }, []);

  return (
    <ThemeDemo>
      <input type="text" onChange={handleChange} />

      <Demo custom={{ color: "white", background: status ? "red" : "blue" }} />
      <div onClick={() => setStatus(!status)}>切换</div>
    </ThemeDemo>
  );
}

export default HomePage;
