import { useMemo, useState } from "react";
import { useLecturesQuery } from "../queries";
import { generateRandomHexColors } from "../utils";
import { ChartType } from "@/types/enums/ChartType";

export const useLecturesChart = () => {
  const [currentChart, setCurrentChart] = useState<ChartType>(ChartType.mostViewed);
  const lecturesQuery = useLecturesQuery();

  const chartViewsData = useMemo(() => (lecturesQuery.data?.map((lecture) => ({
    name: lecture.title,
    views: lecture.metrics.timesVisited,
  })).sort((a, b) => a.views - b.views) ?? []), [lecturesQuery.data])

  const chartSharedData = useMemo(() => (lecturesQuery.data?.map((lecture) => ({
    name: lecture.title,
    sharing: lecture.metrics.timesShared,
  })).sort((a, b) => a.sharing - b.sharing) ?? []), [lecturesQuery.data]);

  const randomHexColors = generateRandomHexColors(lecturesQuery.data?.length ?? 0);
  
  return {currentChart, setCurrentChart, chartViewsData, chartSharedData, randomHexColors}
}
