namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class IssueController(IUnitOfWork unitOfWork, UserManager<ApplicationUser> userManager) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private string _userId;
    private readonly UserManager<ApplicationUser> _userManager = userManager;

    [HttpGet("list")]
    public async Task<IActionResult> List()
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _userManager.FindByIdAsync(_userId);

            var parameter = new DynamicParameters();
            parameter.Add("@UserId", user.Id);

            var data = await _unitOfWork.SP_Call.List<IssueView>("OsIssueGetAllOwn", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("list/{id}")]
    public async Task<IActionResult> List(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@MeetingId", id);

            var data = await _unitOfWork.SP_Call.List<Issue>("OsIssueMeetingGetAll", parameter);

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
            parameter.Add("@IssueId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<Issue>("OsIssueGetById", parameter);

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
    public async Task<IActionResult> Create([FromBody] Issue model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@Title", model.Title);
            parameter.Add("@MeetingId", model.MeetingId);
            parameter.Add("@UserId", model.UserId);
            parameter.Add("@Note", model.Note);
            parameter.Add("@Status ", model.Status?? "Open");
            parameter.Add("@DepartmentId", model.DepartmentId);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OsIssueCreate", parameter);

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
    public async Task<IActionResult> Update([FromBody] Issue model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();

            parameter.Add("@IssueId", model.IssueId);
            parameter.Add("@Title", model.Title);
            parameter.Add("@UserId", model.UserId);
            parameter.Add("@Note", model.Note);
            parameter.Add("@Status ", model.Status ?? "Open");
            parameter.Add("@DepartmentId", model.DepartmentId);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OsIssueUpdate", parameter);
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
            parameter.Add("@IssueId", id);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OsIssueDelete", parameter);

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


    [HttpDelete("MoveTodo/{id}")]
    public async Task<IActionResult> MoveTodo(string id)
    {
        try
        {

            var parameter = new DynamicParameters();
            parameter.Add("@IssueId", id);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OsIssueAddTodofromIssue", parameter);

            var message = parameter.Get<string>("Message");

            if (message == "Not found")
                return NotFound(message);

            if (message == "Already added")
                return BadRequest(message);

            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
             "Error deleting data." + e.Message);
        }
    }


    [HttpDelete("Status/{id}")]
    public async Task<IActionResult> Status(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@IssueId", id);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OsIssueStatus", parameter);

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



    [HttpPost("clickStatus")]
    public async Task<IActionResult> ClickStatus([FromBody] Todo model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();

            parameter.Add("@IssueId", model.TodoId);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OsIssueUpdateStatus", parameter);
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



}
