import { Edit } from '@mui/icons-material';
import { Box, Button, IconButton, Popover } from '@mui/material';
import React, { FC } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { TransparentTooltip } from '../TransparentTooltip';
import styles from './UserMenu.module.scss';

interface UserMenuProps { }

const UserMenu: FC<UserMenuProps> = () => {
  const auth = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div className={styles.UserMenu} data-testid="UserMenu">
      <Button onClick={handleClick}>
        {auth?.user?.username}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        classes={{ root: styles.popOver }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box display='flex' flexDirection='column' alignItems='center' m={2} gap='3px'>
          <span>{auth?.user?.email}</span>
          <Box display='inline-flex' alignItems='center' gap={1}>
            <span className={styles.language}>Language:</span>
            <Box display='inline-flex' alignItems='center'>
              <span>{auth?.user?.defaultLanguage?.name}</span>
              <TransparentTooltip title='Change language'>
                <IconButton onClick={() => {}} size='small'>
                  <Edit fontSize='small' />
                </IconButton>
              </TransparentTooltip>
            </Box>
          </Box>
          <Button size='small' onClick={() => auth?.logout()}>
            Logout
          </Button>
        </Box>
      </Popover>
    </div>
  );
};

export default UserMenu;
