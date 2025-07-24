namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class TodoController(IUnitOfWork unitOfWork) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private string _userId;

    [HttpGet("list")]
    public async Task<IActionResult> List()
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@UserId", user.Id);

            var data = await _unitOfWork.SP_Call.List<TodoView>("OsTodoGetAll", parameter);

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

            var data = await _unitOfWork.SP_Call.List<Todo>("OsTodoMeetingGetAll", parameter);

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
            parameter.Add("@TodoId", id);

            var data = await _unitOfWork.SP_Call.OneRecord<Todo>("OsTodoGetById", parameter);

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
    public async Task<IActionResult> Create([FromBody] Todo model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@Title", model.Title);
            parameter.Add("@DueDate", model.DueDate);
            parameter.Add("@MeetingId", model.MeetingId);
            parameter.Add("@UserId", model.UserId);
            parameter.Add("@Note", model.Note);
            //parameter.Add("@Status", model.UserId == user.Id ? "Owner" : "Assign");
            parameter.Add("@Status", model.Status??"Pending");
            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OsTodoCreate", parameter);

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
    public async Task<IActionResult> Update([FromBody] Todo model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            var parameter = new DynamicParameters();
            parameter.Add("@TodoId", model.TodoId);
            parameter.Add("@Title", model.Title);
            parameter.Add("@DueDate", model.DueDate);
            parameter.Add("@UserId", model.UserId);
            parameter.Add("@Note", model.Note);
            parameter.Add("@Status", model.Status);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OsTodoUpdate", parameter);
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
            parameter.Add("@TodoId", id);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OsTodoDelete", parameter);

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

    [HttpDelete("Duplicate/{id}")]
    public async Task<IActionResult> Duplicate(string id)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@TodoId", id);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OsTodoDuplicate", parameter);

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



    [HttpDelete("MoveIssue/{id}")]
    public async Task<IActionResult> MoveIssue(string id)
    {
        try
        {


            var parameter = new DynamicParameters();
            parameter.Add("@TodoId", id);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OsTodoAddIssuefromTodo", parameter);

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

    [HttpPost("clickStatus")]
    public async Task<IActionResult> ClickStatus([FromBody] Todo model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var parameter = new DynamicParameters();

            parameter.Add("@TodoId", model.TodoId);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("OsTodoUpdateStatus", parameter);
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
