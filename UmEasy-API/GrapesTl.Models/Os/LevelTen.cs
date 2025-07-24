using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace GrapesTl.Models;

public class LevelTen
{
    [JsonProperty("meetingId")]
    public string MeetingId { get; set; }
    [JsonProperty("headline")]
    public List<HeadlineView> Headline { get; set; }

    [JsonProperty("issues")]
    public List<IssueView> Issues { get; set; }

    [JsonProperty("todo")]
    public List<TodoView> Todo { get; set; }

    [JsonProperty("rocks")]
    public List<MeetingRocksView> Rocks { get; set; }

    [JsonProperty("scoreCards")]
    public List<ScoreCardView> ScoreCards { get; set; }

    [JsonProperty("meetingType")]
    public string MeetingType { get; set; }

    [JsonProperty("meetingName")]
    public string MeetingName { get; set; }

    [JsonProperty("meetingDate")]
    public DateTime MeetingDate { get; set; }

    [JsonProperty("timeToStart")]
    public string TimeToStart { get; set; }

    [JsonProperty("repeatStatus")]
    public string RepeatStatus { get; set; }

}


//public record Attendee
//{
//    [JsonProperty("attendeeId")]
//    public string AttendeeId { get; set; }

//    [JsonProperty("listId")]
//    public string ListId { get; set; }

//    [JsonProperty("listName")]
//    public string ListName { get; set; }
//}

//public record Agenda
//{
//    [JsonProperty("agendaId")]
//    public string AgendaId { get; set; }

//    [JsonProperty("agendaName")]
//    public string AgendaName { get; set; }

//    [JsonProperty("duration")]
//    public int Duration { get; set; }
//}