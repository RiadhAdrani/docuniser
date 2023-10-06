import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Tooltip,
} from '@nextui-org/react';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import About from '../About/About';

const TopBar = () => {
  const navigate = useNavigate();

  const [showAbout, setShowAbout] = useState(false);

  const leftButtons = useMemo(() => {
    return [
      {
        onClick: () => navigate(-1),
        tooltip: 'Go back',
        icon: 'i-mdi-chevron-left',
      },
      {
        onClick: () => navigate('/'),
        tooltip: 'Home',
        icon: 'i-mdi-home-outline',
      },
    ];
  }, []);

  const rightButtons = useMemo(() => {
    return [
      {
        onClick: () => 0,
        tooltip: 'Refresh',
        icon: 'i-mdi-refresh',
      },
      {
        onClick: () => 0,
        tooltip: 'Language',
        icon: 'i-mdi-language',
      },
      {
        onClick: () => setShowAbout((state) => !state),
        tooltip: 'About',
        icon: 'i-mdi-about-outline',
      },
    ];
  }, []);

  return (
    <>
      <Navbar isBordered isBlurred>
        <NavbarBrand className="row gap-1">
          {leftButtons.map((it, index) => (
            <Tooltip content={it.tooltip} key={index}>
              <Button isIconOnly onClick={it.onClick} variant="flat">
                <i className={it.icon}></i>
              </Button>
            </Tooltip>
          ))}
        </NavbarBrand>
        <NavbarContent justify="center">
          <NavbarItem>
            <h1>Docuniser</h1>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end" className="gap-1">
          {rightButtons.map((it, index) => (
            <NavbarItem key={index}>
              <Tooltip content={it.tooltip}>
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
