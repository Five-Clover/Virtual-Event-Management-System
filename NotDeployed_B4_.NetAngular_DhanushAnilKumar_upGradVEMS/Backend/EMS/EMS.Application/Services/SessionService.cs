using AutoMapper;
using EMS.Application.DTOs;
using EMS.Application.Interfaces;
using EMS.DAL.Models;
using EMS.DAL.Repositories.Interfaces;

namespace EMS.Application.Services
{
    public class SessionService : ISessionService
    {
        private readonly ISessionRepository _repo;
        private readonly IEventRepository _eventRepo;
        private readonly IMapper _mapper;

        public SessionService(ISessionRepository repo, IEventRepository eventRepo, IMapper mapper)
        {
            _repo = repo;
            _eventRepo = eventRepo;
            _mapper = mapper;
        }

        public async Task<List<SessionInfo>> GetAllAsync(int pageNumber, int pageSize)
        {
            var data = await _repo.GetAllAsync();

            return data
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToList();
        }

        public async Task CreateAsync(SessionInfo model)
        {
            if (model.SessionStart >= model.SessionEnd)
                throw new Exception("Invalid time");

            var ev = await _eventRepo.GetByIdAsync(model.EventId);

            if (ev == null)
                throw new Exception("Event not found");

            if (model.SessionStart.Date != ev.EventDate.Date)
                throw new Exception("Session must be on event date");

            await _repo.AddAsync(model);
        }

        public async Task UpdateAsync(SessionInfo model)
        {
            await _repo.UpdateAsync(model);
        }

        public async Task DeleteAsync(Guid id)
        {
            await _repo.DeleteAsync(id);
        }

        public async Task<SessionResponseDto?> GetByIdAsync(Guid id)
        {
            var session = await _repo.GetByIdAsync(id);

            if (session == null)
                return null;

            return _mapper.Map<SessionResponseDto>(session);
        }

    }
}