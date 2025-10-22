import React from 'react';
import Link from 'next/link';
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import dynamic from 'next/dynamic';
ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const DynamicBar = dynamic(() => import('react-chartjs-2').then((mod) => mod.Bar), { ssr: false });


function index() {
    const barData = {
        labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد'],
        datasets: [
            {
                label: 'فروش ماهانه (میلیون تومان)',
                data: [12, 19, 3, 5, 2],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                enabled: true,
            },
        },
    };

    return (
        <div className="px-10 py-5">
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold mb-4">Bar Chart Demo</h1>
                <Link href="/" className="text-xl font-bold mb-4">
                    Back
                </Link>
            </div>
            <div className="flex justify-center items-center w-full">
                <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
                    <h2 className="text-xl font-semibold mb-4 text-center">نمودار ستونی - فروش ماهانه</h2>
                    <DynamicBar data={barData} options={chartOptions} />
                </div>
            </div>
        </div>
    )
}

export default index;