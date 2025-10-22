import React from 'react';
import dynamic from 'next/dynamic';
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import Link from 'next/link';

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const DynamicPie = dynamic(() => import('react-chartjs-2').then((mod) => mod.Pie), { ssr: false });

function index() {

    const pieData = {
        labels: ['محصول A', 'محصول B', 'محصول C'],
        datasets: [
            {
                label: 'سهم بازار',
                data: [40, 30, 20],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
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
                <h1 className="text-2xl font-bold mb-4">Pie Chart Demo</h1>
                <Link href="/" className="text-xl font-bold mb-4">
                    Back
                </Link>
            </div>
            <div className="flex justify-center items-center w-full">
                <div className="bg-white p-6 rounded-lg shadow-lg w-[300px]">
                    <h2 className="text-xl font-semibold mb-4 text-center">نمودار دایره‌ای - سهم بازار</h2>
                    <DynamicPie data={pieData} options={chartOptions} />
                </div>
            </div>
        </div>
    )
}

export default index;