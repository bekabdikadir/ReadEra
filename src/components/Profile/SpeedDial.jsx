import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import EnhancedEncryptionSharpIcon from "@mui/icons-material/EnhancedEncryptionSharp";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import SettingsSharpIcon from "@mui/icons-material/SettingsSharp";

import { useNavigate } from "react-router-dom";

const actions = [
  {
    icon: <EnhancedEncryptionSharpIcon />,
    name: "Reset password",
    path: "/password-reset",
  },
  {
    icon: <AccountCircleSharpIcon />,
    name: "Profile settings",
    path: "/profile-settings",
  },
];

export default function BasicSpeedDial() {
  const navigate = useNavigate();

  return (
    <Box sx={{ height: 320, transform: "translateZ(0px)", flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SettingsSharpIcon />}
        // direction="right"
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => navigate(action.path)}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
