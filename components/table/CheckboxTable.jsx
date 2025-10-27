import React, { useState, useMemo, useEffect } from "react";
import Pagination from "./Pagination";

function CheckboxTable({ columns, data = [], title, onSelectionChange, idKey = "id" }) {
    const [pageNumber, setPageNumber] = useState(1);
    const [selectedIds, setSelectedIds] = useState([]);
    const itemsPerPage = 5;

    const paginatedData = useMemo(() => {
        const start = (pageNumber - 1) * itemsPerPage;
        return data.slice(start, start + itemsPerPage);
    }, [data, pageNumber]);

    const totalPage = Math.ceil(data.length / itemsPerPage);

    useEffect(() => {
        if (typeof onSelectionChange === "function") {
            const selectedRows = data.filter((row) => selectedIds.includes(row[idKey]));
            onSelectionChange(selectedRows);
        }
    }, [selectedIds, data, idKey, onSelectionChange]);

    const handleToggleRow = (id) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
        );
    };

    const handleToggleAll = () => {
        const pageIds = paginatedData.map((item) => item[idKey]);
        const allSelected = pageIds.every((id) => selectedIds.includes(id));
        const someSelected = pageIds.some((id) => selectedIds.includes(id));

        setSelectedIds((prev) => {
            if (allSelected) {
                return prev.filter((id) => !pageIds.includes(id));
            } else {
                return [...new Set([...prev, ...pageIds])];
            }
        });
    };

    return (
        <div className="bg-white w-full rounded-lg">
            <div className="bg-white px-5 pt-2 shadow-md rounded-lg min-w-[600px] overflow-hidden h-[410px]">
                {title && (
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-right font-bold text-lg text-[#424242]">{title}</h2>
                    </div>
                )}
                <table className="table-auto w-full text-gray-700 rounded-lg text-center overflow-hidden p-4">
                    <thead>
                        <tr className="bg-neutral-100 text-[#2F2F2F]">
                            <th className="p-4 whitespace-nowrap">
                                <input
                                    type="checkbox"
                                    checked={
                                        paginatedData.length > 0 &&
                                        paginatedData.every((item) =>
                                            selectedIds.includes(item[idKey])
                                        )
                                    }
                                    onChange={handleToggleAll}
                                    className="cursor-pointer w-4 h-4"
                                />
                            </th>
                            {columns.map((col, idx) => (
                                <th key={idx} className="p-4 whitespace-nowrap">
                                    {col.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.length > 0 ? (
                            paginatedData.map((row, rowIdx) => {
                                const rowId = row[idKey] ?? rowIdx;
                                const checked = selectedIds.includes(rowId);
                                return (
                                    <tr
                                        key={rowId}
                                        className="border-b border-[#E8E8E8] hover:bg-neutral-50 text-[#6F6F6F]"
                                    >
                                        <td className="p-3 whitespace-nowrap">
                                            <input
                                                type="checkbox"
                                                checked={checked}
                                                onChange={() => handleToggleRow(rowId)}
                                                className="cursor-pointer w-4 h-4"
                                            />
                                        </td>
                                        {columns.map((col, colIdx) => (
                                            <td
                                                key={colIdx}
                                                className="py-1 whitespace-nowrap text-center align-middle"
                                            >
                                                {col.render ? col.render(row[col.key], row) : row[col.key]}
                                            </td>
                                        ))}
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={columns.length + 1} className="py-5 text-gray-400">
                                    موردی یافت نشد.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className="flex justify-start p-3">
                    <Pagination
                        setPageNumber={setPageNumber}
                        totalPages={totalPage || 1}
                        pageNumber={pageNumber}
                    />
                </div>
            </div>
        </div>
    );
}

export default CheckboxTable;
