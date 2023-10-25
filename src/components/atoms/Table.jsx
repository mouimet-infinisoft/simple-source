import React from 'react';
import { Dropdown } from 'bootstrap';
import { Link } from 'react-router-dom';
import { Table as BootstrapTable } from 'react-bootstrap';

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
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
  <head>
    <tr>
      <th>&nbsp;</th>
      {items?.map((item, idx) => (
        <th key={idx}>{item}</th>
      ))}
      <th>&nbsp;</th>
    </tr>
  </head>
);

const More = ({ file, items, onChangeStatus }) => {
  <Dropdown align="end" className="dropdown-file">
    <Dropdown.Toggle as={CustomToggle}>
      <i className="ri-more-2-fill"></i>
    </Dropdown.Toggle>
    <Dropdown.Menu>
      <Dropdown.Item className="details">
        <Link to={`/apps/demandes/${file.id}`}>
          {' '}
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
  </Dropdown>;
};

const Table = ({ header, items, route, moreContext, onChangeStatus }) => {
  console.log(11, header)
  return (
    <BootstrapTable className="table table-files" responsive>
      <Head items={header} />

      {/* <tbody>
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
                />
              </td>
            </tr>
          );
        })}
      </tbody> */}
    </BootstrapTable>
  );
};

export default Table;
