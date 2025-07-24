namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class LevelTenController(IUnitOfWork unitOfWork) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;



    [HttpGet("details/{id}")]
    public async Task<IActionResult> Details(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@MeetingID", id);

            // Retrieve the main meeting details
            var meeting = await _unitOfWork.SP_Call.OneRecord<LevelTen>("OsMeetingDetailsGetById", parameter);
            if (meeting == null)
                return NotFound("Meeting not found.");



            var headlines = await _unitOfWork.SP_Call.List<HeadlineView>("OsHeadlineMeetingGetAll", parameter);
            var todo = await _unitOfWork.SP_Call.List<TodoView>("OsTodoMeetingGetAll", parameter);
            var issues = await _unitOfWork.SP_Call.List<IssueView>("OsIssueMeetingGetAll", parameter);
            var rocks = await _unitOfWork.SP_Call.List<MeetingRocksView>("OsMeetingRocksGetAll", parameter);
            var scoreCards = await _unitOfWork.SP_Call.List<ScoreCardView>("OsScoreCardMeetingGetAll", parameter);



            // Set the attendees and agendas lists in the main meeting object

            meeting.Issues = issues.ToList();
            meeting.Headline = headlines.ToList();
            meeting.Todo = todo.ToList();
            meeting.Rocks = rocks.ToList();
            meeting.ScoreCards = scoreCards.ToList();

            // Return the structured meeting object as JSON
            return Ok(meeting);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
               "Error retrieving meeting details: " + e.Message);
        }
    }




}
