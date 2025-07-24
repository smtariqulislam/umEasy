namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class MarketingStrategyController(IUnitOfWork unitOfWork) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;

    [HttpGet("list/{id}")]
    public async Task<IActionResult> List(long id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@fileId", id);


            var data = await _unitOfWork.SP_Call.List<MarketingStrategy>("OsVisionMarketingStrageGetAll", parameter);

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
            parameter.Add("@MarketingStrategyId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<MarketingStrategy>("OsVisionMarketingStrageGetById", parameter);

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
    public async Task<IActionResult> Create([FromForm] MarketingStrategy model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();

            parameter.Add("@TargetMarketName", model.TargetMarketName);
            parameter.Add("@Uniques1", model.Uniques1);
            parameter.Add("@Uniques2", model.Uniques2);
            parameter.Add("@Uniques3", model.Uniques3);
            parameter.Add("@ProvenProcess", model.ProvenProcess);
            parameter.Add("@SystemPromise", model.SystemPromise);
            parameter.Add("@FileId", model.FileId);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OsVisionMarketingStrageCreate", parameter);

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
    public async Task<IActionResult> Update([FromForm] MarketingStrategy model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@MarketingStrategyId", model.MarketingStrategyId);
            parameter.Add("@TargetMarketName", model.TargetMarketName);
            parameter.Add("@Uniques1", model.Uniques1);
            parameter.Add("@Uniques2", model.Uniques2);
            parameter.Add("@Uniques3", model.Uniques3);
            parameter.Add("@ProvenProcess", model.ProvenProcess);
            parameter.Add("@SystemPromise", model.SystemPromise);
            parameter.Add("@FileId", model.FileId);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OsVisionMarketingStrageUpdate", parameter);
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
            parameter.Add("@MarketingStrategyId", id);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OsVisionMarketingStrageDelete", parameter);

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
