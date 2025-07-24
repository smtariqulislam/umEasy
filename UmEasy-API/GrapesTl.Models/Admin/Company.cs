using System.ComponentModel.DataAnnotations;

namespace GrapesTl.Models;

public class Company
{
    public string CompanyId { get; set; }

    [MaxLength(50)]
    [Required]
    public string CompanyName { get; set; }

    [MaxLength(50)]
    [Required]
    public string CompanyAddress { get; set; }
    [MaxLength(50)]
    [Required]
    public string GoogleDriveKey { get; set; }
}
