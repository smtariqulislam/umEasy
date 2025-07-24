namespace GrapesTl.Models;

public class ScoreCard
{
    public string ScoreCardId { get; set; }
    public string Particular { get; set; }
    public string MeetingId { get; set; }
    public string DepartmentId { get; set; }

}


public class ScoreCardView : ScoreCard
{
    public string DepartmentName { get; set; }

    public double JanBudget { get; set; }
    public double JanActual { get; set; }
    public double JanVariance { get; set; }

    public double FebBudget { get; set; }
    public double FebActual { get; set; }
    public double FebVariance { get; set; }

    public double MarBudget { get; set; }
    public double MarActual { get; set; }
    public double MarVariance { get; set; }

    public double AprBudget { get; set; }
    public double AprActual { get; set; }
    public double AprVariance { get; set; }

    public double MayBudget { get; set; }
    public double MayActual { get; set; }
    public double MayVariance { get; set; }

    public double JunBudget { get; set; }
    public double JunActual { get; set; }
    public double JunVariance { get; set; }

    public double JulBudget { get; set; }
    public double JulActual { get; set; }
    public double JulVariance { get; set; }

    public double AugBudget { get; set; }
    public double AugActual { get; set; }
    public double AugVariance { get; set; }

    public double SepBudget { get; set; }
    public double SepActual { get; set; }
    public double SepVariance { get; set; }

    public double OctBudget { get; set; }
    public double OctActual { get; set; }
    public double OctVariance { get; set; }

    public double NovBudget { get; set; }
    public double NovActual { get; set; }
    public double NovVariance { get; set; }

    public double DecBudget { get; set; }
    public double DecActual { get; set; }
    public double DecVariance { get; set; }
    public double Q1Actual { get; set; }
    public double Q1Budget { get; set; }
    public double Q1Variance { get; set; }

    public double Q2Actual { get; set; }
    public double Q2Budget { get; set; }
    public double Q2Variance { get; set; }


    public double Q3Actual { get; set; }
    public double Q3Budget { get; set; }
    public double Q3Variance { get; set; }

    public double Q4Actual { get; set; }
    public double Q4Budget { get; set; }
    public double Q4Variance { get; set; }

}



public class ScoreCardUpdate
{
    public int ScoreCardId { get; set; }
    public string ColumnName { get; set; }
    public double NewValue { get; set; }

}
