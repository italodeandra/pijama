import userIcon from "@iconify/icons-heroicons-outline/user";
import { Menu, MenuItem } from "@material-ui/core";
import { bindMenu, bindTrigger } from "material-ui-popup-state";
import { usePopupState } from "material-ui-popup-state/hooks";
import { Fragment } from "react";
import IconButton from "../../../lib/components/IconButton";
import Gray from "../../../lib/styles/colors/Gray";
import Icon from "../../../lib/components/Icon";

const UserSection = () => {
  const popupState = usePopupState({
    popupId: "user-popup-menu",
    variant: "popover",
  });

  const handleSignOutClick = () => {
    popupState.close();
    // import { signOut } from "next-auth/client";
    // signOut().catch(console.error);
  };

  return (
    <Fragment>
      <IconButton
        color="inherit"
        edge="end"
        size="small"
        sx={{
          "&:hover": {
            bgcolor: Gray.N300,
          },
          bgcolor: Gray.N200,
          ml: 2,
          mr: {
            sm: -2,
            xs: -1,
          },
        }}
        {...bindTrigger(popupState)}
      >
        <Icon icon={userIcon} />
      </IconButton>
      <Menu {...bindMenu(popupState)}>
        <MenuItem onClick={handleSignOutClick}>Exit</MenuItem>
      </Menu>
    </Fragment>
  );
};

export default UserSection;
