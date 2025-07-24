using GrapesTl.Services.Identity;

namespace GrapesTl.Controllers.Admin;


[Authorize]
[Route("api/[controller]")]
[ApiController]
public class UserController(IUnitOfWork unitOfWork, IAuthService authService, UserManager<ApplicationUser> userManager, IFileUploadService fileUploadService) : ControllerBase
{
    private readonly IUnitOfWork _unitOfWork = unitOfWork;
    private readonly IAuthService _authService = authService;
    private readonly UserManager<ApplicationUser> _userManager = userManager;
    private readonly IFileUploadService _fileUploadService = fileUploadService;
    private string _userId;



    [Authorize(Roles = "Grapes Admin,Super Admin")]
    [HttpGet("list")]
    public async Task<IActionResult> List()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<UserView>("GaUserGetAll");

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    //[Authorize(Roles = "Grapes Admin,Super Admin")]
    [HttpGet("UserInfo")]
    public async Task<IActionResult> UserInfo()
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _unitOfWork.ApplicationUser.GetFirstOrDefaultAsync(a => a.Id == _userId);

            return Ok(new { listName = user.FirstName, listId = user.Id });
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve details data." + e.Message);
        }
    }


    [Authorize(Roles = "Grapes Admin,Super Admin")]
    [HttpGet("Role")]
    public async Task<IActionResult> Role()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<Role>("adRoleGetAll");
            return Ok(data.Select(a => new { listId = a.Name, listName = a.Name }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }


    //[Authorize(Roles = "Grapes Admin,Super Admin")]
    [HttpGet("select")]
    public async Task<IActionResult> Select()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<UserSelect>("adUserGetAll");
            return Ok(data.Select(a => new { listId = a.Id, listName = a.FullName }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }


    [Authorize(Roles = "Grapes Admin,Super Admin")]
    [HttpGet("RoleSelect")]
    public async Task<IActionResult> RoleSelect()
    {
        try
        {
            var data = await _unitOfWork.SP_Call.List<Role>("CaRoleelectGetAll");
            return Ok(data.Select(a => new { listId = a.Name, listName = a.Name }));
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }


    [Authorize(Roles = "Grapes Admin,Super Admin")]
    [HttpGet("details/{userId}")]
    public async Task<IActionResult> Details(string userId)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@UserId", userId);

            var data = await _unitOfWork.SP_Call.OneRecord<UserView>("adUserGetById", parameter);

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


    //[Authorize(Roles = "Grapes Admin,Super Admin")]
    //[HttpPost("create")]
    //public async Task<IActionResult> Create([FromForm] User model)
    //{
    //    if (!ModelState.IsValid)
    //        return BadRequest(SD.Message_Model_Error);

    //    var fileId = "";
    //    if (model.File is not null && model.File.Length > 0)
    //        fileId = await _fileUploadService.GetUploadIdAsync(model.File);

    //    var userModel = new RegisterUser
    //    {

    //        FirstName = model.FirstName,
    //        //CompanyId = model.CompanyId,
    //        //DepartmentId = model.DepartmentId,
    //        //DesignationId = model.DesignationId,
    //        PhoneNumber = model.PhoneNumber,
    //        ImageUrl = fileId,
    //        Password = SD.Password,
    //    };
    //    var result = await _authService.RegisterUserAsync(userModel, model.Role);

    //    if (result.IsSuccess)
    //        return Created("", SD.Message_Save);

    //    return BadRequest(SD.Message_Unsuccessful);
    //}


    [Authorize(Roles = "Grapes Admin,Super Admin")]
    [HttpPost("update")]
    public async Task<IActionResult> Update([FromForm] User model)
    {
        if (!ModelState.IsValid)
            return BadRequest(SD.Message_Model_Error);

        try
        {
            var fileId = "";
            if (model.File is not null && model.File.Length > 0)
                fileId = await _fileUploadService.GetUploadIdAsync(model.File);

            var parameter = new DynamicParameters();
            parameter.Add("@Id", model.Id);
            parameter.Add("@FullName", model.FullName);
            parameter.Add("@CompanyId", model.CompanyId);
            parameter.Add("@DepartmentId", model.DepartmentId);
            parameter.Add("@DesignationId", model.DesignationId);
            parameter.Add("@PhoneNumber", model.PhoneNumber);
            parameter.Add("@ImageUrl", fileId);
            parameter.Add("@Role", model.Role);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("adUserUpdate", parameter);
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


    [Authorize(Roles = "Grapes Admin,Super Admin")]
    [HttpDelete("Delete/{userId}")]
    public async Task<IActionResult> Delete(string userId)
    {
        try
        {
            var parameter = new DynamicParameters();
            parameter.Add("@userId", userId);

            parameter.Add("@Message", "", dbType: DbType.String, direction: ParameterDirection.Output);
            await _unitOfWork.SP_Call.Execute("adUserDelete", parameter);

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


    [Authorize(Roles = "Grapes Admin,Super Admin")]
    [HttpDelete("Reset/{userId}")]
    public async Task<IActionResult> Reset(string userId)
    {
        try
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
                return NotFound(SD.Message_NotFound);

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);

            //var decodedToken = WebEncoders.Base64UrlDecode(model.UserId);
            //string normalToken = Encoding.UTF8.GetString(decodedToken);

            var result = await _userManager.ResetPasswordAsync(user, token, SD.Password);
            if (result.Succeeded)
                return NoContent();

            return BadRequest(SD.Message_Unsuccessful);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error saving data." + e.Message);
        }
    }
}
