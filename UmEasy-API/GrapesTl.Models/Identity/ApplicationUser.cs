using Microsoft.AspNetCore.Identity;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GrapesTl.Models;

public class ApplicationUser : IdentityUser
{
    [Required]
    [Column(TypeName = "datetime")]
    [DataType(DataType.DateTime)]
    public DateTime CreatedDate { get; set; }

    [Required]
    [MaxLength(150)]
    public string FirstName { get; set; }
    public string LastName { get; set; }

    [MaxLength(100)]
    [DefaultValue("")]
    public string ImageUrl { get; set; }

    [MaxLength(50)]
    public string Role { get; set; }
    public string NationalId { get; set; }

    public DateTime LastPasswordChangedDate { get; set; }

}
