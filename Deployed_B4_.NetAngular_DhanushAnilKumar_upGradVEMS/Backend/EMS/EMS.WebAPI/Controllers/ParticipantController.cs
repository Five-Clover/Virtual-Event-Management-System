using AutoMapper;
using EMS.Application.DTOs;
using EMS.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace EMS.WebAPI.Controllers
{
    [ApiController]
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [Authorize]
    public class ParticipantController : ControllerBase
    {
        private readonly IParticipantService _service;
        private readonly IMapper _mapper;

        public ParticipantController(IParticipantService service, IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
        }

        [HttpPost("register")]
        [Authorize(Roles = "Participant")]
        public async Task<IActionResult> Register(Guid eventId)
        {
            var email = User.FindFirst(ClaimTypes.Email)?.Value;

            await _service.RegisterEventAsync(email, eventId);
            return Ok("Registered successfully");
        }

        [HttpDelete("unregister")]
        [Authorize(Roles = "Participant")]
        public async Task<IActionResult> Unregister( Guid eventId)
        {
            var email = User.FindFirst(ClaimTypes.Email)?.Value;

            await _service.UnregisterAsync(email, eventId);
            return Ok("Unregistered");
        }

        [HttpGet("sessions")]
        [Authorize(Roles = "Participant")]
        public async Task<IActionResult> GetSessions(string email)
        {
            var sessions = await _service.GetUserSessionsAsync(email);
            var result = _mapper.Map<List<SessionResponseDto>>(sessions);

            return Ok(result);
        }

        [HttpPost("mark-attendance")]
        [Authorize(Roles = "Participant")]
        public async Task<IActionResult> MarkAttendance(Guid eventId)
        {
            var email = User.FindFirst(ClaimTypes.Email)?.Value;

            await _service.MarkAttendanceAsync(email, eventId);

            return Ok("Attendance marked");
        }
    }
}