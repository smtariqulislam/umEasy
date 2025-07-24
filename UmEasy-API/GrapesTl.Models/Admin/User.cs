using Microsoft.AspNetCore.Http;

namespace GrapesTl.Models;

public class User
{
    public string Id { get; set; }
    public string CompanyId { get; set; }
    public string DepartmentId { get; set; }
    public string DesignationId { get; set; }
    public string FullName { get; set; }
    public string PhoneNumber { get; set; }
    public string UserName { get; set; }
    public string Role { get; set; }
    public IFormFile File { get; set; }
}

public class UserView : User
{
    public string CompanyName { get; set; }
    public string DepartmentName { get; set; }
    public string DesignationName { get; set; }
    public string ImageUrl { get; set; }

}

public class UserSelect
{
    public string Id { get; set; }
    public string Role { get; set; }
    public string FullName { get; set; }
}