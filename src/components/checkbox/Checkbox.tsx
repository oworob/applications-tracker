import "./Checkbox.scss";
import { Icon } from "@iconify/react";

export default function Checkbox(props: any) {
  const { checked } = props;

  return (
    <div id="Checkbox" className={checked ? "checked" : ""}>
      <Icon icon="mi-check" />
    </div>
  );
}
