import { Typography, Stack } from "@mui/material";
import { PlanPremiumIcon } from "src/assets/icons";

export const RenderInfo = ({ extraContent, title, subtitle }) => (
    <>
      <Stack spacing={1} sx={{ my: 2 }}>
        <Typography variant="h3">{title}</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {subtitle}
        </Typography>
        {extraContent}
      </Stack>
    </>
  );