using AutoMapper;
using EMS.Application.DTOs;
using EMS.Application.Interfaces;
using EMS.DAL.Models;
using EMS.WebAPI.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EMS.WebAPI.Controllers
{
    [ApiController]
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IUserService _service;
        private readonly JwtHelper _jwtHelper;
        private readonly IMapper _mapper;

        public AccountController(IUserService service, JwtHelper jwtHelper, IMapper mapper)
        {
            _service = service;
            _jwtHelper = jwtHelper;
            _mapper = mapper;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            var user = _mapper.Map<UserInfo>(dto);

            await _service.RegisterAsync(user);

            return Ok("User registered");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            var user = await _service.LoginAsync(dto.EmailId, dto.Password);

            var token = _jwtHelper.GenerateToken(user);

            return Ok(new
            {
                Token = token,
                User = user
            });
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("users")]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _service.GetAllUsersAsync();

            var result = users.Select(u => new
            {
                u.EmailId,
                u.UserName,
                u.Role
            });

            return Ok(result);
        }
    }
}