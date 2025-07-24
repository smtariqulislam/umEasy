namespace GrapesTl.Models;

public class Issue
{
    public string IssueId { get; set; }
    public string Title { get; set; }
    public string Note { get; set; }
    public string UserId { get; set; }
    public string MeetingId { get; set; }
    public string Status { get; set; }
    public string DepartmentId { get; set; }
  
}


public class IssueView : Issue
{
    public string FullName { get; set; }
    public string MeetingName { get; set; }
    public string DepartmentName { get; set; }

}


public class IssueVto
{
    public string IssueId { get; set; }
    public string Title { get; set; }
    public string Note { get; set; }
    public string UserId { get; set; }
    public string FileId { get; set; }
    public string Quarter { get; set; }
    public string IssueStatus { get; set; }
    public string DepartmentId { get; set; }

}

public class IssueVtoView : IssueVto
{
    public string FileName { get; set; }
    public string FolderName { get; set; }
    public string FullName { get; set; }

}





