namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class TractionIssuesListController(IUnitOfWork unitOfWork) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;



    [HttpGet("list/{id}")]
    public async Task<IActionResult> List(long id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@fileId", id);

            var data = await _unitOfWork.SP_Call.List<TractionIssuesList>("OsTractionIssuesListGetAll", parameter);

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }
    [HttpGet("details/{id}")]
    public async Task<IActionResult> Details(long id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@IssuesListId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<TractionIssuesList>("OsTractionIssuesListGetById", parameter);

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
    public async Task<IActionResult> Create([FromForm] TractionIssuesList model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {

            var parameter = new DynamicParameters();

            parameter.Add("@FileId", model.FileId);
            parameter.Add("@Issue1", string.IsNullOrWhiteSpace(model.Issue1) ? "" : model.Issue1);
            parameter.Add("@Issue1Assignee", string.IsNullOrWhiteSpace(model.Issue1Assignee) ? "" : model.Issue1Assignee);
            parameter.Add("@Issue2", string.IsNullOrWhiteSpace(model.Issue2) ? "" : model.Issue2);
            parameter.Add("@Issue2Assignee", string.IsNullOrWhiteSpace(model.Issue2Assignee) ? "" : model.Issue2Assignee);
            parameter.Add("@Issue3", string.IsNullOrWhiteSpace(model.Issue3) ? "" : model.Issue3);
            parameter.Add("@Issue3Assignee", string.IsNullOrWhiteSpace(model.Issue3Assignee) ? "" : model.Issue3Assignee);
            parameter.Add("@Issue4", string.IsNullOrWhiteSpace(model.Issue4) ? "" : model.Issue4);
            parameter.Add("@Issue4Assignee", string.IsNullOrWhiteSpace(model.Issue4Assignee) ? "" : model.Issue4Assignee);
            parameter.Add("@Issue5", string.IsNullOrWhiteSpace(model.Issue5) ? "" : model.Issue5);
            parameter.Add("@Issue5Assignee", string.IsNullOrWhiteSpace(model.Issue5Assignee) ? "" : model.Issue5Assignee);
            parameter.Add("@Issue6", string.IsNullOrWhiteSpace(model.Issue6) ? "" : model.Issue6);
            parameter.Add("@Issue6Assignee", string.IsNullOrWhiteSpace(model.Issue6Assignee) ? "" : model.Issue6Assignee);
            parameter.Add("@Issue7", string.IsNullOrWhiteSpace(model.Issue7) ? "" : model.Issue7);
            parameter.Add("@Issue7Assignee", string.IsNullOrWhiteSpace(model.Issue7Assignee) ? "" : model.Issue7Assignee);
            parameter.Add("@Issue8", string.IsNullOrWhiteSpace(model.Issue8) ? "" : model.Issue8);
            parameter.Add("@Issue8Assignee", string.IsNullOrWhiteSpace(model.Issue8Assignee) ? "" : model.Issue8Assignee);


            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OsTractionIssuesListCreate", parameter);

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
    public async Task<IActionResult> Update([FromForm] TractionIssuesList model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();

            parameter.Add("@IssuesListId", model.IssuesListId);
            parameter.Add("@FileId", model.FileId);
            parameter.Add("@Issue1", string.IsNullOrWhiteSpace(model.Issue1) ? "" : model.Issue1);
            parameter.Add("@Issue1Assignee", string.IsNullOrWhiteSpace(model.Issue1Assignee) ? "" : model.Issue1Assignee);
            parameter.Add("@Issue2", string.IsNullOrWhiteSpace(model.Issue2) ? "" : model.Issue2);
            parameter.Add("@Issue2Assignee", string.IsNullOrWhiteSpace(model.Issue2Assignee) ? "" : model.Issue2Assignee);
            parameter.Add("@Issue3", string.IsNullOrWhiteSpace(model.Issue3) ? "" : model.Issue3);
            parameter.Add("@Issue3Assignee", string.IsNullOrWhiteSpace(model.Issue3Assignee) ? "" : model.Issue3Assignee);
            parameter.Add("@Issue4", string.IsNullOrWhiteSpace(model.Issue4) ? "" : model.Issue4);
            parameter.Add("@Issue4Assignee", string.IsNullOrWhiteSpace(model.Issue4Assignee) ? "" : model.Issue4Assignee);
            parameter.Add("@Issue5", string.IsNullOrWhiteSpace(model.Issue5) ? "" : model.Issue5);
            parameter.Add("@Issue5Assignee", string.IsNullOrWhiteSpace(model.Issue5Assignee) ? "" : model.Issue5Assignee);
            parameter.Add("@Issue6", string.IsNullOrWhiteSpace(model.Issue6) ? "" : model.Issue6);
            parameter.Add("@Issue6Assignee", string.IsNullOrWhiteSpace(model.Issue6Assignee) ? "" : model.Issue6Assignee);
            parameter.Add("@Issue7", string.IsNullOrWhiteSpace(model.Issue7) ? "" : model.Issue7);
            parameter.Add("@Issue7Assignee", string.IsNullOrWhiteSpace(model.Issue7Assignee) ? "" : model.Issue7Assignee);
            parameter.Add("@Issue8", string.IsNullOrWhiteSpace(model.Issue8) ? "" : model.Issue8);
            parameter.Add("@Issue8Assignee", string.IsNullOrWhiteSpace(model.Issue8Assignee) ? "" : model.Issue8Assignee);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OsTractionIssuesListUpdate", parameter);
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
    public async Task<IActionResult> Delete(long id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@IssuesListId", id);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OsTractionIssuesListDelete", parameter);

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
