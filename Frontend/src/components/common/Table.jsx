import s from './Table.module.css'

export default function Table({
  columns = [],
  rows = [],
  sort,
  getKey = (r, i) => i,
  renderActions,
  onRowClick
}) {
  return (
    <div role="region" aria-label="Tabla de datos">
      <table className={s.table}>

        <thead className={s.thead}>
          <tr className={s.tr}>
            {columns.map(col => (
              <th
                key={col.key || col.header}
                className={`${s.th} ${col.onSort ? s.sortable : ''}`}
                onClick={col.onSort}
                role={col.onSort ? 'button' : undefined}
                tabIndex={col.onSort ? 0 : undefined}
                onKeyDown={
                  col.onSort
                    ? (e) => (e.key === 'Enter' || e.key === ' ') && col.onSort()
                    : undefined
                }
              >
                <span className={s.thContent}>
                  {col.header}

                  {sort?.key === col.accessor && (
                    <span className={s.sortIcon}>
                      {sort.dir === 'asc' ? '▲' : '▼'}
                    </span>
                  )}
                </span>
              </th>


            ))}
            {renderActions && <th className={s.th}>Acción</th>}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, i) => (
            <tr
              key={getKey(row, i)}
              className={`${s.tr} ${onRowClick ? s.clickable : ''}`}
              onClick={() => onRowClick?.(row)}
            >

              {columns.map(col => (
                <td
                  key={col.key || col.header}
                  className={`${s.td} ${col.align ? s[col.align] : ''}`}
                >
                  {col.render
                    ? col.render(row[col.accessor], row)
                    : row[col.accessor]}
                </td>
              ))}

              {renderActions && (
                <td className={s.td}>
                  <div className={s.actions}>{renderActions(row)}</div>
                </td>
              )}
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}
