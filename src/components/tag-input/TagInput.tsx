import { Icon } from "@iconify/react";
import "./TagInput.scss";

export default function TagInput(props: any) {
  const { Tags, SetTags, placeholder } = props;
  return (
    <div id="TagInput">
      {Tags.map((tag: string) => (
        <button
          className="tag primary"
          key={tag}
          onClick={() => {
            const tags = Tags.filter((t: string) => t !== tag);
            SetTags(tags);
          }}
        >
          {tag}
          <Icon icon="mi-close" />
        </button>
      ))}

      <input
        type="text"
        id="tag-input"
        placeholder={placeholder}
        onKeyDown={(e) => {
          if ([",", "Enter", "Tab"].includes(e.key)) {
            e.preventDefault();
            if (e.currentTarget.value !== "" && !Tags.includes(e.currentTarget.value.trim())) {
              SetTags([...Tags, e.currentTarget.value.trim()]);
              e.currentTarget.value = "";
            }
          } else if (e.key === "Backspace" && e.currentTarget.value === "") {
            const tags = Tags.slice(0, Tags.length - 1);
            SetTags(tags);
          }
        }}
      />
    </div>
  );
}
