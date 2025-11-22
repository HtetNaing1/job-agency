"use client";

import { Row, Col, Select } from "antd";
import TextInput from "@/components/atoms/TextInput";
import { Search } from "lucide-react";
import React from "react";

export type FilterSelect = {
  /** unique key for this select (used in onSelectChange) */
  key: string;
  /** current value (string) */
  value: string;
  /** width in px; defaults to 180 */
  width?: number;
  /** options list */
  options: { value: string; label: string }[];
  /** aria-label for accessibility */
  ariaLabel?: string;
};

export default function FilterBar({
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search...",
  selects = [],
  onSelectChange,
  rightSlot,
  compact = false,
}: {
  /** controlled search text */
  searchValue: string;
  /** search change handler */
  onSearchChange: (v: string) => void;
  /** placeholder text for the search input */
  searchPlaceholder?: string;
  /** one or more select filters */
  selects?: FilterSelect[];
  /** called when any select changes: (key, value) */
  onSelectChange?: (key: string, value: string) => void;
  /** optional right-side slot: buttons, chips, extra filters, etc. */
  rightSlot?: React.ReactNode;
  /** compact spacing (reduces margins) */
  compact?: boolean;
}) {
  return (
    <Row gutter={12} style={{ marginBottom: compact ? 8 : 16 }} align="middle" wrap>
      <Col flex="auto">
        <TextInput
          icon={<Search className="h-4 w-4" />}
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={onSearchChange}
          className="h-11"
        />
      </Col>

      {selects.map((s) => (
        <Col key={s.key}>
          <Select
            size="large"
            aria-label={s.ariaLabel || s.key}
            style={{ width: s.width ?? 180 }}
            value={s.value}
            onChange={(val) => onSelectChange?.(s.key, val)}
            options={s.options}
          />
        </Col>
      ))}

      {rightSlot && <Col>{rightSlot}</Col>}
    </Row>
  );
}
