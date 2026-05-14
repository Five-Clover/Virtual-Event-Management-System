using AutoMapper;
using EMS.Application.DTOs;
using EMS.Application.Interfaces;
using EMS.DAL.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EMS.WebAPI.Controllers
{
    [ApiController]
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/[controller]")]
    [Authorize(Roles = "Admin")]
    public class SessionController : ControllerBase
    {
        private readonly ISessionService _service;
        private readonly IMapper _mapper;

        public SessionController(ISessionService service, IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] PaginationParams param)
        {
            var data = await _service.GetAllAsync(param.PageNumber, param.PageSize);
            var result = _mapper.Map<List<SessionResponseDto>>(data);

            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var session =
                await _service.GetByIdAsync(id);

            if (session == null)
                return NotFound();

            return Ok(session);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateSessionDto dto)
        {
            var model = _mapper.Map<SessionInfo>(dto);
            model.SessionId = Guid.NewGuid();

            await _service.CreateAsync(model);

            return Ok("Session created");
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] UpdateSessionDto dto)
        {
            var model = _mapper.Map<SessionInfo>(dto);
            model.SessionId = id;

            await _service.UpdateAsync(model);

            return Ok("Session updated");
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _service.DeleteAsync(id);
            return Ok("Session deleted");
        }
    }
}