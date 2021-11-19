import React from "react"
import { Link } from "react-router-dom"
import MenuList from "@mui/material/MenuList"
import MenuItem from "@mui/material/MenuItem"
import ListItemText from "@mui/material/ListItemText"
import ListItemIcon from "@mui/material/ListItemIcon"
import HomeIcon from "@mui/icons-material/Home"
import AccountBalanceIcon from "@mui/icons-material/AccountBalance"
import AutorenewIcon from "@mui/icons-material/Autorenew"
import AutoStoriesIcon from "@mui/icons-material/AutoStories"

const Menu = () => {
  return (
    <div className="nav">
      <MenuList>
        <MenuItem component={Link} to={"/"}>
          <ListItemIcon>
            <HomeIcon fontSize="large" />
          </ListItemIcon>
          <ListItemText>
            <span>Home</span>
          </ListItemText>
        </MenuItem>
        <MenuItem component={Link} to={"/cryptocurrencies"}>
          <ListItemIcon>
            <AccountBalanceIcon fontSize="large" />
          </ListItemIcon>
          <ListItemText>
            <span>Cryptocurrencies</span>
          </ListItemText>
        </MenuItem>
        <MenuItem component={Link} to={"/exchanges"}>
          <ListItemIcon>
            <AutorenewIcon fontSize="large" />
          </ListItemIcon>
          <ListItemText>
            <span>Exchanges</span>
          </ListItemText>
        </MenuItem>
        <MenuItem component={Link} to={"/news"}>
          <ListItemIcon>
            <AutoStoriesIcon fontSize="large" />
          </ListItemIcon>
          <ListItemText>
            <span>News</span>
          </ListItemText>
        </MenuItem>
      </MenuList>
    </div>
  )
}

export default Menu
