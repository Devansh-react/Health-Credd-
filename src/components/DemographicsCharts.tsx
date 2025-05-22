
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface AgeGroupData {
  [key: string]: number;
}

interface GenderData {
  [key: string]: number;
}

interface DemographicsChartsProps {
  ageGroups: AgeGroupData;
  genderDistribution: GenderData;
}

export const DemographicsCharts = ({
  ageGroups,
  genderDistribution
}: DemographicsChartsProps) => {

  // Transform age data for chart
  const ageData = Object.entries(ageGroups).map(([name, value]) => ({
    name,
    value
  }));

  // Transform gender data for chart
  const genderData = Object.entries(genderDistribution).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1), // Capitalize first letter
    value
  }));

  // Colors for charts
  const GENDER_COLORS = ['#0F87E4', '#9DDCFD', '#064577'];
  const AGE_COLORS = ['#0F87E4', '#3BA3F7', '#64BEFA', '#9DDCFD', '#E9F7FE'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="glass-card shadow-lg">
        <CardHeader>
          <CardTitle>Credit Utilization</CardTitle>
          <CardDescription>Allocated vs Available</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  fill="#8884d8"
                  paddingAngle={3}
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  labelLine={false}
                >
                  {ageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={AGE_COLORS[index % AGE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => [`${value}%`, 'Percentage']}
                  contentStyle={{ backgroundColor: 'rgba(30, 41, 59, 0.9)', border: '1px solid rgba(255, 255, 255, 0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card shadow-lg overflow-hidden">
        <CardHeader>
          <CardTitle>Financial Distribution</CardTitle>
          <CardDescription>Disbursals, Repayments, Interest</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[260px] w-full max-w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  fill="#8884d8"
                  paddingAngle={3}
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  labelLine={false}
                >
                  {genderData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={GENDER_COLORS[index % GENDER_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Amount']}
                  contentStyle={{ backgroundColor: 'rgba(30, 41, 59, 0.9)', border: '1px solid rgba(255, 255, 255, 0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
