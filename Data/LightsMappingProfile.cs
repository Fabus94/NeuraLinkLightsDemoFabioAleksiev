using Lights.ViewModels;
using Lights.Data.Entities;

namespace Lights.Data
{
    // Creating this as a configuration profile for the automapper

    public class IrisMappingProfile : AutoMapper.Profile
    {
        public IrisMappingProfile()
        {
            CreateMap<Light, LightsViewModel>()
            .ForMember(c => c.Id, ex => ex.MapFrom(c => c.Id))
            .ReverseMap();

        }
    }
}
