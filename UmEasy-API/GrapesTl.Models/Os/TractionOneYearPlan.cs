using System;
namespace GrapesTl.Models;

public class TractionOneYearPlan
{
    public string OneYearPlanId { get; set; }
    public string FileId { get; set; }
    public DateTime FutureDate { get; set; }
    public string Revenue { get; set; }
    public string Profit { get; set; }
    public string Measurables { get; set; }
}
