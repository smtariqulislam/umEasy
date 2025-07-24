

using GrapesTl.Models;
using System.Linq;

namespace GrapesTl.Service;

public class ApplicationUserRepository : RepositoryAsync<ApplicationUser>, IApplicationUserRepository
{
    private readonly ApplicationDbContext _db;

    public ApplicationUserRepository(ApplicationDbContext db) : base(db)
    {
        _db = db;
    }

    public void Update(ApplicationUser applicationUser)
    {
        var objFromDb = _db.ApplicationUser.FirstOrDefault(s => s.Id == applicationUser.Id);
        if (objFromDb != null)
        {
            objFromDb.FullName = applicationUser.FullName;
            objFromDb.ImageUrl = applicationUser.ImageUrl;
        }
    }

}
