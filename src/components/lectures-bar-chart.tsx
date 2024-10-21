import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts";

type BarChartProps<T> = {
  hexColors: Array<string>;
  data: Array<T>;
  xAxisDataKey: string;
  barDataKey: string;
  chartConfig: ChartConfig;
}

const LecturesBarChart = <T extends object>({ barDataKey, data, hexColors, xAxisDataKey, chartConfig }: BarChartProps<T>) => {

  return (
    <ChartContainer config={chartConfig} className="max-h-[400px] w-full">
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey={xAxisDataKey}
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value: string) => value.slice(0, 3).concat("...")}
        />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey={barDataKey} fill="var(--color-views)" radius={4}> 
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={hexColors[index]} />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  )
}

export default LecturesBarChart;
