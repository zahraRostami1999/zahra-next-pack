import React from 'react';
import Link from 'next/link';
import CheckboxTable from '@/components/table/CheckboxTable';
import { FaArrowLeft, FaCheckCircle, FaTimesCircle, FaSpinner } from "react-icons/fa";

function index() {

    const renderCveStatus = (row) => {
        const { cveStatus, scanStatus } = row;

        const cveValues =
            scanStatus === "completed" && cveStatus
                ? cveStatus.split(",").map((v) => Number(v))
                : [0, 0, 0, 0];

        const colors = ["bg-red-800", "bg-red-500", "bg-orange-500", "bg-yellow-400"];

        return (
            <div className="flex justify-center gap-2">
                {cveValues.map((val, index) => (
                    <div
                        key={index}
                        className={`w-5 h-5 flex pt-0.5 items-center justify-center rounded-full text-white text-[10px] ${colors[index]
                            }`}
                    >
                        {val}
                    </div>
                ))}
            </div>
        );
    };

    const renderScanInfo = (status, date) => {
        let Icon;
        let colorClass;
        let text;

        switch (status) {
            case "completed":
                text = "کامل شده";
                Icon = <FaCheckCircle className="text-green-600 text-base" />;
                colorClass = "text-green-600";
                break;
            case "failed":
                text = "ناموفق";
                Icon = <FaTimesCircle className="text-red-600 text-base" />;
                colorClass = "text-red-600";
                break;
            default:
                text = "در حال اسکن";
                Icon = <FaSpinner className="text-yellow-500 animate-spin text-base" />;
                colorClass = "text-yellow-600";
                break;
        }

        return (
            <div className="flex flex-col items-center gap-1">
                <div className={`flex items-center gap-1 ${colorClass}`}>
                    <span className="text-sm">{text}</span>
                    {Icon}
                </div>
                <span className="text-gray-600 text-xs">{date}</span>
            </div>
        );
    };

    const columns = [
        { key: "domain", label: "دامنه" },
        { key: "bank", label: "بانک" },
        {
            key: "lastScan",
            label: "آخرین اسکن",
            render: (value, row) => renderScanInfo(row.scanStatus, row.lastScan),
        },
        {
            key: "cveStatus",
            label: "وضعیت CVE",
            render: (value, row) => renderCveStatus(row),
        },
        {
            key: "actions",
            label: "عملیات",
            render: (value, row) => (
                <div
                    className="flex justify-center cursor-pointer"
                    onClick={() => {
                        setSelected({
                            cveId: row.cveId,
                            severity: row.severity,
                        });
                        setIsModalOpen(true);
                    }}
                >
                    <FaArrowLeft size={16} />
                </div>
            ),
        },
    ];

    const data = [
        {
            id: 1,
            bank: "example",
            domain: "example.com",
            lastScan: "2023-10-01",
            scanStatus: "completed",
            cveStatus: "1,10,3,7",
        },
        {
            id: 2,
            bank: "testsite",
            domain: "testsite.com",
            lastScan: "2023-10-03",
            scanStatus: "failed",
            cveStatus: "1,3,8,4",
        },
        {
            id: 3,
            bank: "mysite",
            domain: "mysite.org",
            lastScan: "2023-09-28",
            scanStatus: "completed",
            cveStatus: "5,6,2,9",
        },
        {
            id: 4,
            bank: "mysite2",
            domain: "mysite2.org",
            lastScan: "2023-09-28",
            scanStatus: "in-progress",
            cveStatus: "",
        },
        {
            id: 5,
            bank: "mysite3",
            domain: "mysite3.org",
            lastScan: "2023-09-28",
            scanStatus: "failed",
            cveStatus: "",
        },
    ];

    const handleSelectionChange = (selectedRows) => {
        console.log("%");
    };


    return (
        <div className="px-10 py-5">
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold mb-4">Checked Table Demo</h1>
                <Link href="/" className="text-xl font-bold mb-4">
                    Back
                </Link>
            </div>
            <div className="flex justify-center items-center w-full">
                <CheckboxTable columns={columns} data={data} title="جدول داده‌های سایت" onSelectionChange={handleSelectionChange} />
            </div>
        </div>
    )
}

export default index;
