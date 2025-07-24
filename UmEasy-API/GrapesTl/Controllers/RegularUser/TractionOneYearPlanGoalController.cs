namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class TractionOneYearPlanGoalController(IUnitOfWork unitOfWork) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;

    [HttpGet("list/{id}")]
    public async Task<IActionResult> List(long id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@fileId", id);

            var data = await _unitOfWork.SP_Call.List<TractionOneYearPlanGoal>("OsTractionOneYearPlanGoalGetAll", parameter);

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
            parameter.Add("@GoalId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<TractionOneYearPlanGoal>("OsTractionOneYearPlanGoalGetById", parameter);

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

    [HttpGet("select/{fileId}")]
    public async Task<IActionResult> Select(long fileId)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@fileId", fileId);

            var data = await _unitOfWork.SP_Call.List<TractionOneYearPlanGoal>("OsTractionOneYearPlanGoalGetAll", parameter);
            return Ok(data.Select(a => new { listId = a.GoalId, listName = a.Goal }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpPost("create")]
    public async Task<IActionResult> Create([FromForm] TractionOneYearPlanGoal model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {


            var parameter = new DynamicParameters();

            parameter.Add("@Goal", model.Goal);
            parameter.Add("@FileId", model.FileId);



            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OsTractionOneYearPlanGoalCreate", parameter);

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
    public async Task<IActionResult> Update([FromForm] TractionOneYearPlanGoal model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@GoalId", model.GoalId);
            parameter.Add("@Goal", model.Goal);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OsTractionOneYearPlanGoalUpdate", parameter);
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
            parameter.Add("@GoalId", id);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OsTractionOneYearPlanGoalDelete", parameter);

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
