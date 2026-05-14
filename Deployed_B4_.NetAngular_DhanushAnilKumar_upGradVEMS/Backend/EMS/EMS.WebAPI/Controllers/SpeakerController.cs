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
    public class SpeakerController : ControllerBase
    {
        private readonly ISpeakerService _service;
        private readonly IMapper _mapper;

        public SpeakerController(ISpeakerService service, IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var data = await _service.GetAllAsync();
            var result = _mapper.Map<List<SpeakerResponseDto>>(data);

            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var speaker =
                await _service.GetByIdAsync(id);

            if (speaker == null)
                return NotFound();

            return Ok(speaker);
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] CreateSpeakerDto dto)
        {
            var model = _mapper.Map<SpeakersDetails>(dto);
            model.SpeakerId = Guid.NewGuid();

            await _service.AddAsync(model);

            return Ok("Speaker added");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id,[FromBody] UpdateSpeakerDto dto)
        {
            await _service.UpdateAsync(id, dto);

            return Ok(new
            {
                Message = "Updated"
            });
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _service.DeleteAsync(id);
            return Ok("Speaker deleted");
        }
    }
}