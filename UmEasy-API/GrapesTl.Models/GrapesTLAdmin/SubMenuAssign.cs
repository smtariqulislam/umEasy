namespace GrapesTl.Models.Admin;
public class SubMenuAssign
{
    public string UserId { get; set; }
    public int SubMenuId { get; set; }
}

public class SubMenuAssignView : SubMenuAssign
{
    public int SubMenuAssignId { get; set; }
    public int MenuId { get; set; }
    public string SubMenuName { get; set; }
    public string EmployeeName { get; set; }
    public string FullName { get; set; }
    public string MenuName { get; set; }
    public string ModuleName { get; set; }
    public string Link { get; set; }
    public string Icon { get; set; }
    public string Section { get; set; }
}

public class SubMenuAssignAuthView : SubMenuAssign
{
    public int SubMenuAssignId { get; set; }
    public string SubMenuName { get; set; }
    public string MenuName { get; set; }
    public string ModuleName { get; set; }
    public string Link { get; set; }
    public string Icon { get; set; }
    public string Section { get; set; }
}

