using System.ComponentModel.DataAnnotations;

namespace GrapesTl.Models;

public class RegisterUser
{

    [Required]
    public string FullName { get; set; }

    [Required]
    public string CompanyId { get; set; }
    [Required]
    public string DepartmentId { get; set; }
    [Required]
    public string DesignationId { get; set; }

    [Required]
    [MaxLength(50)]
    public string PhoneNumber { get; set; }

    [Required]
    [StringLength(50, MinimumLength = 8)]
    public string Password { get; set; }
    public string ImageUrl { get; set; }

}
