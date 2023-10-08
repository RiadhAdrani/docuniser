import {
  Button,
  Modal,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Tooltip,
} from '@nextui-org/react';
import { useContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import About from '../About/About';
import { DataContext } from '@/context/Data.context';
import { useTranslation } from 'react-i18next';

const TopBar = () => {
  const navigate = useNavigate();

  const { t } = useTranslation();

  const { preference, setPreference } = useContext(DataContext);

  const [showAbout, setShowAbout] = useState(false);

  const leftButtons = useMemo(() => {
    return [
      {
        onClick: () => navigate(-1),
        tooltip: 'common:goBack',
        icon: 'i-mdi-chevron-left',
      },
      {
        onClick: () => navigate('/'),
        tooltip: 'common:home',
        icon: 'i-mdi-home-outline',
      },
      {
        onClick: () => window.location.reload(),
        tooltip: 'common:refresh',
        icon: 'i-mdi-refresh',
      },
    ];
  }, [preference]);

  const rightButtons = useMemo(() => {
    return [
      {
        onClick: () => setPreference({ theme: preference.theme === 'dark' ? 'light' : 'dark' }),
        tooltip: 'common:theme',
        icon: preference.theme === 'light' ? 'i-mdi-weather-sunny' : 'i-mdi-weather-night',
      },
      {
        onClick: () => setPreference({ lang: preference.lang === 'en' ? 'fr' : 'en' }),
        tooltip: `language:${preference.lang}`,
        icon: 'i-mdi-language',
      },
      {
        onClick: () => setShowAbout((state) => !state),
        tooltip: t('common:about'),
        icon: 'i-mdi-about-outline',
      },
    ];
  }, [preference]);

  return (
    <>
      <Navbar isBordered isBlurred>
        <NavbarBrand className="row gap-1">
          {leftButtons.map((it, index) => (
            <Tooltip content={t(it.tooltip)} key={index}>
              <Button isIconOnly onClick={it.onClick} variant="flat">
                <i className={it.icon}></i>
              </Button>
            </Tooltip>
          ))}
        </NavbarBrand>
        <NavbarContent justify="center">
          <NavbarItem>
            <h1>{t('common:docuniser')}</h1>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end" className="gap-1">
          {rightButtons.map((it, index) => (
            <NavbarItem key={index}>
              <Tooltip content={t(it.tooltip)}>
                <Button isIconOnly onClick={it.onClick} variant="flat">
                  <i className={it.icon}></i>
                </Button>
              </Tooltip>
            </NavbarItem>
          ))}
        </NavbarContent>
      </Navbar>
      <Modal isOpen={showAbout} onClose={() => setShowAbout(false)}>
        <About />
      </Modal>
    </>
  );
};

export default TopBar;
