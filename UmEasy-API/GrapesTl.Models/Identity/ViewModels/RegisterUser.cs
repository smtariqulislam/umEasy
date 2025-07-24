using System.ComponentModel.DataAnnotations;

namespace GrapesTl.Models;

public class RegisterUser
{

    public string FirstName { get; set; }
    public string LastName { get; set; }

    [Required]
    [MaxLength(50)]
    public string PhoneNumber { get; set; }
    public string NationalId { get; set; }

    [Required]
    [StringLength(50, MinimumLength = 8)]
    public string Password { get; set; }
    public string ImageUrl { get; set; }

}
