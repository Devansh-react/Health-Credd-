
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

interface UsageChartProps {
  dailyData: number[];
  weeklyData: number[];
  monthlyData: number[];
}

export const UsageChart = ({ dailyData, weeklyData, monthlyData }: UsageChartProps) => {
  // Data transformation
  const getFormattedData = (data: number[], period: string) => {
    return data.map((value, index) => {
      let label = "";
      if (period === "daily") {
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        label = days[index % 7];
      } else if (period === "weekly") {
        label = `Week ${index + 1}`;
      } else {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        label = months[index % 12];
      }
      return { name: label, value };
    });
  };

  const [activeTab, setActiveTab] = useState("daily");
  const [chartData, setChartData] = useState(getFormattedData(dailyData, "daily"));

  useEffect(() => {
    switch (activeTab) {
      case "daily":
        setChartData(getFormattedData(dailyData, "daily"));
        break;
      case "weekly":
        setChartData(getFormattedData(weeklyData, "weekly"));
        break;
      case "monthly":
        setChartData(getFormattedData(monthlyData, "monthly"));
        break;
      default:
        setChartData(getFormattedData(dailyData, "daily"));
    }
  }, [activeTab, dailyData, weeklyData, monthlyData]);

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card p-2 border border-border rounded-md shadow-md">
          <p className="text-sm font-medium">{label}</p>
          <p className="text-primary font-bold">{`${payload[0].value} Users`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="glass-card shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>User Activity</CardTitle>
            <CardDescription>Active users over time</CardDescription>
          </div>
          <Tabs defaultValue="daily" value={activeTab} onValueChange={setActiveTab} className="w-auto">
            <TabsList>
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{
                top: 5,
                right: 10,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="name" 
                stroke="#888888" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
              />
              <YAxis 
                stroke="#888888" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false}
                tickFormatter={(value) => `${value}`} 
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#0F87E4"
                strokeWidth={2}
                activeDot={{ r: 6, fill: "#0F87E4" }}
                dot={{ r: 4, fill: "#0F87E4" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
