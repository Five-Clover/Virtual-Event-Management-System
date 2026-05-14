using EMS.Application.Interfaces;
using EMS.DAL.Models;
using EMS.DAL.Repositories.Interfaces;
using System.Text.RegularExpressions;

namespace EMS.Application.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _repo;

        public UserService(IUserRepository repo)
        {
            _repo = repo;
        }

        public async Task RegisterAsync(UserInfo user)
        {
            var existingUser = await _repo.GetByEmailAsync(user.EmailId);

            if (existingUser != null)
                throw new Exception("Email already exists");

            var pattern = @"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,20}$";

            if (!Regex.IsMatch(user.Password, pattern))
                throw new Exception("Password must contain uppercase, lowercase, number, and special character");

            user.Role = "Participant";

            await _repo.AddAsync(user);
        }

        public async Task<UserInfo> LoginAsync(string email, string password)
        {
            var user = await _repo.GetByEmailAsync(email);

            if (user == null || user.Password != password)
                throw new Exception("Invalid credentials");

            return user;
        }

        public async Task<List<UserInfo>> GetAllUsersAsync()
        {
            return await _repo.GetAllAsync();
        }
    }
}