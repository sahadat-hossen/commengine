using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CommEngine.Model
{
    public class ProductModel
    {
        public int Id { get; set; }
        public DateTime CreateDate { get; set; }
        public string ProductName { get; set; }
        public KeyValuePair Category { get; set; }
    }
}
