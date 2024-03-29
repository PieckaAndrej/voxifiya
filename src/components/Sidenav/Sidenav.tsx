import { Calculate, Translate } from '@mui/icons-material';
import { Button, Link } from '@mui/material';
import { FC, useEffect, useMemo, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import styles from './Sidenav.module.scss';

interface SidenavProps { }

interface Tab {
  icon: JSX.Element;
  text: string;
  path: string;
  backgroundStyle: string;
}

const Sidenav: FC<SidenavProps> = () => {
  const location = useLocation();

  const [selectedTab, setSelectedTab] = useState<Tab>();

  const tabs = useMemo<Tab[]>(() => {
    return [
      {
        icon: <Translate />,
        text: 'sentences',
        path: '/sentences',
        backgroundStyle: styles.sentencesGradient
      },
      {
        icon: <Calculate />,
        text: 'quiz',
        path: '/quiz',
        backgroundStyle: styles.quizGradient
      }
    ];
  }, []);

  useEffect(() => {
    setSelectedTab(tabs.find(tab => tab.path === location.pathname));
  }, [location, tabs, setSelectedTab]);

  const renderTabs = () => {
    return tabs.map((tab, index) => {
      return (
        <Link component={RouterLink} to={tab.path} key={index}
          sx={{ textDecoration: 'none' }} className={styles.link}>
          <Button sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <div className={tab === selectedTab ? styles.selectedIcon : styles.icon}>{tab.icon}</div>
            <div className={styles.linkText}>{tab.text}</div>
          </Button>
        </Link>
      );
    });
  };

  const renderBackground = () => {
    return tabs.map((tab, index) => {
      return (
        <div key={index}
          className={[styles.background, tab?.backgroundStyle].join(' ')}
          style={{ opacity: tab === selectedTab ? '1' : '0' }}>
        </div>
      );
    });
  };

  return (
    <div className={styles.Sidenav} data-testid='Sidenav'>
      {renderBackground()}
      {renderTabs()}
      <img className={styles.logo} src='shape-logo.svg' />
    </div>
  );
};

export default Sidenav;
