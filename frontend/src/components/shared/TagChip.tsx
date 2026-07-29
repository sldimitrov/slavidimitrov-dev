import { Chip } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import type { Tag } from "../../types";

interface TagChipProps {
  tag: Tag;
  to?: string;
  selected?: boolean;
}

export function TagChip({ tag, to, selected = false }: TagChipProps) {
  if (to) {
    return (
      <Chip
        component={RouterLink}
        to={to}
        clickable
        label={tag.name}
        size="small"
        variant={selected ? "filled" : "outlined"}
        color={selected ? "primary" : "default"}
      />
    );
  }

  return (
    <Chip
      label={tag.name}
      size="small"
      variant={selected ? "filled" : "outlined"}
      color={selected ? "primary" : "default"}
    />
  );
}
