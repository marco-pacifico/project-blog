"use client";
import React from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw } from "react-feather";

import Card from "@/components/Card";
import VisuallyHidden from "@/components/VisuallyHidden";

import styles from "./CircularColorsDemo.module.css";
import { set } from "date-fns";
import { el } from "date-fns/locale";

const COLORS = [
  { label: "red", value: "hsl(348deg 100% 60%)" },
  { label: "yellow", value: "hsl(50deg 100% 55%)" },
  { label: "blue", value: "hsl(235deg 100% 65%)" },
];

function CircularColorsDemo() {
  const [isPlaying, setIsPlaying] = React.useState(false);

  // TODO: This value should increase by 1 every second:
  const [timeElapsed, setTimeElapsed] = React.useState(0);

  React.useEffect(() => {
    if (!isPlaying) return;

    const timer = window.setInterval(() => {
      setTimeElapsed((timeElapsed) => timeElapsed + 1);
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [isPlaying]);

  function handleReset() {
    setTimeElapsed(0);
    setIsPlaying(false);
  }

  // TODO: This value should cycle through the colors in the
  // COLORS array:
  const selectedColor = COLORS[timeElapsed % COLORS.length];

  const id = React.useId();

  return (
    <Card as="section" className={styles.wrapper}>
      <ul className={styles.colorsWrapper}>
        {COLORS.map((color, index) => {
          const isSelected = color.value === selectedColor.value;

          return (
            <li className={styles.color} key={index} style={{zIndex: isSelected ? 2 : 1} }>
              {isSelected && (
                <motion.div
                  layoutId={`${id}-selected-color-outline`}
                  className={styles.selectedColorOutline}
                />
              )}
              <div
                className={clsx(
                  styles.colorBox,
                  isSelected && styles.selectedColorBox
                )}
                style={{
                  backgroundColor: color.value,
                }}
              >
                <VisuallyHidden>{color.label}</VisuallyHidden>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.timeWrapper}>
        <dl className={styles.timeDisplay}>
          <dt>Time Elapsed</dt>
          <dd>{timeElapsed}</dd>
        </dl>
        <div className={styles.actions}>
          <button onClick={() => {
            if (!isPlaying) {
              setTimeElapsed(timeElapsed + 1)
              setIsPlaying(true)
            } else {
              setIsPlaying(false)
            }
            }}>
            {isPlaying ? <Pause /> : <Play />}
            <VisuallyHidden>{isPlaying ? "Pause" : "Play"}</VisuallyHidden>
          </button>
          <button onClick={handleReset}>
            <RotateCcw />
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </div>
      </div>
    </Card>
  );
}

export default CircularColorsDemo;
