using GrapesTl.Models.Admin;
using System;
using System.Collections.Generic;

namespace GrapesTl.Models;

public class AuthResponse
{
    public string AccessToken { get; set; }
    public bool IsSuccess { get; set; }
    public IEnumerable<string> Errors { get; set; }
    public DateTime? ExpireDate { get; set; }
    public string Message { get; set; }
    public string Role { get; set; }
    public string RefreshToken { get; set; }
    public IEnumerable<ModuleAssign> Modules { get; set; }
    public IEnumerable<AdMenuView> Menus { get; set; }
    public IEnumerable<SubMenuAssignAuthView> SubMenus { get; set; }
}
