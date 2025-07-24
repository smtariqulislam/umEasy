using System.Transactions;

namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class MeetingController(IUnitOfWork unitOfWork) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private string _userId;

    [HttpGet("select")]
    public async Task<IActionResult> Select()
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@UserId", user.Id);

            var data = await _unitOfWork.SP_Call.List<Meeting>("OsMeetingGetAll", parameter);
            return Ok(data.Select(a => new { listId = a.MeetingId, listName = a.MeetingName }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("list")]
    public async Task<IActionResult> List()
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@UserId", user.Id);

            var data = await _unitOfWork.SP_Call.List<Meeting>("OsMeetingGetAll", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

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

    [HttpPost("create")]
    public async Task<IActionResult> Create([FromBody] Meeting meeting)
    {
        try
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                return Unauthorized("User not logged in.");
            }

            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == userId);
            var meetingId = Guid.NewGuid();

            // Meeting Parameters
            var meetingParameters = new DynamicParameters();
            meetingParameters.Add("@MeetingId", meetingId);
            meetingParameters.Add("@MeetingType", meeting.MeetingType);
            meetingParameters.Add("@MeetingName", meeting.MeetingName);
            meetingParameters.Add("@MeetingDate", meeting.MeetingDate);
            meetingParameters.Add("@TimeToStart", meeting.TimeToStart);
            meetingParameters.Add("@RepeatStatus", meeting.RepeatStatus);
            meetingParameters.Add("@Id", user.Id);
            meetingParameters.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);

            await _unitOfWork.SP_Call.Execute("OsMeetingCreate", meetingParameters);

            var meetingMessage = meetingParameters.Get<string>("Message");
            if (meetingMessage == "Meeting already exists")
                return BadRequest(meetingMessage);

            // Attendees
            foreach (var attendee in meeting.Attendees)
            {
                var attendeeParameters = new DynamicParameters();
                attendeeParameters.Add("@MeetingId", meetingId);
                attendeeParameters.Add("@UserId", attendee.ListId);
                attendeeParameters.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);

                await _unitOfWork.SP_Call.Execute("OsMeetingAttendeeCreate", attendeeParameters);

                var attendeeMessage = attendeeParameters.Get<string>("Message");
                if (attendeeMessage == "Attendee already exists")
                    return BadRequest(attendeeMessage);
            }

            // Agendas
            foreach (var agenda in meeting.Agendas)
            {
                var agendaParameters = new DynamicParameters();
                agendaParameters.Add("@MeetingId", meetingId);
                agendaParameters.Add("@AgendaName", agenda.AgendaName);
                agendaParameters.Add("@Duration", agenda.Duration);
                agendaParameters.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);

                await _unitOfWork.SP_Call.Execute("OsMeetingAgendaCreate", agendaParameters);

                var agendaMessage = agendaParameters.Get<string>("Message");
                if (agendaMessage == "Agenda already exists")
                    return BadRequest(agendaMessage);
            }

            return Created("", new { meetingId, meetingName = meeting.MeetingName });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Error creating meeting: " + ex.Message);
        }
    }


    [HttpPut("Update/{id}")]
    public async Task<IActionResult> Update(string id, [FromBody] Meeting meeting)
    {
        if (!ModelState.IsValid)
            return BadRequest("Invalid data provided.");

        using (var transaction = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
        {
            try
            {
                // Update main meeting details
                //var meetingParams = new DynamicParameters();
                ////meetingParams.Add("@MeetingId", id);
                //meetingParams.Add("@MeetingName", updatedMeeting.MeetingName);
                //meetingParams.Add("@MeetingDate", updatedMeeting.MeetingDate);
                //meetingParams.Add("@TimeToStart", updatedMeeting.TimeToStart);
                //meetingParams.Add("@RepeatStatus", updatedMeeting.RepeatStatus);
                //meetingParams.Add("@MeetingType", updatedMeeting.MeetingType);
                //meetingParams.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 255);

                var meetingParameters = new DynamicParameters();
                meetingParameters.Add("@MeetingId", id);
                meetingParameters.Add("@MeetingType", meeting.MeetingType);
                meetingParameters.Add("@MeetingName", meeting.MeetingName);
                meetingParameters.Add("@MeetingDate", meeting.MeetingDate);
                meetingParameters.Add("@TimeToStart", meeting.TimeToStart);
                meetingParameters.Add("@RepeatStatus", meeting.RepeatStatus);
                //meetingParameters.Add("@Id", user.Id);
                meetingParameters.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);

                await _unitOfWork.SP_Call.Execute("OsMeetingUpdate", meetingParameters);
                var meetingMessage = meetingParameters.Get<string>("Message");

                if (!string.IsNullOrEmpty(meetingMessage) && meetingMessage != "Success")
                {
                    transaction.Dispose();
                    return BadRequest(meetingMessage);
                }

                // Delete existing attendees for the meeting ID
                var attendeeDeleteParams = new DynamicParameters();
                attendeeDeleteParams.Add("@MeetingId", id, DbType.String, size: 36);
                attendeeDeleteParams.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 255);
                await _unitOfWork.SP_Call.Execute("OsMeetingAttendeesDeleteByMeetingId", attendeeDeleteParams);
                var attendeeDeleteMessage = attendeeDeleteParams.Get<string>("Message");

                if (!string.IsNullOrEmpty(attendeeDeleteMessage) && attendeeDeleteMessage != "Success")
                {
                    transaction.Dispose();
                    return BadRequest(attendeeDeleteMessage);
                }

                // Delete existing agendas for the meeting ID
                var agendaDeleteParams = new DynamicParameters();
                agendaDeleteParams.Add("@MeetingId", id, DbType.String, size: 36);
                agendaDeleteParams.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 255);
                await _unitOfWork.SP_Call.Execute("OsMeetingAgendasDeleteByMeetingId", agendaDeleteParams);
                var agendaDeleteMessage = agendaDeleteParams.Get<string>("Message");

                if (!string.IsNullOrEmpty(agendaDeleteMessage) && agendaDeleteMessage != "Success")
                {
                    transaction.Dispose();
                    return BadRequest(agendaDeleteMessage);
                }

                // Insert or update attendees
                foreach (var attendee in meeting.Attendees)
                {
                    var attendeeParams = new DynamicParameters();
                    attendeeParams.Add("@MeetingId", id, DbType.String, size: 36);
                    attendeeParams.Add("@UserId", attendee.ListId, DbType.String, size: 36);
                    attendeeParams.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 255);

                    await _unitOfWork.SP_Call.Execute("OsMeetingAttendeeCreate", attendeeParams);
                    var attendeeMessage = attendeeParams.Get<string>("Message");

                    if (!string.IsNullOrEmpty(attendeeMessage) && attendeeMessage != "Success")
                    {
                        transaction.Dispose();
                        return BadRequest(attendeeMessage);
                    }
                }

                // Insert or update agendas
                foreach (var agenda in meeting.Agendas)
                {
                    var agendaParams = new DynamicParameters();
                    agendaParams.Add("@MeetingId", id, DbType.String, size: 36);
                    agendaParams.Add("@AgendaName", agenda.AgendaName, DbType.String, size: 100);
                    agendaParams.Add("@Duration", agenda.Duration, DbType.Int32);
                    agendaParams.Add("@Message", dbType: DbType.String, direction: ParameterDirection.Output, size: 255);

                    await _unitOfWork.SP_Call.Execute("OsMeetingAgendaCreate", agendaParams);
                    var agendaMessage = agendaParams.Get<string>("Message");

                    if (!string.IsNullOrEmpty(agendaMessage) && agendaMessage != "Success")
                    {
                        transaction.Dispose();
                        return BadRequest(agendaMessage);
                    }
                }

                transaction.Complete();
                return NoContent();
            }
            catch (Exception e)
            {
                transaction.Dispose();
                return StatusCode(StatusCodes.Status500InternalServerError, $"Error updating meeting: {e.Message}");
            }
        }
    }

    [HttpDelete("Delete/{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@MeetingId", id);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OsMeetingDelete", parameter);

            var message = parameter.Get<string>("Message");

            if (message == "Not found")
                return NotFound(message);

            if (message == "Cannot delete")
                return BadRequest(message);

            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
             "Error deleting data." + e.Message);
        }
    }



    //[HttpDelete("duplicate/{id}")]
    //public async Task<IActionResult> Duplicate(string id)
    //{
    //    try
    //    {
    //        var parameter = new DynamicParameters();
    //        parameter.Add("@MeetingId", id);

    //        parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
    //        await _unitOfWork.SP_Call.Execute("OsMeetingDuplicate", parameter);

    //        var message = parameter.Get<string>("Message");

    //        if (message == "Not found")
    //            return NotFound(message);

    //        if (message == "Cannot delete")
    //            return BadRequest(message);

    //        return NoContent();
    //    }
    //    catch (Exception e)
    //    {
    //        return StatusCode(StatusCodes.Status500InternalServerError,
    //         "Error deleting data." + e.Message);
    //    }
    //}


    [HttpPost("duplicate/{id}")]
    public async Task<IActionResult> Create(string  id, [FromBody] MeetingDuplicate model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {

            var parameter = new DynamicParameters();
            parameter.Add("@MeetingId", id);
            parameter.Add("@Quarter", model.Quarter);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OsMeetingDuplicate", parameter);

            var message = parameter.Get<string>("Message");

            if (message == "Already exists")
                return BadRequest(message);

            return Created("", SD.Message_Save);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error saving data." + e.Message);
        }
    }


}
