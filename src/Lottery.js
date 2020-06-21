import React, { useState, useEffect } from "react";
import useInterval from "./useInterval";
import "./index.css";
const classNameMap = [
  "left-top",
  "top-middle",
  "top-right",
  "right-middle",
  "right-bottom",
  "bottom-middle",
  "left-bottom",
  "left-middle",
];
const Lottery = () => {
  const [currentPoint, setCurrentPoint] = useState(0);
  const [prizing, setPrizing] = useState(false);
  const [delay, setDelay] = useState(null);

  const prizeList = [
    "奖品1",
    "奖品2",
    "奖品3",
    "奖品4",
    "奖品5",
    "奖品6",
    "奖品7",
    "奖品8",
  ];

  useInterval(() => {
    setCurrentPoint(
      currentPoint % 7 === 0 && currentPoint > 0 ? 0 : currentPoint + 1
    );
  }, delay);

  useEffect(() => {
    // 开始抽奖
    if (prizing) {
      // 设置抽奖间隔 100
      setDelay(80);
    } else {
      // 暂停
      setDelay(null);
    }
  }, [prizing]);

  return (
    <div className="container">
      <div className="prize-list">
        {prizeList.map((prize, index) => (
          <PrizeItem
            index={index}
            name={prize}
            key={prize}
            active={index === currentPoint}
          />
        ))}
        <button
          className="prize-item prize-button"
          onClick={() => setPrizing((prizing) => !prizing)}
        >
          {prizing ? "停止" : "抽奖"}
        </button>
      </div>
    </div>
  );
};

const PrizeItem = ({ index = 0, name, active = false }) => {
  return (
    <div
      className={`prize-item ${classNameMap[index]} ${
        active === true ? "prize-active" : ""
      } `}
    >
      {name}
    </div>
  );
};

export default Lottery;
