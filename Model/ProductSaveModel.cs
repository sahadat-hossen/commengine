using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CommEngine.Model
{
    public class ProductSaveModel
    {
        public int Id { get; set; }
        public string ProductName { get; set; }
        public int CategoryId { get; set; }
    }
}
