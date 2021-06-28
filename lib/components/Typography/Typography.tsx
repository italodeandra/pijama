import {
  Typography as MuiTypography,
  TypographyProps as MuiTypographyProps,
} from "@material-ui/core"
import { OverridableComponent } from "@material-ui/core/OverridableComponent"
import { TypographyTypeMap } from "@material-ui/core/Typography/Typography"

export interface TypographyProps extends MuiTypographyProps {}

export const Typography: OverridableComponent<
  TypographyTypeMap<MuiTypographyProps>
> = MuiTypography
