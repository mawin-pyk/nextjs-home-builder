import Image from "next/image";
import Link from "next/link";

import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Button
} from "@mui/material";

import { gridToSizes } from "@/helpers/helpers";

function ArticleSection({ articles }) {
    return (
        <Box
            component="section"
            width="100%"
            minHeight="60vh"
            py={{ xs: 6, sm: 8 }}
            px={{ xs: 2, sm: 3 }}
            boxSizing="border-box"
            display="flex"
            flexDirection="column"
            gap={4}
            borderTop="1px solid"
            borderColor="divider"
        >
            <Box width="100%" maxWidth="1400px" m="0px auto" textAlign="start">
                <Typography variant="h3" fontSize="32px" fontWeight="600" gutterBottom>
                    บทความล่าสุด
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    บทความเกี่ยวกับบ้าน เคล็ดลับและความรู้
                </Typography>
            </Box>
            <Grid container spacing={4} width="100%" maxWidth="1400px" m="0px auto">
                {articles.map((article, index) => (
                    <Grid key={index} size={{ xs: 12, sm: 6, md: 3, lg: 2.4 }}>
                        <Card sx={{ height: "100%" }}>
                            <Box width="100%" height="180px" position="relative">
                                <Image
                                    src={article.images[0]}
                                    alt={`${article.name} โดย Mepatcs`}
                                    fill
                                    sizes={gridToSizes({ xs: 12, sm: 6, md: 3, lg: 2.4 }, 1400)}
                                    style={{ objectFit: "cover" }}
                                />
                            </Box>
                            <CardContent>
                                <Typography
                                    variant="h4"
                                    fontSize="18px"
                                    fontWeight="600"
                                    gutterBottom
                                    sx={{
                                        display: "-webkit-box",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        WebkitBoxOrient: "vertical",
                                        WebkitLineClamp: 1,
                                    }}
                                >
                                    {article.name}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    sx={{
                                        display: "-webkit-box",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        WebkitBoxOrient: "vertical",
                                        WebkitLineClamp: 2,
                                    }}
                                >
                                    {article.description}
                                </Typography>
                            </CardContent>
                            <Box px={2} pb={2}>
                                <Button component={Link} href={`/articles/${article.id}`} size="small" variant="outlined">
                                    อ่านต่อ
                                </Button>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Box width="100%" maxWidth="1400px" m="0px auto" display="flex" justifyContent={{ xs: "center", lg: "flex-end" }} alignItems="center">
                <Button component={Link} href="/articles" variant="contained" size="large">ดูบทความทั้งหมด</Button>
            </Box>
        </Box>
    );
}

export default ArticleSection;
