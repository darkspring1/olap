using AutoMapper;
using Olap.Model.ModelBuilder;

namespace Olap.Model.AutomapperProfiles
{
    public class ViewProfile : Profile
    {
        public ViewProfile()
        {
            CreateMap<ViewDto, View>();
            CreateMap<FilterValueDto, FilterValue>();
            CreateMap<CellDescriptionDto, CellDescription>();

            CreateMap<ModelDescription, ModelDescriptionResponceDto>();
            CreateMap<View, ViewDto>();
        }
    }
}
