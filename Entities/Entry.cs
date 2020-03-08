using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace CommEngine.Entities
{
    public class Entry
    {
        [Key]
        public int Id { get; set; }
        public DateTime CreateDate { get; set; }
        public Entry()
        {
            this.CreateDate = DateTime.Now;
        }
    }
}
