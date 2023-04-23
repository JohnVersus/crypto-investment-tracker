import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { space, position, layout } from "styled-system";
import type { SpaceProps, PositionProps, LayoutProps } from "styled-system";

interface TooltipProps extends SpaceProps, PositionProps, LayoutProps {
  children: React.ReactNode;
  content: React.ReactNode;
  visible?: boolean;
  tipPosition?: "top" | "bottom" | "dynamic";
}

const TooltipWrapper = styled.div<SpaceProps & PositionProps & LayoutProps>`
  ${space}
  ${position}
  ${layout}
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const TooltipContent = styled.div`
  background-color: #333;
  border-radius: 4px;
  color: white;
  font-size: 14px;
  padding: 8px;
  position: absolute;
  white-space: nowrap;
  z-index: 100;
`;

const TooltipArrow = styled.div`
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  position: absolute;
`;

const Tooltip = ({
  children,
  content,
  visible,
  tipPosition = "dynamic",
  ...props
}: TooltipProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState(tipPosition);

  useEffect(() => {
    setIsVisible(visible || false);
  }, [visible]);

  useEffect(() => {
    if (tipPosition === "dynamic" && wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      setTooltipPosition(rect.y > windowHeight / 2 ? "top" : "bottom");
    } else {
      setTooltipPosition(tipPosition);
    }
  }, [tipPosition]);

  const handleMouseEnter = () => {
    if (visible === undefined) setIsVisible(true);
  };

  const handleMouseLeave = () => {
    if (visible === undefined) setIsVisible(false);
  };

  return (
    <TooltipWrapper
      ref={wrapperRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
      {isVisible && (
        <>
          <TooltipContent
            style={{
              top:
                tooltipPosition === "bottom" ? "calc(100% + 5px)" : undefined,
              bottom:
                tooltipPosition === "top" ? "calc(100% + 5px)" : undefined,
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            {content}
          </TooltipContent>
          <TooltipArrow
            style={{
              top: tooltipPosition === "bottom" ? "100%" : undefined,
              bottom: tooltipPosition === "top" ? "100%" : undefined,
              left: "50%",
              transform: "translateX(-50%)",
              borderBottom:
                tooltipPosition === "bottom" ? "5px solid #333" : undefined,
              borderTop:
                tooltipPosition === "top" ? "5px solid #333" : undefined,
            }}
          />
        </>
      )}
    </TooltipWrapper>
  );
};

export default Tooltip;
