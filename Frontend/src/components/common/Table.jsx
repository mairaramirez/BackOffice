import s from './Table.module.css'

export default function Table({ columns=[], rows=[], getKey=(r,i)=>i, renderActions }){
  return (
    <div role="region" aria-label="Tabla de datos">
      <table className={s.table}>
        <thead className={s.thead}>
          <tr className={s.tr}>
            {columns.map(col=> <th key={col.key||col.header} className={s.th}>{col.header}</th>)}
            {renderActions && <th className={s.th}>Acción</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((row,i)=> (
            <tr key={getKey(row,i)} className={s.tr}>
              {columns.map(col=> (
                <td key={col.key||col.header} className={s.td}>{col.render? col.render(row[col.accessor], row) : row[col.accessor]}</td>
              ))}
              {renderActions && <td className={s.td}><div className={s.actions}>{renderActions(row)}</div></td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
