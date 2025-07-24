namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class CoustomAgendaController(IUnitOfWork unitOfWork) : ControllerBase
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
            var meeting = await _unitOfWork.SP_Call.OneRecord<Meeting>("OsMeetingDetailsGetById", parameter);
            if (meeting == null)
                return NotFound("Meeting not found.");

            // Retrieve attendees and agendas using the same MeetingID
            var attendees = await _unitOfWork.SP_Call.List<Attendee>("OsMeetingAttendeesGetById", parameter);
            var agendas = await _unitOfWork.SP_Call.List<Agenda>("OsMeetingAgendasGetById", parameter);



            // Set the attendees and agendas lists in the main meeting object
            meeting.Attendees = attendees.ToList();
            meeting.Agendas = agendas.ToList();

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
