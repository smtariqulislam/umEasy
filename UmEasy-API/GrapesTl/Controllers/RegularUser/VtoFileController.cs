namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class VtoFileController(IUnitOfWork unitOfWork, UserManager<ApplicationUser> userManager) : ControllerBase
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

            var data = await _unitOfWork.SP_Call.List<VtoFolderView>("OsVtoFileGetAll", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("select")]
    public async Task<IActionResult> Select()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<VtoFolderView>("OsVtoFileGetAllForSelect");
            return Ok(data.Select(a => new { listId = a.FileId, listName = a.FolderName + " - " + a.FileName }));
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
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _userManager.FindByIdAsync(_userId);

            var parameter = new DynamicParameters();
            parameter.Add("@FileId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<VtoFolderView>("OsVtoFileGetById", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpPost("create")]
    public async Task<IActionResult> Create([FromBody] VtoFile model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {

            var parameter = new DynamicParameters();
            parameter.Add("@FileName", model.FileName);
            parameter.Add("@FolderId", model.FolderId);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OsVtoFileCreate", parameter);

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

    [HttpDelete("Delete/{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@FileId", id);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OsVtoFileDelete", parameter);

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

    [HttpDelete("StatusToggle/{id}")]
    public async Task<IActionResult> StatusToggle(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@FileId", id);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OsVtoFileToggleStatus", parameter);

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

    [HttpDelete("IsPublic/{id}")]
    public async Task<IActionResult> IsPublic(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@FileId", id);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OsVtoFileTogglePublic", parameter);

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
