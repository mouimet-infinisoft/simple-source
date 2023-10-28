import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { Table as BootstrapTable } from 'react-bootstrap';

const CustomToggle = (Link) =>
  React.forwardRef(({ children, onClick }, ref) => (
    <Link
      to=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className="dropdown-link"
    >
      {children}
    </Link>
  ));

const Head = ({ items }) => (
  <thead>
    <tr>
      <th>&nbsp;</th>
      {items?.map((item, idx) => (
        <th key={idx}>{item}</th>
      ))}
      <th>&nbsp;</th>
    </tr>
  </thead>
);

const More = ({ file, items, Link, onChangeStatus }) => (
  <Dropdown align="end" className="dropdown-file">
    <Dropdown.Toggle as={CustomToggle(Link)}>
      <i className="ri-more-2-fill"></i>
    </Dropdown.Toggle>
    <Dropdown.Menu>
      <Dropdown.Item className="details">
        <Link to={`/apps/demandes/${file.id}`}>
          <i className="ri-information-line"></i> Ouvrir
        </Link>
      </Dropdown.Item>
      {items.map(({ className, id, icon, label }) => (
        <Dropdown.Item
          key={id}
          href="#"
          className={className}
          onClick={onChangeStatus(file, id)}
        >
          <i className={icon}></i> {label}
        </Dropdown.Item>
      ))}
    </Dropdown.Menu>
  </Dropdown>
);

const Table = ({ header, items, route, Link, moreContext, onChangeStatus }) => {
  return (
    <BootstrapTable className="table table-files" responsive>
      <Head items={header} />
      <tbody>
        {items.map((file) => {
          const { id, color, icon, columns } = file;
          const link = columns[0];
          const otherColumns = columns.slice(1);

          return (
            <tr key={id}>
              <td>
                <div className={'media-icon ' + color}>
                  <i className={icon}></i>
                </div>
              </td>

              <td>
                <h6 className="file-name">
                  <Link to={`${route}/${id}`}> {link}</Link>
                </h6>
              </td>

              {otherColumns.map((x, idx) => (
                <td key={idx}>
                  <div>{x}</div>
                </td>
              ))}

              <td>
                <More
                  file={file}
                  items={moreContext}
                  onChangeStatus={onChangeStatus}
                  Link={Link}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </BootstrapTable>
  );
};

export default Table;
