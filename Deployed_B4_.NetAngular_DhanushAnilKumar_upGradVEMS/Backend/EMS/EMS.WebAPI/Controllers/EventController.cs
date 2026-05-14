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
    public class EventController : ControllerBase
    {
        private readonly IEventService _service;
        private readonly IMapper _mapper;

        public EventController(IEventService service, IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAll([FromQuery] PaginationParams param)
        {
            var data = await _service.GetAllAsync(param.PageNumber, param.PageSize);
            var result = _mapper.Map<List<EventResponseDto>>(data);

            return Ok(result);
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var data = await _service.GetByIdAsync(id);
            var result = _mapper.Map<EventResponseDto>(data);

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateEventDto dto)
        {
            var model = _mapper.Map<EventDetails>(dto);
            model.EventId = Guid.NewGuid();

            await _service.CreateAsync(model);

            return Ok("Event created");
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] UpdateEventDto dto)
        {
            var model = _mapper.Map<EventDetails>(dto);
            model.EventId = id;

            await _service.UpdateAsync(model);

            return Ok("Event updated");
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _service.DeleteAsync(id);
            return Ok("Event deleted");
        }
    }
}