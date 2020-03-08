using AutoMapper;
using CommEngine.Entities;
using CommEngine.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CommEngine.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Category, CategoryModel>();
            CreateMap<CategoryModel, Category>();

            CreateMap<Product, ProductModel>()
                .ForMember(dest=>dest.Category, src=>src.MapFrom(s=>new Model.KeyValuePair() {Id=s.CategoryId, Name=s.Category.CategoryName }))
                ;
            CreateMap<ProductSaveModel, Product>();

        }
    }
}
