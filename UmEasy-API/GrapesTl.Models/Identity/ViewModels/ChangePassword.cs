using System.ComponentModel.DataAnnotations;

namespace GrapesTl.Models;

public class ChangePassword
{

    //[Required]
    //[DataType(DataType.Password)]
    //public string OldPassword { get; set; }

    //[Required]
    //[DataType(DataType.Password)]
    //public string NewPassword { get; set; }

    //[Required]
    //[DataType(DataType.Password)]
    //[Compare("NewPassword")]
    //public string ConfirmPassword { get; set; }
    [Required]
    public string Password { get; set; }
}
