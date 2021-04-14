import React, { useEffect, useState } from "react";

interface HeroProps {
  srcs: string[];
}
const css = `
    img {
        max-width: 100%;
    }
    img.active {
        display: block;
    }
    img.none {
        display: none;
    }
`;
export const HeroSlider: React.FC<HeroProps> = ({ srcs }) => {
  const [active, setActive] = useState(0);
  useEffect((): any => {
    const interval = setInterval((_) => {
      setActive(active < srcs.length - 1 ? active + 1 : 0);
    }, 5000);
    return (_) => {
      clearInterval(interval);
    };
  }, [active]);
  return (
    <>
      <style>{css}</style>
      {srcs.map((s, i) => (
        <img key={i} src={s} className={i === active ? "active" : "none"} />
      ))}
    </>
  );
};
