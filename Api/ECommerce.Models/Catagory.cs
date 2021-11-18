using System;
using System.Collections.Generic;
using System.Text;

namespace ECommerce.Models
{
    public class Catagory
    {
        public int Id { get; set; }
        public string category { get; set; }

        public virtual ICollection<Product> Product { get; set; }
    }
}
