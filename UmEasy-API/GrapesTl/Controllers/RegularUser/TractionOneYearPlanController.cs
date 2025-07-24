namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class TractionOneYearPlanController(IUnitOfWork unitOfWork) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;




    [HttpGet("list/{id}")]
    public async Task<IActionResult> List(long id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@fileId", id);

            var data = await _unitOfWork.SP_Call.List<TractionOneYearPlan>("OsTractionOneYearPlanGetAll", parameter);

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
            parameter.Add("@OneYearPlanId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<TractionOneYearPlan>("OsTractionOneYearPlanGetById", parameter);

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
    public async Task<IActionResult> Create([FromForm] TractionOneYearPlan model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {


            var parameter = new DynamicParameters();


            parameter.Add("@FileId", model.FileId);
            parameter.Add("@FutureDate", model.FutureDate);
            parameter.Add("@Revenue", string.IsNullOrWhiteSpace(model.Revenue) ? "" : model.Revenue);
            parameter.Add("@Profit", string.IsNullOrWhiteSpace(model.Profit) ? "" : model.Profit);
            parameter.Add("@Measurables", string.IsNullOrWhiteSpace(model.Measurables) ? "" : model.Measurables);
            //parameter.Add("@Goal1", string.IsNullOrWhiteSpace(model.Goal1) ? "" : model.Goal1);
            //parameter.Add("@Goal2", string.IsNullOrWhiteSpace(model.Goal2) ? "" : model.Goal2);
            //parameter.Add("@Goal3", string.IsNullOrWhiteSpace(model.Goal3) ? "" : model.Goal3);
            //parameter.Add("@Goal4", string.IsNullOrWhiteSpace(model.Goal4) ? "" : model.Goal4);
            //parameter.Add("@Goal5", string.IsNullOrWhiteSpace(model.Goal5) ? "" : model.Goal5);
            //parameter.Add("@Goal6", string.IsNullOrWhiteSpace(model.Goal6) ? "" : model.Goal6);
            //parameter.Add("@Goal7", string.IsNullOrWhiteSpace(model.Goal7) ? "" : model.Goal7);
            //parameter.Add("@Goal8", string.IsNullOrWhiteSpace(model.Goal8) ? "" : model.Goal8);
            //parameter.Add("@Goal9", string.IsNullOrWhiteSpace(model.Goal9) ? "" : model.Goal9);
            //parameter.Add("@Goal10", string.IsNullOrWhiteSpace(model.Goal10) ? "" : model.Goal10);
            //parameter.Add("@Goal11", string.IsNullOrWhiteSpace(model.Goal11) ? "" : model.Goal11);
            //parameter.Add("@Goal12", string.IsNullOrWhiteSpace(model.Goal12) ? "" : model.Goal12);




            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OsTractionOneYearPlanCreate", parameter);

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
    public async Task<IActionResult> Update([FromForm] TractionOneYearPlan model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@OneYearPlanId", model.OneYearPlanId);
            parameter.Add("@FileId", model.FileId);
            parameter.Add("@FutureDate", model.FutureDate);
            parameter.Add("@Revenue", string.IsNullOrWhiteSpace(model.Revenue) ? "" : model.Revenue);
            parameter.Add("@Profit", string.IsNullOrWhiteSpace(model.Profit) ? "" : model.Profit);
            parameter.Add("@Measurables", string.IsNullOrWhiteSpace(model.Measurables) ? "" : model.Measurables);


            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OsTractionOneYearPlanUpdate", parameter);
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
            parameter.Add("@OneYearPlanId", id);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OsTractionOneYearPlanDelete", parameter);

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
