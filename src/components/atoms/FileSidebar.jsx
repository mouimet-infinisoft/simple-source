import PerfectScrollbar from 'react-perfect-scrollbar';
import { Button, Nav } from 'react-bootstrap';

const FileSidebar = ({
  links,
  filterLabel,
  buttonCreateLabel,
  isActive = () => {},
  onClickFilter = () => {},
  onCreate = () => {},
}) => (
  <PerfectScrollbar>
    <div className="d-grid mb-4">
      <Button variant="primary" onClick={onCreate}>
        {buttonCreateLabel}
      </Button>
    </div>

    <label className="sidebar-label mb-2">{filterLabel}</label>

    <Nav className="nav-sidebar mb-4">
      {links?.map(({ icon, id, label }) => (
        <Nav.Link
          href=""
          key={id}
          className={isActive(id)}
          onClick={onClickFilter(id)}
        >
          <i className={icon}></i> {label}
        </Nav.Link>
      ))}
    </Nav>
  </PerfectScrollbar>
);

export default FileSidebar;
