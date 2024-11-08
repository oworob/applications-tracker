import { Icon } from "@iconify/react";
import "./Select.scss";
import { useEffect, useRef, useState } from "react";

export default function Select(props: any) {
  const { options, SelectedOption, SetSelectedOption, DisplayFun } = props;
  const [ShowWindow, SetShowWindow] = useState(false);
  const [PositionAbove, SetPositionAbove] = useState(false);
  const OptionsWindowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ShowWindow && OptionsWindowRef.current) {
      const optionsRect = OptionsWindowRef.current.getBoundingClientRect();
      // console.log(optionsRect, window.innerHeight);
      if (optionsRect.height + optionsRect.top > window.innerHeight) {
        // SetPositionAbove(true);
      } else {
        SetPositionAbove(false);
      }
    }
  }, [ShowWindow]);

  return (
    <div id="Select">
      <div
        className="select-wrapper"
        onMouseLeave={() => {
          SetShowWindow(false);
        }}
      >
        <div id="select-header" className="input" onClick={() => SetShowWindow(true)}>
          {DisplayFun(SelectedOption)}
          <Icon icon="mi-chevron-down" style={{ transform: ShowWindow ? "rotate(180deg)" : "rotate(0deg)" }} />
        </div>
        <div id="select-options" className={`${!ShowWindow ? "hidden" : ""} ${PositionAbove ? "above" : ""}`} ref={OptionsWindowRef}>
          {options.map((option: any) => {
            return (
              <button
                type="button"
                id="option"
                key={option}
                onClick={() => {
                  if (SelectedOption !== option) {
                    SetSelectedOption(option);
                  }
                  SetShowWindow(false);
                }}
                className={SelectedOption === option ? "selected" : ""}
              >
                {DisplayFun(option)}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
