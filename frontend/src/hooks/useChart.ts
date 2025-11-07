import { useEffect } from 'react';
import * as echarts from 'echarts';
import type { ChartData } from '../types';

export const useChart = (chartRef: React.RefObject<HTMLDivElement | null>, type: 'line' | 'pie' | 'bar', chartData?: ChartData) => {

    useEffect(() => {

        if (!chartData) {
            return;
        }
        // Extract data, labels
        const { current: chartDom } = chartRef;
        if (!chartDom || !chartData) return;

        // Get hold of chart containing element
        const { data, labels, title } = chartData;

        // Create a chart object
        const chart = echarts.init(chartDom, null, { renderer: 'canvas' });

        // Setup chart config options
        let option = {
            title: {
                text: title,
                left: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            xAxis: {
                data: labels
            },
            yAxis: {},
            series: [
                {
                    type,
                    data,
                    smooth: false,
                    showBackground: true,
                    backgroundStyle: {
                        color: 'rgba(180, 180, 180, 0.2)'
                    }
                }
            ]
        } as any;
        if (type === 'line') {
            option.series[0].smooth = true;
        }

        if (type === 'pie') {
            const _data = data.map((value, index) => ({ value, name: labels[index] }));
            option = {
                title: {
                    text: title,
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'horizontal',
                    left: 'left'
                },
                series: [
                    {
                        type,
                        data: _data,
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
        }

        // Render chart
        chart.setOption(option);

        // Clean up chart from DOM when view is destroyed 
        return () => chart.dispose();

    }, [chartData, chartRef, type]);

}