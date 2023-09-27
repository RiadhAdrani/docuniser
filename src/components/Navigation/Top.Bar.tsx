import {
  Button,
  Chip,
  Input,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react';
import { Link, useNavigate } from 'react-router-dom';

const TopBar = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar className="bg-zinc-100">
        <NavbarBrand className="row gap-2">
          <Button isIconOnly onClick={() => navigate(-1)}>
            <i className="i-mdi-chevron-left"></i>
          </Button>
          <Link to={'/'}>
            <Button>
              <i className="i-mdi-book"></i> Homganizer
            </Button>
          </Link>
        </NavbarBrand>
        <NavbarContent justify="center">
          <NavbarItem>
            <Input placeholder="Search documents..." variant="faded" />
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <Button>About</Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </>
  );
};

export default TopBar;
