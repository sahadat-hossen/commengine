using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using CommEngine.Entities;
using CommEngine.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CommEngine.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly CommEngineDbContext _context;
        private readonly IMapper _mapper;

        public ProductsController(CommEngineDbContext context, IMapper mapper)
        {
            this._context = context;
            this._mapper = mapper;
        }
        [HttpGet]
        public IList<ProductModel> Get()
        {
            var products = _context.Products.Include(x => x.Category).ToList();
            var productModels = _mapper.Map<List<Product>, List<ProductModel>>(products);
            return productModels;
        }
        [HttpGet("{id}")]
        public ProductModel Get(int id)
        {
            var product = _context.Products.Include(s => s.Category).FirstOrDefault(s=>s.Id==id);
            var productModel = _mapper.Map<Product, ProductModel>(product);
            return productModel;
        }

        [HttpPut]
        public int Put([FromBody] ProductSaveModel model)
        {
            if (model == null)
            {
                return 0;
            }
            var productEntry = _context.Products.Find(model.Id);
            if (productEntry == null)
            {
                return 0;
            }
            productEntry.ProductName = model.ProductName;
            productEntry.CategoryId = model.CategoryId;
            _context.Products.Update(productEntry);
            _context.SaveChanges();
            return productEntry.Id;

        }
        [HttpPost]
        public int Post([FromBody] ProductSaveModel model)
        {
            if (model == null)
            {
                return 0;
            }
            var product = _mapper.Map<ProductSaveModel, Product>(model);
            _context.Products.Add(product);
            _context.SaveChanges();
            return product.Id;
        }
        [HttpGet("categories")]
        public IEnumerable<Model.KeyValuePair> GetCategories()
        {
            return _context.Categories.Select(s => new Model.KeyValuePair() { Id = s.Id, Name = s.CategoryName });
        }
    }
}