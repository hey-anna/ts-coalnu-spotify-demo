import { Tooltip, TooltipProps } from "@mui/material";
import { Box, Typography } from "@mui/material";
import { ReactElement } from "react";

interface LoginTooltipWrapperProps
  extends Omit<TooltipProps, "title" | "children"> {
  children: ReactElement;
  title?: string;
  description?: string;
}

const BasicTooltip = ({
  children,
  title = "플레이리스트를 만드세요.",
  description = "플레이리스트를 만들고 공유하려면 로그인하세요.",
  placement = "right",
  arrow = true,
  ...rest
}: LoginTooltipWrapperProps) => {
  return (
    <Tooltip
      title={
        <Box>
          <Typography fontWeight={700}>{title}</Typography>
          <Typography fontSize="0.75rem">{description}</Typography>
        </Box>
      }
      placement={placement}
      arrow={arrow}
      {...rest}
    >
      {children}
    </Tooltip>
  );
};

export default BasicTooltip;
