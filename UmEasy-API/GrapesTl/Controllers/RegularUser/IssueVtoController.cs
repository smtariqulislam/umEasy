namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class IssueVtoController(IUnitOfWork unitOfWork, UserManager<ApplicationUser> userManager) : ControllerBase
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

            var data = await _unitOfWork.SP_Call.List<IssueVtoView>("OsIssueVtoGetAllOwn", parameter);

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
            parameter.Add("@FileId", id);

            var data = await _unitOfWork.SP_Call.List<IssueView>("OsIssueVtoGetByFileId", parameter);

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

            var data = await _unitOfWork.SP_Call.OneRecord<IssueVto>("OsIssueVtoGetById", parameter);

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
    public async Task<IActionResult> Create([FromBody] IssueVto model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@Title", model.Title);
            parameter.Add("@UserId", model.UserId);
            parameter.Add("@Note", model.Note);
            parameter.Add("@Quarter", model.Quarter);
            parameter.Add("@FileId", model.FileId);
            parameter.Add("@IssueStatus", model.IssueStatus);
            parameter.Add("@DepartmentId", model.DepartmentId);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OsIssueVtoCreate", parameter);

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
    public async Task<IActionResult> Update([FromBody] IssueVto model)
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
            parameter.Add("@Quarter", model.Quarter);
            parameter.Add("@IssueStatus", model.IssueStatus);
            parameter.Add("@DepartmentId", model.DepartmentId);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OsIssueVtoUpdate", parameter);
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
            await _unitOfWork.SP_Call.Execute("OsIssueVtoDelete", parameter);

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
