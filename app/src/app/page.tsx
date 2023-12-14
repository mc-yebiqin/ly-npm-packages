"use client";

import { ChangeEvent, useCallback, useState } from "react";
import { theme } from "laoye-react-component_design";

const Demo = () => {
  console.log(
    "%c >>>>> theme -10",
    "font-size:13px; background:pink; color:#000;",
    theme
  );

  return <div>Demo</div>;
};

function HomePage() {
  const [status, setStatus] = useState(false);
  const [content, setContent] = useState("");

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  }, []);

  return (
    <div>
      <input type="text" onChange={handleChange} />

      <Demo />
      <div onClick={() => setStatus(!status)}>切换</div>
    </div>
  );
}

export default HomePage;
