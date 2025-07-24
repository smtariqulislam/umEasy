namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class DesignationsController(IUnitOfWork unitOfWork) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;


    [HttpGet("list")]
    public async Task<IActionResult> List()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<Designation>("adDesignationGetAll");

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
            var data = await _unitOfWork.SP_Call.List<DesignationView>("adDesignationGetForSelect");
            return Ok(data.Select(a => new { listId = a.DesignationId, listName = a.DesignationName }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("search/{id}")]
    public async Task<IActionResult> Search(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@DesignationId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<Designation>("adDesignationGrossSalaryGetById", parameter);

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


    [HttpGet("details/{id}")]
    public async Task<IActionResult> Details(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@DesignationId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<Designation>("adDesignationGetById", parameter);

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
    public async Task<IActionResult> Create([FromBody] Designation model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@DesignationName", model.DesignationName);
            parameter.Add("@SaccoDeduction", model.SaccoDeduction);
            //parameter.Add("@GrossSalary", model.GrossSalary);
            parameter.Add("@KpiDetails", model.KpiDetails);
            parameter.Add("@ObjectiveOne", model.ObjectiveOne);
            parameter.Add("@ObjectiveTwo", model.ObjectiveTwo);
            parameter.Add("@ObjectiveThree", model.ObjectiveThree);
            parameter.Add("@ObjectiveFour", model.ObjectiveFour);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("adDesignationCreate", parameter);

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
    public async Task<IActionResult> Update([FromBody] Designation model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@DesignationId", model.DesignationId);
            parameter.Add("@DesignationName", model.DesignationName);
            parameter.Add("@SaccoDeduction", model.SaccoDeduction);
            //parameter.Add("@GrossSalary", model.GrossSalary);
            parameter.Add("@KpiDetails", model.KpiDetails);
            parameter.Add("@ObjectiveOne", model.ObjectiveOne);
            parameter.Add("@ObjectiveTwo", model.ObjectiveTwo);
            parameter.Add("@ObjectiveThree", model.ObjectiveThree);
            parameter.Add("@ObjectiveFour", model.ObjectiveFour);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("adDesignationUpdate", parameter);
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
            parameter.Add("@DesignationId", id);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("adDesignationDelete", parameter);

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
