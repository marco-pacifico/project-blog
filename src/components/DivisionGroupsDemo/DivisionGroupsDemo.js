"use client";
import React from "react";
import { motion, LayoutGroup } from "framer-motion";
import { range } from "@/utils";
import Card from "@/components/Card";
import SliderControl from "@/components/SliderControl";
import Equation from "./Equation";
import styles from "./DivisionGroupsDemo.module.css";

function DivisionGroupsDemo({
  numOfItems = 11,
  initialNumOfGroups = 4,
  includeRemainderArea,
}) {
  const [numOfGroups, setNumOfGroups] = React.useState(initialNumOfGroups);

  // APPROACH FOR ANIMATION//

  // Need each item to have a unique id
  // Therefore we need to create an array of objects
  // Filter objects based on the number of groups, creating an array for each group
  // Whenever the number of groups change we need to push items from one group to another

  // Create an array of objects with unique ids for each item
  const id = React.useId(); // Get unique id for this component
  const items = range(numOfItems).map((index) => {
    return {
      id: `${id}-${index}`,
    };
  });

  const [groupsOfItems, remainderItems] = sortItemsIntoGroups(
    items,
    numOfGroups,
  );

  // When we're splitting into 1-3 groups, display side-by-side
  // columns. When we get to 4, it should switch to a 2x2 grid.
  const gridStructure =
    numOfGroups < 4
      ? {
          gridTemplateColumns: `repeat(${numOfGroups}, 1fr)`,
        }
      : {
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr",
        };

  return (
      <LayoutGroup>
        <Card as="section" className={styles.wrapper}>
          <header className={styles.header}>
            <SliderControl
              label="Number of Groups"
              className={styles.slider}
              step={1}
              min={1}
              max={4}
              value={numOfGroups}
              onChange={(ev) => setNumOfGroups(Number(ev.target.value))}
            />
          </header>

          <div className={styles.demoWrapper}>
            <div className={styles.demoArea} style={gridStructure}>
              {range(numOfGroups).map((groupIndex) => (
                <div key={groupIndex} className={styles.group}>
                  {groupsOfItems[groupIndex].map((item) => {
                    return (
                      <motion.div
                        key={item.id}
                        layoutId={item.id}
                        className={styles.item}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {includeRemainderArea && (
            <div className={styles.remainderArea}>
              <p className={styles.remainderHeading}>Remainder Area</p>

              {remainderItems.map((item) => {
                return (
                  <motion.div
                    key={item.id}
                    layoutId={item.id}
                    className={styles.item}
                  />
                );
              })}
            </div>
          )}

          <Equation
            dividend={numOfItems}
            divisor={numOfGroups}
            remainder={remainderItems.length}
          />
        </Card>
      </LayoutGroup>
  );
}

export default DivisionGroupsDemo;

// Split items into groups
function sortItemsIntoGroups(items, numOfGroups) {
  const groupsOfItems = [];
  const remainderItems = [];

  const numOfItems = items.length;
  const numOfItemsPerGroup = Math.floor(numOfItems / numOfGroups);

  for (let i = 0; i < numOfGroups; i++) {
    const start = i * numOfItemsPerGroup;
    const end = start + numOfItemsPerGroup;
    groupsOfItems.push(items.slice(start, end));
  }

  // If we have a remainder, add it to the last group
  const remainder = numOfItems % numOfGroups;
  if (typeof remainder === "number" && remainder > 0) {
    for (let i = 0; i < remainder; i++) {
      remainderItems.push(items[numOfItems - 1 - i]);
    }
  }

  return [groupsOfItems, remainderItems];
}
