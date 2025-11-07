
import { useRef } from "react";
import { useChart } from "../hooks/useChart";
import type { ChartData } from "../types";
import './chart.css';

const LineChart = (chartData: ChartData) => {
    // Ref to store chart containing html element
    const chartRef = useRef<HTMLDivElement>(null);

    // Shared custom hook
    useChart(chartRef, 'line', chartData);

    return (<div id='chart-root' ref={chartRef} />)
};

export default LineChart;