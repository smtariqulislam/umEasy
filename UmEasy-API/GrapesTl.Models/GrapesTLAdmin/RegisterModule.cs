using System.ComponentModel.DataAnnotations;

namespace GrapesTl.Models.Admin;

public class RegisterModule
{

    [Required]
    public string ModuleName { get; set; }
    public string Link { get; set; }
    public string Icon { get; set; }
}

public class RegisterModuleView : RegisterModule
{
    [Required]
    public int ModuleId { get; set; }
}