"use client";
import { useEffect, useState } from "react";
import { Input, Tag } from "antd";
import { Plus } from "lucide-react";

type Props = {
  value?: string[];                 // injected by Form.Item in controlled mode
  onChange?: (v: string[]) => void; // injected by Form.Item in controlled mode
  placeholder?: string;
};

export default function TagsInput({ value, onChange, placeholder }: Props) {
  // internal state for uncontrolled usage (or during first render before Form injects)
  const [inner, setInner] = useState<string[]>(value ?? []);
  const [draft, setDraft] = useState("");

  // keep internal state in sync if parent/Form provides value
  useEffect(() => {
    if (value) setInner(value);
  }, [value]);

  const emit = (next: string[]) => {
    setInner(next);
    onChange?.(next); // notify Form if present
  };

  const add = () => {
    const v = draft.trim();
    const list = (value ?? inner);
    if (!v || list.includes(v)) return;
    emit([...list, v]);
    setDraft("");
  };

  const remove = (t: string) => {
    const list = (value ?? inner).filter((x) => x !== t);
    emit(list);
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-2">
        {(value ?? inner).map((t) => (
          <Tag
            key={t}
            closable
            onClose={(e) => {
              e.preventDefault(); // prevent AntD removing before our state updates
              remove(t);
            }}
            className="rounded-full px-3"
          >
            {t}
          </Tag>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <Input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onPressEnter={(e) => {
            e.preventDefault();
            add();
          }}
          placeholder={placeholder || "Type and press Enter"}
          className="h-10"
        />
        <button
          type="button"
          onClick={add}
          className="inline-flex items-center gap-1 h-10 px-3 rounded-lg border border-slate-200 hover:bg-slate-50"
        >
          <Plus className="w-4 h-4" />
          Add
        </button>
      </div>
    </div>
  );
}
