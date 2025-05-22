
import { useEffect, useState } from "react";
import { HealthData, fetchHealthData } from "@/services/api";
import { StatCard } from "@/components/StatCard";
import { UsageChart } from "@/components/UsageChart";
import { DemographicsCharts } from "@/components/DemographicsCharts";
import { Heart, Wallet, Calendar, Activity, CreditCard, Building } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

export const Dashboard = () => {
  const [data, setData] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const healthData = await fetchHealthData();
        setData(healthData);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-t-2 border-primary rounded-full mx-auto"></div>
          <p className="mt-4">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-destructive">Failed to load dashboard data</p>
          <button
            className="mt-4 px-4 py-2 bg-primary text-white rounded-md"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Process claims data for activity chart
  const claimsChartData = Object.values(data.claims_data).map(claim => ({
    date: new Date(claim.claim_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    amount: claim.claim_amount
  }));

  // Create monthly data from claims
  const monthlyData = Array.from({ length: 6 }, (_, i) => {
    // Generate some sample data as we don't have enough real data
    const baseValue = data.total_limit_allocated / 10;
    return baseValue * (0.8 + Math.random() * 0.4);
  });

  // Create weekly data from claims
  const weeklyData = Array.from({ length: 4 }, (_, i) => {
    // Generate some sample data
    const baseValue = data.total_limit_allocated / 20;
    return baseValue * (0.8 + Math.random() * 0.4);
  });

  // Format claims for daily chart
  const dailyData = claimsChartData.map(item => item.amount);

  return (
    <div className="container mx-auto px-4 py-6 mt-16">
      <header className="mb-6">
        <h2 className="text-3xl font-bold mb-2">{data.hospital_name} Dashboard</h2>
        <p className="text-muted-foreground">UHID: {data.claimbook_uhid}</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Limit"
          value={`₹${data.total_limit_allocated.toLocaleString()}`}
          description="Total allocated credit limit"
          icon={<Wallet size={20} />}
          trend={{ value: data.current_limit_utilised_percentage, isPositive: false }}
        />
        <StatCard
          title="Utilized Credit"
          value={`₹${data.current_limit_utilised.toLocaleString()}`}
          description="Current limit utilized"
          icon={<CreditCard size={20} />}
          trend={{ value: data.current_limit_utilised_percentage, isPositive: true }}
        />
        <StatCard
          title="Available Funds"
          value={`₹${data.current_unutilised_funds.toLocaleString()}`}
          description="Remaining credit available"
          icon={<Building size={20} />}
          trend={{ value: data.current_unutilised_funds_percentage, isPositive: true }}
        />
        <StatCard
          title="Next Repayment"
          value={`₹${data.amount_to_be_repaid_on_upcoming_date.toLocaleString()}`}
          description={`Due on ${new Date(data.upcoming_repayment_date).toLocaleDateString()}`}
          icon={<Calendar size={20} />}
          trend={{ value: 0, isPositive: false }}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 mb-8">
        <UsageChart
          dailyData={dailyData}
          weeklyData={weeklyData}
          monthlyData={monthlyData}
        />
      </div>

      {/* Claims Data Table */}
      <Card className="glass-card shadow-lg mb-8">
        <CardHeader>
          <CardTitle>Recent Claims</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Claim ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.values(data.claims_data).map((claim) => (
                  <TableRow key={claim.claim_id}>
                    <TableCell className="font-medium">{claim.claim_id}</TableCell>
                    <TableCell>{new Date(claim.claim_date).toLocaleDateString()}</TableCell>
                    <TableCell>₹{claim.claim_amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${claim.claim_status === 'Paid'
                        ? 'bg-green-500/20 text-green-500'
                        : 'bg-amber-500/20 text-amber-500'
                        }`}>
                        {claim.claim_status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="glass-card shadow-lg">
          <CardHeader>
            <CardTitle>Credit Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <DemographicsCharts
                ageGroups={{
                  "Utilized": data.current_limit_utilised_percentage,
                  "Available": data.current_unutilised_funds_percentage
                }}
                genderDistribution={{
                  "Disbursals": data.disbursals_amount,
                  "Repayments": data.repayments_amount,
                  "Interest": data.total_interest_amount
                }}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card shadow-lg">
          <CardHeader>
            <CardTitle>Repayment Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Repayment Tenure</p>
                <p className="text-lg font-semibold">{data.repayment_tenure}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Upcoming Repayment</p>
                <p className="text-lg font-semibold">{new Date(data.upcoming_repayment_date).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Amount Repaid to Date</p>
                <p className="text-lg font-semibold">₹{data.amount_repaid_to_date.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Due</p>
                <p className="text-lg font-semibold">₹{data.total_due.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Interest Paid</p>
                <p className="text-lg font-semibold">₹{data.interest_paid_on_borrowed_amt_to_date.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Subvention Per Claim</p>
                <p className="text-lg font-semibold">₹{data.subvention_per_claim.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-6 mt-10 text-center">
        <p className="text-muted-foreground">
          Thank you ⭐ for the opportunity . Devvansh Sharma ❤️
        </p>
      </footer>
    </div>
  );
};
