using System;
namespace GrapesTl.Models;

public class MeetingRocks
{
    public string RocksId { get; set; }
    public string Title { get; set; }
    public string Note { get; set; }
    public string UserId { get; set; }
    public string MeetingId { get; set; }
    public DateTime DueDate { get; set; }
    public string RockType { get; set; }
    public string Status { get; set; }
    public string DepartmentId { get; set; }


}

public class MeetingRocksView : MeetingRocks
{
    public string FullName { get; set; }
    public string MeetingName { get; set; }
    public string DepartmentName { get; set; }

}


public class MeetingRocksStatus
{
    public string RocksId { get; set; }
    public string Status { get; set; }
    public string MeetingName { get; set; }



}
