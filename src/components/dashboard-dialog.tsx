import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { useLecturesChart } from "@/lib/hooks/useLecturesChart";
import { Eye, SquareArrowOutUpRight } from "lucide-react";
import { Dispatch, PropsWithChildren, SetStateAction } from "react";
import LecturesBarChart from "./lectures-bar-chart";
import { Button } from "./ui/button";
import { ChartConfig } from "./ui/chart";
import { ChartType } from "@/types/enums/ChartType";

type DashboardLayoutProps = { currentChart: ChartType, setCurrentChart: Dispatch<SetStateAction<ChartType>> };

const viewsChartConfig: ChartConfig = {
  views: {
    label: "Views",
    icon: Eye,
  }
};

const sharingChartConfig: ChartConfig = {
  shares: {
    label: "Shares",
    icon: SquareArrowOutUpRight,
  }
}

const DashboardDialog = () => {
  const { chartSharedData, chartViewsData, currentChart, randomHexColors, setCurrentChart } = useLecturesChart();

  if (currentChart === ChartType.mostShared) {
    return (
      <DashboardLayout currentChart={currentChart} setCurrentChart={setCurrentChart}>
        <LecturesBarChart data={chartSharedData} barDataKey="shares" xAxisDataKey="name" hexColors={randomHexColors} chartConfig={sharingChartConfig} />
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout currentChart={currentChart} setCurrentChart={setCurrentChart}>
      <LecturesBarChart data={chartViewsData} barDataKey="views" xAxisDataKey="name" hexColors={randomHexColors} chartConfig={viewsChartConfig} />
    </DashboardLayout>
  )
}

const DashboardLayout = ({ children, currentChart, setCurrentChart }: PropsWithChildren<DashboardLayoutProps>) => {
  return (
    <div className="w-full">
      <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          Dashboard
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full lg:min-w-[1024px]">
        <DialogHeader>
          <DialogTitle className="text-center text-sm text-muted-foreground">
            Lecture Dashboard
          </DialogTitle>

        </DialogHeader>
        <span className="text-lg text-center">{currentChart}</span>
        <div className="flex flex-col lg:flex-row items-center">
          <div className="space-x-3 mx-auto">
            <Button 
              variant="outline" 
              size="sm" 
              className="border rounded-none border-green-900"
              onClick={() => setCurrentChart(ChartType.mostViewed)}
            >
              {ChartType.mostViewed}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="border rounded-none border-green-900"
              onClick={() => setCurrentChart(ChartType.mostShared)}
            >
              {ChartType.mostShared}
            </Button>
          </div>
        </div>
        {children}
      </DialogContent>
    </Dialog>
    </div>
  )
}

export default DashboardDialog;

