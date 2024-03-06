import styled from "@emotion/styled";
import { TooltipProps, Tooltip, tooltipClasses } from "@mui/material";
import theme from '.././theme.ts';

export const TransparentTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.primary.main+'33',
    backdropFilter: 'blur(10px)'
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.primary.main+'33',
    backdropFilter: 'blur(10px)'
  },
}));