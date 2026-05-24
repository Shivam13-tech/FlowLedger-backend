import * as repo from "./analytics.repository";

export const getDashboard = async (orgId: string) => {
  const [currentMonth, topDepts, status, trend] = await Promise.all([
    repo.getCurrentMonthSpend(orgId),
    repo.getTopDepartments(orgId),
    repo.getExpenseStatusBreakdown(orgId),
    repo.getMonthlyTrend(orgId),
  ]);

  return {
    currentMonthSpend: currentMonth.total_spent,
    topDepartments: topDepts,
    statusBreakdown: status,
    monthlyTrend: trend,
  };
};
