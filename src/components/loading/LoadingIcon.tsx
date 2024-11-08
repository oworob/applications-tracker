import "./LoadingIcon.scss";
import { Icon } from "@iconify/react";

export default function LoadingIcon() {
  return (
    <div id="LoadingIcon" data-testid="LoadingIcon">
      <Icon icon="svg-spinners:blocks-shuffle-2" />
    </div>
  );
}
