using GrapesTl.Models.Admin;

namespace GrapesTl.Controllers;

[Authorize(Roles = "Grapes Admin")]
[Route("api/[controller]")]
[ApiController]
public class QueryExecuteController(IUnitOfWork unitOfWork) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private string _userId;


    [HttpPost("create")]
    public async Task<IActionResult> Create([FromForm] QueryExecute model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@Query", model.Query);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("GaQueryExecuteCreate", parameter);

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
