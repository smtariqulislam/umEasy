namespace GrapesTl.Models;

public class Headline
{

    public string HeadlineId { get; set; }
    public string Title { get; set; }
    public string Note { get; set; }
    public string UserId { get; set; }
    public string MeetingId { get; set; }
    public string DepartmentId { get; set; }

}

public class HeadlineView : Headline
{

    public string FullName { get; set; }
    public string Status { get; set; }
    public string MeetingName { get; set; }
    public string DepartmentName { get; set; }

}
