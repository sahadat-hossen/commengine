using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CommEngine.Entities
{
    public class Product:Entry
    {
        public string ProductName { get; set; }
        public int CategoryId { get; set; }
        public Category Category { get; set; }
    }
}
