import PerfectScrollbar from 'react-perfect-scrollbar';
import { Button, Nav } from 'react-bootstrap';

const ListSideBar = ({
  buttonAddLabel,
  totalLabel,
  basketLabel,
  totalAmount,
  onClickCreate,
}) => {
  return (
    <PerfectScrollbar className="sidebar-list">
      <div className="mb-4">
        <Button
          variant="primary"
          className="btn-contact-new"
          onClick={onClickCreate}
        >
          <i className="ri-add-fill"></i>
          {buttonAddLabel}
        </Button>
      </div>

      <Nav className="nav-sidebar">
        <Nav.Link href="" className="active">
          <i className="ri-contacts-fill"></i>
          {totalLabel}
          <small>{totalAmount}</small>
        </Nav.Link>
        <Nav.Link href="">
          <i className="ri-delete-bin-line"></i>
          {basketLabel}
        </Nav.Link>
      </Nav>
    </PerfectScrollbar>
  );
};

export default ListSideBar;
