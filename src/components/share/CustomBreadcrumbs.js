import Link from "next/link";

import {
    Breadcrumbs,
    Typography
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

function CustomBreadcrumbs({ items }) {
    return (
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
            {items.map((item, index) =>
                item.href ? (
                    <Link
                        key={index}
                        href={item.href}
                        style={{  color: "inherit" }}
                    >
                        {item.label}
                    </Link>
                ) : (
                    <Typography key={index} color="primary">
                        {item.label}
                    </Typography>
                )
            )}
        </Breadcrumbs>
    );
}

export default CustomBreadcrumbs;