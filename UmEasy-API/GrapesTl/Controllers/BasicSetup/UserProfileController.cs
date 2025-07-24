namespace GrapesTl.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class UserProfileController(UserManager<ApplicationUser> userManager) : ControllerBase
{
    private string _userId;
    private readonly UserManager<ApplicationUser> _userManager = userManager;


    [HttpPost("Reset")]
    public async Task<IActionResult> Reset([FromBody] ChangePassword model)
    {
        try
        {
            _userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var user = await _userManager.FindByIdAsync(_userId);
            if (user == null)
                return NotFound(SD.Message_NotFound);

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);

            //var decodedToken = WebEncoders.Base64UrlDecode(model.UserId);
            //string normalToken = Encoding.UTF8.GetString(decodedToken);

            var result = await _userManager.ResetPasswordAsync(user, token, model.Password);
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