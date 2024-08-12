import React from "react";
import { SOCIALS_STYLE } from "../constants/socials-style";
import { GeneratedData } from "../types/GeneratedData";

interface ColoredLineProps {
  data: GeneratedData;
}

const ColoredLine: React.FC<ColoredLineProps> = ({ data }) => {
  const postsCounts: number[] = data.map((el) =>
    el.reduce((prev, [_, postsCount]) => prev + postsCount, 0)
  );

  const totalCount = postsCounts.reduce((acc, value) => acc + value, 0);

  const percentages = postsCounts.map((value) => (value / totalCount) * 100);

  return (
    <div className="colored-line">
      {percentages.map(
        (percentage, i) =>
          postsCounts[i] > 0 && (
            <div
              key={i}
              className="colored-line-item"
              style={{ width: percentage + "%" }}>
              <div
                title={SOCIALS_STYLE[i].name}
                className="colored-line-item-line"
                style={{
                  background: SOCIALS_STYLE[i].lineColor,
                }}></div>

              <p className="colored-line-item-count">{postsCounts[i]}</p>
            </div>
          )
      )}
    </div>
  );
};

export { ColoredLine };
