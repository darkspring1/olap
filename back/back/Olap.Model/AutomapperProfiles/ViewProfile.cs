using AutoMapper;
using Olap.Model.ModelBuilder;

namespace Olap.Model.AutomapperProfiles
{
    public class ViewProfile : Profile
    {
        public ViewProfile()
        {
            CreateMap<CellDto, Cell>();
            CreateMap<CellFilterValueDto, CellFilterValue>();

            CreateMap<ViewDto, View>();
            CreateMap<View, ViewDto>();

            CreateMap<FilterValueDto, FilterValue>();
            CreateMap<CellDescriptionDto, CellDescription>()
                .ReverseMap();

            CreateMap<ModelDescription, ModelDescriptionResponceDto>();
        }
    }
}
