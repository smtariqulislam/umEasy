namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class ScoreCardController(IUnitOfWork unitOfWork, UserManager<ApplicationUser> userManager) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private string _userId;
    private readonly UserManager<ApplicationUser> _userManager = userManager;
       

    [HttpGet("list/{id}")]
    public async Task<IActionResult> List(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@MeetingId", id);

            var data = await _unitOfWork.SP_Call.List<ScoreCardView>("OsScoreCardMeetingMeetingGetAll", parameter);

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
            parameter.Add("@ScoreCardId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<ScoreCardView>("OsScoreCardMeetingGetById", parameter);

            if (data == null)
                return NotFound(SD.Message_NotFound);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve details data." + e.Message);
        }
    }

    [HttpPost("create")]
    public async Task<IActionResult> Create([FromForm] ScoreCard model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@MeetingId", model.MeetingId);
            parameter.Add("@Particular", model.Particular);
            parameter.Add("@DepartmentId", model.DepartmentId);



            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OsScoreCardMeetingCreate", parameter);

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


    [HttpPost("update")]
    public async Task<IActionResult> Update([FromForm] ScoreCardUpdate model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();

            parameter.Add("@ScoreCardId", model.ScoreCardId);
            parameter.Add("@ColumnName", model.ColumnName);
            parameter.Add("@NewValue", model.NewValue);


            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OsScoreCardMeetingUpdate", parameter);
            var message = parameter.Get<string>("Message");

            if (message == "Not found")
                return NotFound(message);

            if (message == "Already exists")
                return BadRequest(message);

            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error updating data." + e.Message);
        }
    }

    [HttpPost("updateMain")]
    public async Task<IActionResult> updateMain([FromForm] ScoreCard model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();

            parameter.Add("@ScoreCardId", model.ScoreCardId);
            parameter.Add("@Particular", model.Particular);
            parameter.Add("@DepartmentId", model.DepartmentId);


            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OsScoreCardMeetingUpdateMain", parameter);
            var message = parameter.Get<string>("Message");

            if (message == "Not found")
                return NotFound(message);

            if (message == "Already exists")
                return BadRequest(message);

            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error updating data." + e.Message);
        }
    }


    [HttpDelete("Delete/{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@ScoreCardId", id);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OsScoreCardMeetingDelete", parameter);

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



}
