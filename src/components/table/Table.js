import './Table.scss';
import { memo } from 'react';

const Table = memo(({ headers, data }) => (
  <table className='table'>
    <thead>
      <tr>
        {headers.map(header => (
          <th key={`header-${header}`}>{header}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((row, i) => (
        <tr key={`row-${i}`}>
          {Object.keys(row).map((field, j) => (
            <td key={`field-${j}-${i}`}>{row[field]}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
));

export default Table;
