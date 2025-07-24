using System;
namespace GrapesTl.Models;

public class Todo
{
    public string TodoId { get; set; }
    public string Title { get; set; }
    public string Note { get; set; }
    public string UserId { get; set; }
    public string MeetingId { get; set; }
    public DateTime DueDate { get; set; }
    public string Status { get; set; }

}


public class TodoView : Todo
{
    public string FullName { get; set; }
    
    public string MeetingName { get; set; }



}

public class TodoAssign
{

    public string TodoId { get; set; }
    public string MeetingId { get; set; }
    public string UserId { get; set; }

}

public class TodoAssignView
{
    public string FullName { get; set; }
    public string TodoAssignId { get; set; }
    public string Status { get; set; }

}
