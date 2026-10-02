import Image from "next/image";

import {
    Box,
    Typography
} from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { gridToSizes } from "@/helpers/helpers";

// โทนสีอิงจาก theme primary (#845ef7)
const PURPLE_BORDER = "rgba(132, 94, 247, 0.3)";
const PURPLE_SHADOW = "0 12px 28px rgba(132, 94, 247, 0.18)";

const clampSx = (lines) => ({
    display: "-webkit-box",
    overflow: "hidden",
    textOverflow: "ellipsis",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: lines,
});

function ArticleCard({ article }) {
    return (
        <Box
            height="100%"
            boxSizing="border-box"
            display="flex"
            flexDirection="column"
            border="1px solid"
            borderColor="divider"
            bgcolor="background.paper"
            sx={{
                color: "text.primary",
                transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: PURPLE_SHADOW,
                    borderColor: PURPLE_BORDER,
                },
                "&:hover .article-img": { transform: "scale(1.08)" },
                "&:hover .article-arrow": { transform: "translateX(4px)" },
            }}
        >
            <Box width="100%" height="200px" position="relative" overflow="hidden">
                <Image
                    src={article.images[0]}
                    alt={`${article.title}`}
                    fill
                    sizes={gridToSizes({ xs: 12, sm: 6, lg: 3 }, 1400)}
                    className="article-img"
                    style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
                />
            </Box>
            <Box p={3} flexGrow={1} display="flex" flexDirection="column" gap={1}>
                <Box display="flex" alignItems="center" gap={0.5} color="primary.main">
                    <AccessTimeIcon fontSize="small" />
                    <Typography variant="overline" fontWeight="600" letterSpacing="0.1em" lineHeight={1.6}>
                        {article.createdAt.split(" ")[0]}
                    </Typography>
                </Box>
                <Typography
                    variant="h4"
                    fontSize="18px"
                    fontWeight="600"
                    sx={clampSx(2)}
                >
                    {article.title}
                </Typography>
                <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={clampSx(2)}
                >
                    {article.description}
                </Typography>
                <Box mt="auto" pt={2} display="flex" alignItems="center" gap={0.5} color="primary.main">
                    <Typography variant="body2" fontWeight="600">อ่านบทความ</Typography>
                    <ArrowForwardIcon
                        fontSize="small"
                        className="article-arrow"
                        sx={{ transition: "transform 0.3s ease" }}
                    />
                </Box>
            </Box>
        </Box>
    );
}

export default ArticleCard;
