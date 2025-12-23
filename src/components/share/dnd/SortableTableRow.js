"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import {
    TableRow,
    TableCell,
    IconButton,
} from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

function SortableTableRow({
    id,
    children,
    disabled = false,
}) {
    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
    } = useSortable({ id, disabled });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <TableRow
            ref={setNodeRef}
            style={style}
            hover
        >
            <TableCell width={48}>
                <IconButton
                    size="small"
                    {...attributes}
                    {...listeners}
                    disabled={disabled}
                >
                    <DragIndicatorIcon />
                </IconButton>
            </TableCell>

            {children}
        </TableRow>
    );
}

export default SortableTableRow;