"use client";

import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { TableBody } from "@mui/material";

function SortableTableBody({
    items,
    getId,
    children,
}) {
    return (
        <SortableContext items={items.map(getId)} strategy={verticalListSortingStrategy}>
            <TableBody>
                {items.map((item, index) =>
                    children(item, index)
                )}
            </TableBody>
        </SortableContext>
    );
}

export default SortableTableBody;