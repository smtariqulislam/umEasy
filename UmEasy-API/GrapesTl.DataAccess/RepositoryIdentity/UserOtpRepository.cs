using GrapesTl.Models;

namespace GrapesTl.Service;

public class UserOtpRepository : RepositoryAsync<UserOtp>, IUserOtpRepository
{
    private readonly ApplicationDbContext _db;

    public UserOtpRepository(ApplicationDbContext db) : base(db)
    {
        _db = db;
    }
}
