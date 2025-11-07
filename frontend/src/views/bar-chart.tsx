import { useRef, type FC } from 'react';
import './chart.css';
import type { ChartData } from '../types';
import { useChart } from '../hooks/useChart';

type ChartProps = {
    chartData?: ChartData;
}
const BarChart: FC<ChartProps> = ({ chartData }) => {

    // Ref to store chart containing html element
    const chartRef = useRef<HTMLDivElement>(null);

    // Shared custom hook
    useChart(chartRef, 'bar', chartData);
    if (!chartData) {
        return null;
    }

    return (<div className="card">
        <div className='chart-root' ref={chartRef} />
    </div>)
};

export default BarChart;