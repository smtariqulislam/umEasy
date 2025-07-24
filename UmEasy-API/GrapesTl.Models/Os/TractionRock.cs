namespace GrapesTl.Models;

public class TractionRock
{
    public string RockId { get; set; }
    public string GoalId { get; set; }
    public string Quarter { get; set; }
    public string Rock { get; set; }
    public string DepartmentId { get; set; }
    public string RockOwner { get; set; }
    public long FileId { get; set; }

}

public class TractionRockView : TractionRock
{
    public string Goal { get; set; }
    public string RockOwnerName { get; set; }
    public string DepartmentName { get; set; }

}