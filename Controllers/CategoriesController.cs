using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using CommEngine.Entities;
using CommEngine.Model;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CommEngine.Controllers
{
    [Route("api/[controller]")]
    public class CategoriesController : Controller
    {
        private readonly CommEngineDbContext _context;
        private readonly IMapper _mapper;
        public CategoriesController(CommEngineDbContext context,
                                IMapper mapper)
        {
            this._context = context;
            this._mapper = mapper;
        }

        [HttpGet]
        public IList<CategoryModel> Get()
        {
            var categories = _context.Categories.ToList();
            var categoryModels = _mapper.Map<List<Category>, List<CategoryModel>>(categories);
            return categoryModels;
        }
        [HttpGet("{id}")]
        public CategoryModel Get(int id)
        {
            var category = _context.Categories.Find(id);
            var categoryModel = _mapper.Map<Category, CategoryModel>(category);
            return categoryModel;
        }
        [HttpPost]
        public int Post([FromBody] CategoryModel model)
        {
            if (model == null)
            {
                return 0;
            }
            var category = _mapper.Map<CategoryModel, Category>(model);
            _context.Categories.Add(category);
            _context.SaveChanges();
            return category.Id;
        }
        [HttpPut]
        public int Put([FromBody]CategoryModel model)
        {
            if (model == null)
            {
                return 0;
            }
            var categoryEntry = _context.Categories.Find(model.Id);
            if (categoryEntry == null)
            {
                return 0;
            }
            categoryEntry.CategoryName = model.CategoryName;
            _context.Categories.Update(categoryEntry);
            _context.SaveChanges();
            return categoryEntry.Id;
        }
        [HttpDelete]
        public bool Delete(int id)
        {
            var categoryEntry = _context.Categories.Find(id);
            if (categoryEntry == null)
            {
                return false;
            }
            _context.Categories.Remove(categoryEntry);
            _context.SaveChanges();
            return true;
        }
    }
}
