import "./Select.scss";
import { Icon } from "@iconify/react";
import { useState } from "react";

export default function Select(props: any) {
  const { options, SelectedOption, SetSelectedOption, DisplayFun } = props;
  const [ShowWindow, SetShowWindow] = useState(false);

  return (
    <div id="Select">
      <div
        id="select-wrapper"
        onMouseLeave={() => {
          SetShowWindow(false);
        }}
      >
        <div id="select-header" className="input" onClick={() => SetShowWindow(!ShowWindow)}>
          {DisplayFun(SelectedOption)}
          <Icon icon="mi-chevron-down" style={{ transform: ShowWindow ? "rotate(180deg)" : "rotate(0deg)" }} />
        </div>
        <div id="select-options" hidden={!ShowWindow}>
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
