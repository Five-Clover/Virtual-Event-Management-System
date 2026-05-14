using AutoMapper;
using EMS.Application.DTOs;
using EMS.DAL.Models;

namespace EMS.Application.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // =========================
            // EVENT MAPPING
            // =========================
            CreateMap<EventDetails, EventResponseDto>()
                .ForMember(dest => dest.CategoryId,
                    opt => opt.MapFrom(src => src.CategoryId))
                .ForMember(dest => dest.CategoryName,
                    opt => opt.MapFrom(src =>
                        src.Category != null ? src.Category.CategoryName : "N/A"));

            CreateMap<CreateEventDto, EventDetails>();
            CreateMap<UpdateEventDto, EventDetails>(); // 🔥 ADDED

            // =========================
            // SESSION MAPPING
            // =========================
            CreateMap<SessionInfo, SessionResponseDto>()
                .ForMember(dest => dest.EventId,
                    opt => opt.MapFrom(src => src.EventId))
                .ForMember(dest => dest.SpeakerId,
                    opt => opt.MapFrom(src => src.SpeakerId))
                .ForMember(dest => dest.EventName,
                    opt => opt.MapFrom(src =>
                        src.Event != null ? src.Event.EventName : "N/A"))
                .ForMember(dest => dest.SpeakerName,
                    opt => opt.MapFrom(src =>
                        src.Speaker != null ? src.Speaker.SpeakerName : "N/A"))
                .ForMember(dest => dest.Title,
                    opt => opt.MapFrom(src => src.SessionTitle));

            CreateMap<CreateSessionDto, SessionInfo>()
                .ForMember(dest => dest.SessionTitle,
                    opt => opt.MapFrom(src => src.Title));

            CreateMap<UpdateSessionDto, SessionInfo>() // 🔥 ADDED
                .ForMember(dest => dest.SessionTitle,
                    opt => opt.MapFrom(src => src.Title));

            // =========================
            // SPEAKER MAPPING
            // =========================
            CreateMap<SpeakersDetails, SpeakerResponseDto>();
            CreateMap<CreateSpeakerDto, SpeakersDetails>();
            CreateMap<UpdateSpeakerDto, SpeakersDetails>();

            // =========================
            // USER MAPPING
            // =========================
            CreateMap<RegisterDto, UserInfo>();
        }
    }
}