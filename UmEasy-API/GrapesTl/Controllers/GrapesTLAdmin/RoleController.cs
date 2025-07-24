using GrapesTl.Models.Admin;

namespace GrapesTl.Controllers.Admin;


[Authorize(Roles = "Grapes Admin")]
[Route("api/[controller]")]
[ApiController]
public class RoleController(RoleManager<IdentityRole> roleManager) : ControllerBase
{
    private readonly RoleManager<IdentityRole> _roleManager = roleManager;


    [HttpGet("list")]
    public IActionResult List()
    {
        try
        {
            var data = _roleManager.Roles;

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }

    [HttpGet("details/{id}")]
    public IActionResult Details(string id)
    {
        try
        {
            var data = _roleManager.Roles.Where(a => a.Id == id).FirstOrDefault();

            return Ok(data);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
           "Error retrieve list of data." + e.Message);
        }
    }


    [HttpPost("create")]
    public async Task<IActionResult> Create([FromBody] RegisterRole model)
    {
        try
        {
            if (ModelState.IsValid == false)
                return BadRequest(SD.Message_CannotProcess);

            IdentityRole role = new() { Name = model.RoleName };
            IdentityResult result = await _roleManager.CreateAsync(role);

            if (result.Succeeded == false)
                return BadRequest(SD.Message_CannotProcess);

            return Created("", SD.Message_Save);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
             "Error deleting data." + e.Message);
        }
    }

    [HttpPost("update")]
    public async Task<IActionResult> Update([FromBody] RegisterRoleView model)
    {
        try
        {
            if (ModelState.IsValid == false)
                return BadRequest(SD.Message_CannotProcess);

            IdentityRole roleToEdit = await _roleManager.FindByIdAsync(model.Id);

            if (roleToEdit == null)
                return NotFound(SD.Message_NotFound);


            IdentityRole role = new() { Name = model.RoleName };

            if (roleToEdit.Name != model.RoleName)
            {
                roleToEdit.Name = model.RoleName;
            }

            IdentityResult result = await _roleManager.UpdateAsync(roleToEdit);

            if (result.Succeeded)
                return NoContent();

            return BadRequest(SD.Message_CannotProcess);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
             "Error deleting data." + e.Message);
        }
    }

    [HttpDelete("Delete/{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        try
        {
            IdentityRole roleToDelete = await _roleManager.FindByIdAsync(id);

            if (roleToDelete == null)
                return NotFound(SD.Message_NotFound);

            IdentityResult result = await _roleManager.DeleteAsync(roleToDelete);

            if (result.Succeeded)
                return NoContent();

            return BadRequest(SD.Message_CannotProcess);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
             "Error deleting data." + e.Message);
        }
    }
}
