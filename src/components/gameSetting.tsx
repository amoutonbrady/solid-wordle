import { PropsWithChildren, createUniqueId, Show } from "solid-js";

interface GameSettingsProps {
  label: string;
  hint?: string;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}

/**
 * Transform a string into a slug
 * (Thanks Copilot as always)
 */
function slugify(string: string) {
  return string
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
}

export default function GameSettings(
  props: PropsWithChildren<GameSettingsProps>
) {
  const id = createUniqueId();
  const name = () => slugify(props.label);

  return (
    <div class="flex text-gray-800 items-center py-4">
      <div class="flex flex-1 flex-col">
        <label for={id} class="text-lg font-semibold cursor-pointer">
          {props.label}
        </label>

        <Show when={props.hint}>
          <p class="text-sm text-gray-600">{props.hint}</p>
        </Show>
      </div>

      <div>
        <input
          id={id}
          name={name()}
          disabled={props.disabled}
          type="checkbox"
          class="hidden peer"
          onChange={(event) => {
            if (!props.onChange) return;
            props.onChange(event.currentTarget.checked);
          }}
        />

        <label
          for={id}
          class="relative w-8 inline-flex rounded-2xl bg-gray-600 peer-checked:bg-green-500 peer-checked:before:translate-x-full before:transition-transform p-0.5 before:w-1/2 before:aspect-square before:bg-white before:rounded-full"
          classList={{
            "cursor-not-allowed": props.disabled,
            "cursor-pointer": !props.disabled,
          }}
        ></label>
      </div>
    </div>
  );
}
