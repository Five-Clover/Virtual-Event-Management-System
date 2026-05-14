using AutoMapper;
using EMS.Application.DTOs;
using EMS.Application.Interfaces;
using EMS.DAL.Models;
using EMS.DAL.Repositories.Interfaces;

namespace EMS.Application.Services
{
    public class SpeakerService : ISpeakerService
    {
        private readonly ISpeakerRepository _repo;
        private readonly IMapper _mapper;

        public SpeakerService(ISpeakerRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        public async Task<List<SpeakersDetails>> GetAllAsync()
        {
            return await _repo.GetAllAsync();
        }

        public async Task AddAsync(SpeakersDetails speaker)
        {
            if (string.IsNullOrWhiteSpace(speaker.SpeakerName))
                throw new Exception("Invalid name");

            await _repo.AddAsync(speaker);
        }

        public async Task DeleteAsync(Guid id)
        {
            var speaker =
                await _repo.GetByIdAsync(id);

            if (speaker == null)
                throw new Exception(
                    "Speaker not found"
                );

            // CHECK SESSIONS

            if (
                speaker.Sessions != null &&
                speaker.Sessions.Any()
            )
            {
                throw new Exception(
                    "Cannot delete speaker assigned to sessions"
                );
            }

            await _repo.DeleteAsync(id);
        }

        public async Task<SpeakerResponseDto?> GetByIdAsync(Guid id)
        {
            var speaker =
                await _repo.GetByIdAsync(id);

            if (speaker == null)
                return null;

            return _mapper.Map<SpeakerResponseDto>(
                speaker);
        }

        public async Task UpdateAsync(Guid id, UpdateSpeakerDto dto)
        {
            var speaker =
                await _repo.GetByIdAsync(id);

            if (speaker == null)
                throw new Exception(
                    "Speaker not found");

            speaker.SpeakerName =
                dto.SpeakerName;

            await _repo.UpdateAsync(speaker);
        }
    }
}